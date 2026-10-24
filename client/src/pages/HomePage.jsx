import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  Terminal as TerminalIcon,
  Award,
  Users,
  Compass,
  ArrowRight,
  CheckCircle,
  Cpu,
  Layers,
  ChevronLeft,
  ChevronRight,
  Star,
  Quote,
  Sparkles,
  Lock,
  Globe,
  Radio,
  Server,
  Smartphone,
  Cloud,
  FileCode,
  Crosshair,
  CheckCircle2,
} from 'lucide-react';
import { HeroScene } from '../components/3d/HeroScene';
import { TiltCard } from '../components/common/TiltCard';
import { CyberCardBackdrop } from '../components/common/CyberCardBackdrop';
import { MissionStatementTyping } from '../components/common/MissionStatementTyping';
import { useModal } from '../context/ModalContext';
import { useIntro } from '../context/IntroContext';
import { api } from '../services/api';
import {
  useHeroScroll,
  useZoomOnScroll,
  useSectionZoomScrub,
  useStaggerReveal,
  useRevealOnScroll,
  useCurtainReveal,
  prefersReducedMotion,
} from '../hooks/useScrollAnimation';

// Verified 5 Courses matching genuine NERDS LAB catalogue (https://nerdslab.in/)
const fallbackCourses = [
  {
    title: 'Ethical Hacking Nerd',
    slug: 'ethical-hacking-nerd',
    code: 'C-EHN',
    price: 22000,
    gstInfo: '+ GST',
    shortDescription: 'An introductory cybersecurity programme for students interested in ethical hacking and responsible security practices.',
    features: ['35+ hours live training', 'Practical hands-on lab exercises', 'Certificate of course completion'],
  },
  {
    title: 'Penetration Testing Nerd',
    slug: 'penetration-testing-nerd',
    code: 'C-PTN',
    price: 32000,
    gstInfo: '+ GST',
    shortDescription: 'Advanced offensive security training focusing on vulnerability identification, exploit development, and comprehensive reporting.',
    features: ['50+ hours live training', 'Enterprise mock penetration testing', 'Comprehensive audit reports'],
  },
  {
    title: 'Web Application Security Nerd',
    slug: 'web-application-security-nerd',
    code: 'C-WASN',
    price: 75000,
    gstInfo: '+ GST',
    shortDescription: 'Comprehensive application security covering OWASP Top 10, API security testing, business logic flaws, and Burp Suite automation.',
    features: ['80+ hours live training', 'Modern API & GraphQL auditing', 'Source code review labs'],
  },
  {
    title: 'Cloud Security Nerd',
    slug: 'cloud-security-nerd',
    code: 'C-CSN',
    price: 75000,
    gstInfo: '+ GST',
    shortDescription: 'Hardening multi-cloud architectures across AWS and Azure, IAM least privilege auditing, container security, and CSPM compliance.',
    features: ['90+ hours live training', 'Multi-cloud attack simulations', 'Kubernetes & Docker hardening'],
  },
  {
    title: 'SOC Analysis Nerd',
    slug: 'soc-analysis-nerd',
    code: 'C-SAN',
    price: 35000,
    gstInfo: '+ GST',
    shortDescription: 'Defensive security operations, real-time telemetry monitoring, incident response, SIEM engineering, and cyber threat intelligence.',
    features: ['45+ hours live training', 'Splunk & Elastic SIEM labs', 'Real-world incident simulation'],
  },
];

// Verified Testimonials from https://nerdslab.in/
const verifiedTestimonials = [
  {
    learnerName: 'Parthasarathi B',
    designation: 'Security Engineer',
    organization: 'Cybernerds Solutions',
    location: 'Thanjavur, Tamil Nadu',
    approvedQuotation: 'Joining NERDS LAB was a turning point in my professional journey. Their flexible online classes made learning convenient, and the trainers explained every concept with real-time examples. The placement support team guided me throughout the interview process, which helped me secure a role that truly matches my profile. I’m grateful to NERDS LAB for shaping my future.',
    rating: 5,
  },
  {
    learnerName: 'Hariharan V',
    designation: 'Security Engineer',
    organization: 'Cybernerds Solutions',
    location: 'Thanjavur, Tamil Nadu',
    approvedQuotation: 'I had an excellent learning experience with NERDS LAB. The online sessions were well-structured and easy to follow, even with my busy routine. What impressed me most was their dedicated placement assistance, which gave me confidence and multiple job opportunities. Thanks to NERDS LAB, I am now working in a position I always aimed for.',
    rating: 5,
  },
  {
    learnerName: 'Bharathwaj MA',
    designation: 'Security Engineer',
    organization: 'Cybernerds Solutions',
    location: 'Thanjavur, Tamil Nadu',
    approvedQuotation: 'Choosing NERDS LAB for my training was one of the smartest decisions of my career. The faculty members were knowledgeable, supportive, and always available to clear doubts. Their online learning model was highly convenient, and the placement team worked tirelessly to connect me with the right employers. I sincerely thank NERDS LAB for this wonderful support.',
    rating: 5,
  },
  {
    learnerName: 'Abishkar S',
    designation: 'Security Engineer',
    organization: 'Snergy Systems & Solutions',
    location: 'Haryana',
    approvedQuotation: 'My journey with NERDS LAB has been truly rewarding. The course content was industry-focused, and the online classes helped me learn without disturbing my work schedule. Their placement assistance was exceptional, providing interview preparation and career guidance at every step. I’m happy to say that I landed a great job because of their efforts.',
    rating: 5,
  },
  {
    learnerName: 'Balamurugan S',
    designation: 'Security Engineer',
    organization: 'Cysigil Network Private Limited',
    location: 'India',
    approvedQuotation: 'Enrolling at NERDS LAB gave me both knowledge and confidence. The trainers ensured every module was taught clearly, and the flexibility of attending classes online made it very manageable. Their placement support was the highlight, helping me find the perfect opportunity in a reputed company.',
    rating: 5,
  },
  {
    learnerName: 'Ahamed Ibrahim',
    designation: 'Security Engineer',
    organization: 'Cyberintelsys Consulting Services',
    location: 'India',
    approvedQuotation: 'I am extremely satisfied with the training and career support provided by NERDS LAB. The online classes were interactive and practical, making it easy to understand even complex topics. Beyond training, their placement team continuously supported me with resumes, mock interviews, and job referrals.',
    rating: 5,
  },
  {
    learnerName: 'Vinith',
    designation: 'Security Engineer',
    organization: 'GTS Technology',
    location: 'Pune, Maharashtra',
    approvedQuotation: 'Studying with NERDS LAB was an amazing experience. Their online coaching was flexible enough to suit my personal schedule, and the trainers focused on making us job-ready. The placement assistance was outstanding and helped me crack interviews with confidence.',
    rating: 5,
  },
  {
    learnerName: 'Arun Prasath',
    designation: 'Security Engineer',
    organization: 'GRM Technologies',
    location: 'India',
    approvedQuotation: 'I would highly recommend NERDS LAB to anyone looking to build a strong career. The training sessions were detailed, practical, and easy to access online. Most importantly, the placement assistance was genuine and result-oriented, ensuring I found a company that matched my aspirations.',
    rating: 5,
  },
  {
    learnerName: 'Jayakumar',
    designation: 'Security Engineer',
    organization: 'GTS Technology',
    location: 'Pune, Maharashtra',
    approvedQuotation: 'My experience with NERDS LAB exceeded my expectations. From quality online training to constant mentorship, every aspect was handled professionally. The placement support team stayed in touch until I got selected in a role that perfectly fit my technical background.',
    rating: 5,
  },
  {
    learnerName: 'Sivasankar',
    designation: 'Security Engineer',
    organization: 'Anora Instrumentation Pvt Ltd',
    location: 'India',
    approvedQuotation: 'NERDS LAB has played a major role in helping me achieve my career goals. Their online training platform made learning easy and flexible, while the trainers gave personal attention whenever needed. The placement assistance was extremely helpful, from interview scheduling to final selection.',
    rating: 5,
  },
  {
    learnerName: 'Kavin M',
    designation: 'Security Engineer',
    organization: 'Exor India',
    location: 'India',
    approvedQuotation: "Enrolling in NERDS LAB was one of the best decisions I've made for my career. The online training options allowed me to balance my schedule effectively, while the placement assistance ensured that I found a job that aligned perfectly with my skills and interests.",
    rating: 5,
  },
  {
    learnerName: 'Vidya Sagar',
    designation: 'Security Engineer',
    organization: 'AAA Technologies',
    location: 'India',
    approvedQuotation: 'NERDS LAB provided me with hands-on practical training that was invaluable in my journey to becoming a cybersecurity professional. The instructors were incredibly knowledgeable, and the live project experience gave me the confidence I needed to succeed in the field.',
    rating: 5,
  },
  {
    learnerName: 'Mohan Raj GP',
    designation: 'IS Audit Trainee',
    organization: 'Qadit Systems & Solutions Pvt. Ltd',
    location: 'Chennai, Tamil Nadu',
    approvedQuotation: 'The mentors at Nerds Lab made complex topics easy to understand. They helped me build a strong portfolio and guided me through interviews. With their placement help, I landed a job even before completing the course!',
    rating: 5,
  },
  {
    learnerName: 'Kalaiselvan S',
    designation: 'Assistant System Engineer',
    organization: 'Tata Consultancy Services (TCS)',
    location: 'Chennai, Tamil Nadu',
    approvedQuotation: 'As a fresh graduate, I was unsure about how to get started in the cybersecurity field. The course at Nerds Lab was practical, and the trainers were really supportive. The placement team helped me get my first job as a Security Analyst.',
    rating: 5,
  },
  {
    learnerName: 'Saravanan S',
    designation: 'Security Engineer',
    organization: 'Vault Infosec',
    location: 'Chennai, Tamil Nadu',
    approvedQuotation: 'I came from an Administration background with no coding knowledge. I joined Nerds Lab with interest in cybersecurity, and the trainers helped me understand every concept from scratch. The hands-on labs and placement support helped me transition into a new career as a Security Engineer.',
    rating: 5,
  },
  {
    learnerName: 'Subash M',
    designation: 'IS Audit Trainee',
    organization: 'Qadit Systems & Solutions Pvt. Ltd',
    location: 'Chennai, Tamil Nadu',
    approvedQuotation: 'I was working in a tech support role and felt stuck. Nerds Lab gave me the push I needed to move into cybersecurity. The course was practical and beginner-friendly, and the mentors were very supportive. With their placement assistance, I got a role in a cybersecurity team.',
    rating: 5,
  },
  {
    learnerName: 'Shankar Ram S',
    designation: 'Banking Domain Security',
    organization: 'AAA Technologies',
    location: 'Chennai, Tamil Nadu',
    approvedQuotation: 'After a long career break and coming from a non-coding background, I was hesitant to start something technical. But Nerds Lab made the learning process easy and step-by-step. The internship gave me real exposure, and the placement team helped me get hired as a Security Trainee.',
    rating: 5,
  },
];

export const HomePage = () => {
  const { openDemoModal } = useModal();
  const { introRevealed, triggerReveal } = useIntro();
  const [courses, setCourses] = useState(fallbackCourses);
  const [testimonials, setTestimonials] = useState(verifiedTestimonials);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  // Animation & Track Refs
  const heroSectionRef = useRef(null);
  const heroLeftRef = useRef(null);
  const coursesSectionRef = useRef(null);
  const coursesTrackRef = useRef(null);
  const aboutCurtainRef = useRef(null);
  const aboutContentRef = useRef(null);
  const domainsRef = useRef(null);
  const testimonialsRef = useRef(null);

  // 1. Initial Site Entrance: 3D Globe is shown 1st, then Navbar & texts gracefully appear
  useEffect(() => {
    if (introRevealed) return;

    // Show 3D globe first for ~1.6s, then smoothly reveal all hero texts and navbar
    const timer = setTimeout(() => {
      triggerReveal();
    }, 1600);

    const onUserInteraction = () => triggerReveal();
    window.addEventListener('scroll', onUserInteraction, { passive: true, once: true });
    window.addEventListener('keydown', onUserInteraction, { once: true });
    window.addEventListener('touchstart', onUserInteraction, { passive: true, once: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', onUserInteraction);
      window.removeEventListener('keydown', onUserInteraction);
      window.removeEventListener('touchstart', onUserInteraction);
    };
  }, [introRevealed, triggerReveal]);

  // Coordinated Hero Scroll Parallax
  useHeroScroll(heroSectionRef, heroLeftRef);

  // Natural, butter-smooth scroll-triggered reveals across sections
  useRevealOnScroll('.featured-course-item', coursesSectionRef, { y: 25, duration: 0.7, stagger: 0.08 });
  useCurtainReveal(aboutCurtainRef, aboutContentRef);
  useRevealOnScroll('.testimonial-card', testimonialsRef, { y: 25, duration: 0.8 });

  useEffect(() => {
    // Load courses and testimonials from API
    const loadData = async () => {
      try {
        const [courseRes, testRes] = await Promise.all([
          api.getCourses(),
          api.getTestimonials(),
        ]);
        if (courseRes.success && courseRes.data?.length > 0) {
          setCourses(courseRes.data);
        }
        if (testRes.success && testRes.data?.length > 0) {
          setTestimonials(testRes.data);
        }
      } catch (err) {
        console.warn('API fetch warning on home:', err.message);
      }
    };
    loadData();
  }, []);


  // Display all 5 core training tracks
  const displayCourses = courses.length > 0 ? courses : fallbackCourses;

  // 8 Cybersecurity Domains with authentic public/images
  const domains = [
    { title: 'Ethical Hacking', image: '/images/01_ethical_hacking.png', icon: Shield },
    { title: 'Web Application Security', image: '/images/02_application_security.png', icon: FileCode },
    { title: 'Network Security', image: '/images/03_network_security.png', icon: Server },
    { title: 'Cloud Security', image: '/images/04_cloud_security.png', icon: Cloud },
    { title: 'Mobile Security', image: '/images/05_mobile_security.png', icon: Smartphone },
    { title: 'SOC / SIEM', image: '/images/06_soc_siem.png', icon: Radio },
    { title: 'Red Team Operations', image: '/images/07_red_team_operations.png', icon: Crosshair },
    { title: 'DevSecOps', image: '/images/08_devsecops.png', icon: Cpu },
  ];

  const currentTestimonial = testimonials[currentTestimonialIndex] || verifiedTestimonials[0];

  return (
    <div className="relative overflow-hidden">

      {/* ==================================================== */}
      {/* SECTION B: FULL-SCREEN CINEMATIC HERO                */}
      {/* Central 3D Globe with Left Text & Right Telemetry HUD */}
      {/* ==================================================== */}
      <section ref={heroSectionRef} className="relative w-full min-h-[94vh] lg:min-h-screen flex items-center overflow-hidden">

        {/* ── LAYER 0: Full-Screen 3D Globe Background (Centered) ── */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <HeroScene fullscreen />
        </div>

        {/* ── Centered Circle Holographic Globe Frame Reveal ── */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <div
            className={`relative w-[340px] h-[340px] sm:w-[460px] sm:h-[460px] lg:w-[560px] lg:h-[560px] rounded-full border border-cyber-neonGreen/25 shadow-[0_0_60px_rgba(0,245,160,0.15)] transition-all duration-1000 ease-out ${
              introRevealed ? 'scale-100 opacity-100' : 'scale-90 opacity-40'
            }`}
          >
            {/* Outer dashed spinning ring */}
            <div className="absolute -inset-3 sm:-inset-4 rounded-full border border-dashed border-cyber-teal/20 animate-[spin_40s_linear_infinite]" />
            {/* Inner reverse ring */}
            <div className="absolute -inset-7 sm:-inset-8 rounded-full border border-cyber-neonGreen/10 animate-[spin_60s_linear_infinite_reverse]" />
            {/* Radar arc */}
            <div className="absolute inset-0 rounded-full overflow-hidden opacity-30">
              <div className="w-full h-full bg-[conic-gradient(from_0deg,transparent_0_300deg,rgba(0,245,160,0.25)_360deg)] animate-[spin_10s_linear_infinite]" />
            </div>
          </div>
        </div>

        {/* ── LAYER 1: Subtle Vignette / Radial Overlay (keeps globe bright in center) ── */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 50% 50%, rgba(7,10,15,0.2) 0%, rgba(7,10,15,0.68) 65%, rgba(7,10,15,0.92) 100%)',
          }}
        />

        {/* ── LAYER 2: Cyber-grid texture overlay ── */}
        <div className="absolute inset-0 z-10 cyber-grid-bg opacity-15 pointer-events-none" />

        {/* ── LAYER 3: Ambient glows ── */}
        <div className="absolute top-1/4 left-4 w-[420px] h-[420px] bg-cyber-neonGreen/8 blur-[160px] rounded-full pointer-events-none z-10" />
        <div className="absolute bottom-1/4 right-4 w-[420px] h-[420px] bg-cyber-violet/8 blur-[160px] rounded-full pointer-events-none z-10" />

        {/* ── LAYER 4: Hero Content Container (Centered Cinematic Composition) ── */}
        <div className="relative z-20 w-full pt-28 sm:pt-36 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center">

            {/* Status badge */}
            <div
              className={`inline-flex items-center space-x-2 px-3.5 py-1.5 mb-6 rounded-full glass-panel border border-cyber-neonGreen/30 text-cyber-neonGreen text-xs font-mono tracking-widest uppercase smooth-reveal-item ${
                introRevealed ? 'revealed' : 'pointer-events-none'
              }`}
              style={{ transitionDelay: '150ms' }}
            >
              <span className="w-2 h-2 rounded-full bg-cyber-neonGreen animate-pulse" />
              <span>CYBERSECURITY TRAINING • PRACTICAL LEARNING</span>
            </div>

            {/* Signature Headline with masked line reveal & smooth blur-fade */}
            <h1 ref={heroLeftRef} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-extrabold tracking-tight text-cyber-text leading-[1.08] mb-6">
              <span className="neiden-mask-wrapper block">
                <span
                  className={`neiden-line-reveal smooth-reveal-item ${
                    introRevealed ? 'revealed' : ''
                  }`}
                  style={{ transitionDelay: '300ms' }}
                >
                  Become the Next
                </span>
              </span>
              <span className="neiden-mask-wrapper block">
                <span
                  className={`neiden-line-reveal text-gradient-neon smooth-reveal-item ${
                    introRevealed ? 'revealed' : ''
                  }`}
                  style={{ transitionDelay: '460ms' }}
                >
                  Cyber Defender.
                </span>
              </span>
            </h1>

            {/* Supporting Copy */}
            <p
              className={`text-base sm:text-lg text-cyber-muted/90 max-w-2xl leading-relaxed mb-8 smooth-reveal-item ${
                introRevealed ? 'revealed' : 'pointer-events-none'
              }`}
              style={{ transitionDelay: '640ms' }}
            >
              Build practical cybersecurity skills through ethical hacking, penetration testing, and career-focused security training in authorized real-time labs.
            </p>

            {/* CTA Buttons */}
            <div
              className={`flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 mb-10 smooth-reveal-item ${
                introRevealed ? 'revealed pointer-events-auto' : 'pointer-events-none'
              }`}
              style={{ transitionDelay: '820ms' }}
            >
              <Link
                to="/trainings"
                className="w-full sm:w-auto px-8 py-3.5 rounded-lg font-mono font-bold text-xs uppercase tracking-wider text-black bg-cyber-neonGreen hover:bg-cyber-teal shadow-neon-green transition-all transform hover:-translate-y-0.5 active:translate-y-0 text-center flex items-center justify-center space-x-2"
              >
                <span>Explore Courses</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>

              <button
                type="button"
                onClick={() => openDemoModal()}
                className="w-full sm:w-auto px-8 py-3.5 rounded-lg font-mono font-semibold text-xs uppercase tracking-wider text-cyber-text hover:text-cyber-neonGreen glass-panel border border-cyber-border hover:border-cyber-neonGreen/60 transition-all text-center flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Shield className="w-4 h-4 text-cyber-neonGreen" />
                <span>Book a Free Demo</span>
              </button>
            </div>

            {/* Balanced Supporting Metrics Pill */}
            <div
              className={`inline-flex flex-wrap items-center justify-center gap-6 sm:gap-10 px-6 py-3 rounded-2xl glass-panel border border-cyber-border/70 backdrop-blur-md smooth-reveal-item ${
                introRevealed ? 'revealed pointer-events-auto' : 'pointer-events-none'
              }`}
              style={{ transitionDelay: '980ms' }}
            >
              <div className="flex items-center space-x-2">
                <span className="text-xl sm:text-2xl font-display font-extrabold text-white">5</span>
                <span className="text-[11px] font-mono text-cyber-dim uppercase tracking-wider">Core Tracks</span>
              </div>
              <span className="text-cyber-border/80 hidden sm:inline">•</span>
              <div className="flex items-center space-x-2">
                <span className="text-xl sm:text-2xl font-display font-extrabold text-cyber-neonGreen">100%</span>
                <span className="text-[11px] font-mono text-cyber-dim uppercase tracking-wider">Hands-On Labs</span>
              </div>
              <span className="text-cyber-border/80 hidden sm:inline">•</span>
              <div className="flex items-center space-x-2">
                <span className="text-xl sm:text-2xl font-display font-extrabold text-cyber-teal">1-on-1</span>
                <span className="text-[11px] font-mono text-cyber-dim uppercase tracking-wider">Mentorship</span>
              </div>
            </div>

          </div>
        </div>

        {/* ── LAYER 5: Bottom smooth fade-out into 4-cards section ── */}
        <div
          className="absolute bottom-0 left-0 right-0 h-28 z-20 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, #070A0F)' }}
        />
      </section>

      {/* ==================================================== */}
      {/* SECTION D: FLUID 3D COURSE SHOWCASE (5 COURSES)      */}
      {/* ==================================================== */}
      <section ref={coursesSectionRef} className="py-20 lg:py-24 relative overflow-hidden">
        <CyberCardBackdrop variant="teal" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full glass-panel border border-cyber-neonGreen/30 text-cyber-neonGreen text-[11px] font-mono mb-3">
                <Sparkles className="w-3.5 h-3.5 text-cyber-neonGreen" />
                <span>CYBER TRAINING TRACKS • 5 CORE PROGRAMMES</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-cyber-text">
                Featured Training <span className="text-gradient-green">Programmes</span>
              </h2>
            </div>
            <div className="flex items-center">
              <Link
                to="/trainings"
                className="inline-flex items-center space-x-1.5 text-xs font-mono text-cyber-teal hover:text-cyber-neonGreen transition-colors group"
              >
                <span>VIEW FULL CATALOGUE</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Fluid Horizontal Snap Track with Smooth Native Scrolling & Mouse Wheel Support */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div
            ref={coursesTrackRef}
            className="flex flex-row flex-nowrap gap-6 md:gap-8 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar py-4 px-1 items-stretch"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {displayCourses.map((course) => (
              <div
                key={course.slug}
                className="featured-course-item snap-start shrink-0 w-[300px] sm:w-[380px] lg:w-[410px] flex flex-col"
              >
                <TiltCard className="h-full w-full flex flex-col">
                  <div className="h-full w-full rounded-2xl glass-panel p-6 sm:p-7 flex flex-col justify-between border border-cyber-border hover:border-cyber-neonGreen/50 bg-cyber-card/90 transition-all shadow-xl">
                    <div>
                      {/* Course Code & Price Badge */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="px-2.5 py-1 rounded bg-cyber-surface border border-cyber-border text-[11px] font-mono text-cyber-neonGreen font-semibold">
                          {course.code}
                        </span>
                        <span className="text-sm font-mono font-bold text-cyber-text">
                          ₹{course.price ? course.price.toLocaleString('en-IN') : '25,000'}{' '}
                          <span className="text-[10px] text-cyber-dim">{course.gstInfo || '+ GST'}</span>
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-display font-bold text-cyber-text mb-2.5 hover:text-cyber-neonGreen transition-colors">
                        <Link to={`/courses/${course.slug}`}>{course.title}</Link>
                      </h3>

                      {/* Short Description */}
                      <p className="text-xs text-cyber-muted line-clamp-3 mb-6 leading-relaxed">
                        {course.shortDescription}
                      </p>

                      {/* Key Features List */}
                      <ul className="space-y-2 mb-6">
                        {(course.features || []).slice(0, 3).map((feat, i) => (
                          <li key={i} className="flex items-start text-xs text-cyber-muted">
                            <CheckCircle className="w-3.5 h-3.5 text-cyber-neonGreen shrink-0 mr-2 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Actions */}
                    <div className="pt-4 border-t border-cyber-border/60 flex items-center space-x-3">
                      <Link
                        to={`/courses/${course.slug}`}
                        className="flex-1 py-2.5 rounded-lg text-center font-mono text-xs font-semibold text-cyber-text bg-cyber-surface hover:bg-cyber-neonGreen/10 border border-cyber-border hover:border-cyber-neonGreen transition-colors"
                      >
                        Course Details
                      </Link>
                      <button
                        type="button"
                        onClick={() => openDemoModal(course.title)}
                        className="py-2.5 px-3 rounded-lg text-center font-mono text-xs font-bold text-black bg-cyber-neonGreen hover:bg-cyber-teal shadow-neon-green transition-colors cursor-pointer"
                        title="Request Free Demo"
                      >
                        Demo
                      </button>
                    </div>
                  </div>
                </TiltCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================== */}
      {/* 1. ABOUT SECTION (CENTERED & BALANCED)               */}
      {/* Right side removed, mission typing effect added,     */}
      {/* and zero location mentions in this section!          */}
      {/* ==================================================== */}
      <section className="curtain-wrapper py-24 relative bg-[#090E16]/90 border-y border-cyber-border">
        <CyberCardBackdrop variant="green" />

        {/* Animated Theater Dark Curtain Panel that lifts/wipes on scroll */}
        <div ref={aboutCurtainRef} className="curtain-overlay" />

        <div ref={aboutContentRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center space-y-6">
            <span className="text-xs font-mono tracking-widest text-cyber-neonGreen uppercase inline-block px-3.5 py-1.5 rounded-full glass-panel border border-cyber-neonGreen/30 shadow-neon-green/20">
              PREMIER CYBERSECURITY ACADEMY
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-cyber-text leading-tight">
              About <span className="text-gradient-neon">NERDS LAB</span>
            </h2>

            <p className="text-base sm:text-lg text-cyber-muted leading-relaxed max-w-3xl">
              “NERDS LAB is a premier cybersecurity training platform committed to shaping the future of cybersecurity expertise. Through innovative programs, hands-on learning experiences, and expert guidance, we empower individuals with the skills and knowledge necessary to excel in today's digital age.”
            </p>

            {/* Animated Typing Mission Statement */}
            <MissionStatementTyping />
            
            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider text-black bg-cyber-neonGreen hover:bg-cyber-teal shadow-neon-green transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Discover NERDS LAB</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================== */}
      {/* 2. CYBERSECURITY DOMAINS (FLUID INTERACTIVE CAROUSEL)*/}
      {/* ==================================================== */}
      <section ref={domainsRef} className="py-24 relative overflow-hidden bg-[#070A0F]">
        <CyberCardBackdrop variant="green" />

        {/* Lightweight Static Cyber Grid Texture (Zero main-thread rasterization on scroll) */}
        <div className="absolute inset-0 cyber-grid-dots opacity-20 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono tracking-widest text-cyber-neonGreen uppercase block mb-2">
                Specialized Cyber Domains
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-cyber-text">
                Cybersecurity <span className="text-gradient-green">Domains</span>
              </h2>
              <p className="text-xs sm:text-sm text-cyber-muted mt-2 max-w-xl">
                Explore frontline cybersecurity disciplines covered across our hands-on curricula and cyber battle ranges.
              </p>
            </div>
            <div className="mt-4 md:mt-0 text-[10px] font-mono text-cyber-dim tracking-widest uppercase flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-cyber-neonGreen animate-pulse" />
              <span>HOVER TO PAUSE STREAM</span>
            </div>
          </div>
        </div>

        {/* Continuous Animated Flow for Cyber Domain Moving Cards */}
        <div className="relative w-full overflow-hidden py-4 select-none">
          <div className="animate-cyber-flow flex gap-6 px-4">
            {[...domains, ...domains].map((dom, idx) => {
              const IconComp = dom.icon;
              const domainIndex = (idx % domains.length) + 1;
              return (
                <div
                  key={idx}
                  className="w-[280px] sm:w-[320px] shrink-0 rounded-2xl border border-cyber-border/80 hover:border-cyber-neonGreen/60 bg-[#0B111A] hover:bg-[#0E1624] transition-all duration-300 group overflow-hidden shadow-xl flex flex-col justify-between"
                >
                  {/* Full-Width Domain Image Banner */}
                  <div className="relative w-full h-44 sm:h-48 overflow-hidden bg-[#070A0F]">
                    <img
                      src={dom.image}
                      alt={dom.title}
                      loading="eager"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter group-hover:brightness-110"
                    />
                    {/* Dark gradient fade for smooth contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B111A] via-transparent to-black/30 pointer-events-none" />
                    
                    {/* Domain Index Badge */}
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#0B111A]/95 border border-cyber-border/80 text-[10px] font-mono text-cyber-neonGreen font-bold shadow-md">
                      DOMAIN // 0{domainIndex}
                    </div>

                    <div className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-[#0B111A]/95 border border-cyber-border/80 flex items-center justify-center text-cyber-neonGreen group-hover:text-cyber-teal group-hover:border-cyber-neonGreen transition-colors">
                      <IconComp className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Domain Info & Action */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <h4 className="text-base sm:text-lg font-display font-bold text-cyber-text group-hover:text-cyber-neonGreen transition-colors leading-snug">
                        {dom.title}
                      </h4>
                      <p className="text-xs text-cyber-muted mt-1 leading-relaxed">
                        Authorized training tracks &amp; simulated live laboratory exercises.
                      </p>
                    </div>

                    <div className="pt-2 border-t border-cyber-border/60 flex items-center justify-between text-xs font-mono">
                      <Link
                        to="/trainings"
                        className="text-cyber-teal hover:text-cyber-neonGreen flex items-center space-x-1 group/btn transition-colors"
                      >
                        <span>Explore Track</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                      <span className="text-[10px] text-cyber-dim uppercase">VERIFIED</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================================================== */}
      {/* SECTION I: VERIFIED TESTIMONIALS (CLEAN EDITORIAL)   */}
      {/* (No user profile/avatar beside or beneath - clean!)  */}
      {/* ==================================================== */}
      <section ref={testimonialsRef} className="py-24 relative overflow-hidden bg-cyber-surface/30 border-y border-cyber-border">
        <CyberCardBackdrop variant="green" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full glass-panel border border-cyber-neonGreen/30 text-cyber-neonGreen text-xs font-mono mb-2">
                <Shield className="w-3.5 h-3.5" />
                <span>VERIFIED TESTIMONIALS • NERDSLAB.IN</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-cyber-text">
                Our Nerds' <span className="text-gradient-green">Testimonials</span>
              </h2>
              <p className="text-xs sm:text-sm text-cyber-muted mt-2 max-w-xl">
                Hear directly from graduates placed as Security Engineers and IS Audit Trainees across leading technology organizations.
              </p>
            </div>

            {/* Carousel navigation controls */}
            <div className="mt-4 md:mt-0 flex items-center space-x-2">
              <button
                type="button"
                onClick={() =>
                  setCurrentTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
                }
                className="p-2.5 rounded-lg bg-cyber-card border border-cyber-border hover:border-cyber-neonGreen text-cyber-muted hover:text-cyber-neonGreen transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() =>
                  setCurrentTestimonialIndex((prev) => (prev + 1) % testimonials.length)
                }
                className="p-2.5 rounded-lg bg-cyber-card border border-cyber-border hover:border-cyber-neonGreen text-cyber-muted hover:text-cyber-neonGreen transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Clean Editorial Testimonial Card (NO avatar/profile displayed) */}
          <div className="testimonial-card relative rounded-2xl glass-panel-glow p-8 sm:p-12 border border-cyber-neonGreen/30 bg-cyber-card/90 shadow-2xl transition-all duration-500">
            <Quote className="w-14 h-14 text-cyber-neonGreen/10 absolute top-6 right-6 pointer-events-none" />

            {/* Verified Placement Status */}
            <div className="flex items-center justify-between mb-6">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-cyber-surface/90 border border-cyber-neonGreen/30 text-xs font-mono text-cyber-neonGreen shadow-[0_0_12px_rgba(0,245,160,0.15)]">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyber-neonGreen" />
                <span>VERIFIED ALUMNI PLACEMENT</span>
              </div>
            </div>

            {/* Approved Quotation */}
            <blockquote className="text-base sm:text-lg text-cyber-text/95 leading-relaxed italic mb-8 border-l-2 border-cyber-neonGreen/40 pl-4 sm:pl-6">
              "{currentTestimonial.approvedQuotation}"
            </blockquote>

            {/* Author Details (Clean Editorial Typography, No Avatars) */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t border-cyber-border/80 pt-6 space-y-2 sm:space-y-0">
              <div>
                <h4 className="text-base sm:text-lg font-bold text-cyber-text">
                  {currentTestimonial.learnerName}
                </h4>
                <p className="text-xs sm:text-sm text-cyber-teal font-mono">
                  {currentTestimonial.designation}
                  {currentTestimonial.organization && ` • ${currentTestimonial.organization}`}
                </p>
                {currentTestimonial.location && (
                  <span className="text-[10px] text-cyber-dim font-mono block mt-0.5">
                    📍 {currentTestimonial.location}
                  </span>
                )}
              </div>

              <div className="text-xs font-mono text-cyber-dim tracking-wider">
                TESTIMONIAL {String(currentTestimonialIndex + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
              </div>
            </div>
          </div>

          {/* Clean Editorial Pagination Indicator Dots (No Avatar Thumbnails) */}
          <div className="mt-8 flex items-center justify-center space-x-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentTestimonialIndex(idx)}
                className={`transition-all duration-300 rounded-full ${
                  idx === currentTestimonialIndex
                    ? 'w-6 h-2 bg-cyber-neonGreen shadow-neon-green'
                    : 'w-2 h-2 bg-cyber-border hover:bg-cyber-muted'
                }`}
                aria-label={`Jump to testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
