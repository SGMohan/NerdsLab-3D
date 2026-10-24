import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Shield,
  Award,
  CheckCircle,
  ChevronDown,
  ArrowRight,
  Send,
  AlertCircle,
  CheckCircle2,
  BookOpen
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ContactBackground } from '../components/backgrounds/ContactBackground';
import { api } from '../services/api';
import { useRevealOnScroll, useSectionZoomScrub } from '../hooks/useScrollAnimation';

const enquirySchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  message: z.string().optional(),
});

export const CourseDetailPage = () => {
  const { slug } = useParams();
  const [course, setCourse] = useState(null);
  const [allCourses, setAllCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openSections, setOpenSections] = useState({ 0: true });
  const [formState, setFormState] = useState({ loading: false, success: false, error: null });

  const heroTextRef = useRef(null);
  const syllabusRef = useRef(null);

  useRevealOnScroll('.course-hero-text', heroTextRef, { y: 25, duration: 0.8 });
  useSectionZoomScrub(syllabusRef, { fromScale: 0.96, toScale: 1.01, scrub: 1 });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(enquirySchema),
    defaultValues: { fullName: '', email: '', phone: '', message: '' },
  });

  useEffect(() => {
    let isMounted = true;
    const fetchCourseData = async () => {
      // If we don't have course data yet, show loading; if switching courses, transition smoothly
      if (!course) setLoading(true);
      try {
        const [courseRes, allRes] = await Promise.all([
          api.getCourseBySlug(slug),
          api.getCourses(),
        ]);
        if (isMounted) {
          if (courseRes.success) {
            setCourse(courseRes.data);
            setOpenSections({ 0: true });
          }
          if (allRes.success) {
            setAllCourses(allRes.data);
          }
        }
      } catch (err) {
        console.error('Course fetch error:', err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchCourseData();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return () => {
      isMounted = false;
    };
  }, [slug]);

  const toggleSection = (index) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const onSubmit = async (data) => {
    setFormState({ loading: true, success: false, error: null });
    try {
      await api.submitEnquiry({
        ...data,
        selectedCourse: course.title,
        enquiryType: 'Course Enquiry',
        subject: `Direct Course Enquiry for ${course.title} (${course.code})`,
      });

      setFormState({ loading: false, success: true, error: null });
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#00F5A0', '#00D4C8', '#8065FF'],
      });
      reset();
    } catch (err) {
      setFormState({
        loading: false,
        success: false,
        error: err.message || 'Submission failed. Please try again.',
      });
    }
  };

  if (loading && !course) {
    return (
      <div className="pt-36 pb-32 text-center">
        <p className="font-mono text-cyber-neonGreen animate-pulse">
          [DECRYPTING SYLLABUS DATA FOR {slug?.toUpperCase()}...]
        </p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="pt-36 pb-32 text-center max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-cyber-text mb-2">Course Not Found</h2>
        <p className="text-sm text-cyber-muted mb-6">
          The requested training programme does not exist or has been relocated.
        </p>
        <Link
          to="/trainings"
          className="px-6 py-2.5 rounded-lg bg-cyber-neonGreen text-black font-mono font-bold text-xs"
        >
          Back to Catalogue
        </Link>
      </div>
    );
  }

  const relatedCourses = allCourses.filter((c) => c.slug !== course.slug).slice(0, 3);

  return (
    <div key={slug} className="pt-24 pb-20 relative overflow-hidden min-h-screen animate-fade-in transition-all duration-500 ease-out">
      {/* 3D Contact Background Animation */}
      <ContactBackground />

      {/* ── BREADCRUMB ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 relative z-10">
        <nav className="flex items-center space-x-2 text-xs font-mono text-cyber-dim">
          <Link to="/" className="hover:text-cyber-muted transition-colors">Home</Link>
          <span>/</span>
          <Link to="/trainings" className="hover:text-cyber-muted transition-colors">Trainings</Link>
          <span>/</span>
          <span className="text-cyber-neonGreen font-semibold">{course.code}</span>
        </nav>
      </div>

      {/* ── COURSE HERO: CENTERED & BALANCED (NO SIDE CARD) ── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 relative z-10 text-center">
        <div ref={heroTextRef} className="course-hero-text space-y-4">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="px-3 py-1 rounded bg-cyber-neonGreen/10 border border-cyber-neonGreen/40 text-cyber-neonGreen font-mono text-xs font-bold shadow-[0_0_12px_rgba(0,245,160,0.2)]">
              {course.code}
            </span>
            <span className="px-3 py-1 rounded bg-cyber-surface/80 border border-cyber-border text-cyber-dim font-mono text-xs">
              {course.duration}
            </span>
            <span className="px-3 py-1 rounded bg-cyber-teal/10 border border-cyber-teal/30 text-cyber-teal font-mono text-xs">
              Industrial Specialization
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-cyber-text leading-tight tracking-tight">
            {course.title}
          </h1>

          <p className="text-sm sm:text-base text-cyber-muted max-w-2xl mx-auto leading-relaxed">
            {course.fullDescription}
          </p>

          {/* Centered Price & View Details Action Banner */}
          <div className="p-4 sm:p-5 rounded-2xl glass-panel-glow border border-cyber-neonGreen/40 flex flex-col sm:flex-row items-center justify-between max-w-lg mx-auto bg-cyber-surface/90 gap-4">
            <div className="text-center sm:text-left">
              <span className="text-[10px] font-mono text-cyber-dim uppercase block">Official Track Fee</span>
              <div className="text-2xl font-mono font-extrabold text-cyber-text">
                ₹{course.price.toLocaleString('en-IN')}{' '}
                <span className="text-xs font-normal text-cyber-neonGreen">{course.gstInfo}</span>
              </div>
            </div>

            <div className="flex items-center space-x-2.5 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('course-details-content');
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="flex-1 sm:flex-none px-5 py-2.5 rounded-lg font-mono font-semibold text-xs uppercase tracking-wider text-cyber-text hover:text-cyber-neonGreen glass-panel border border-cyber-border hover:border-cyber-neonGreen transition-all flex items-center justify-center space-x-1.5"
              >
                <span>View Details</span>
                <ChevronDown className="w-3.5 h-3.5 text-cyber-neonGreen animate-bounce" />
              </button>

              <a
                href="#enquiry-section"
                className="flex-1 sm:flex-none px-6 py-2.5 rounded-lg font-mono font-bold text-xs uppercase tracking-wider text-black bg-cyber-neonGreen hover:bg-cyber-teal shadow-neon-green transition-all text-center"
              >
                Enroll Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── SYLLABUS & DIRECT ENQUIRY FORM ── */}
      <section id="course-details-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-16 scroll-mt-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Main Left Content: Features & Syllabus */}
          <div ref={syllabusRef} className="lg:col-span-7 space-y-6">
            {/* Training Features */}
            <div>
              <h3 className="text-lg font-display font-bold text-cyber-text mb-3 flex items-center">
                <Award className="w-4 h-4 mr-2 text-cyber-neonGreen" />
                Key Training Highlights
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {course.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg glass-panel border border-cyber-border/70 flex items-start space-x-2 text-xs text-cyber-muted bg-cyber-card/70"
                  >
                    <CheckCircle className="w-3.5 h-3.5 text-cyber-neonGreen shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed Syllabus Accordion with Smooth Expansion */}
            <div>
              <h3 className="text-lg font-display font-bold text-cyber-text mb-3 flex items-center">
                <BookOpen className="w-4 h-4 mr-2 text-cyber-teal" />
                Curriculum Modules
              </h3>

              <div className="space-y-2">
                {course.syllabus.map((section, idx) => {
                  const isOpen = !!openSections[idx];
                  return (
                    <div
                      key={idx}
                      className={`rounded-xl glass-panel border transition-all duration-300 overflow-hidden bg-cyber-card/75 ${
                        isOpen ? 'border-cyber-neonGreen/50 shadow-[0_0_15px_rgba(0,245,160,0.1)]' : 'border-cyber-border hover:border-cyber-borderGlow'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => toggleSection(idx)}
                        className="w-full p-3.5 flex items-center justify-between text-left hover:bg-cyber-card transition-colors group"
                      >
                        <span className="text-xs sm:text-sm font-bold text-cyber-text group-hover:text-cyber-neonGreen transition-colors flex items-center">
                          <span
                            className={`w-2 h-2 rounded-full mr-2.5 transition-all duration-300 ${
                              isOpen
                                ? 'bg-cyber-neonGreen shadow-[0_0_8px_rgba(0,245,160,0.8)] scale-110'
                                : 'bg-cyber-dim'
                            }`}
                          />
                          {section.category}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 text-cyber-muted shrink-0 transition-transform duration-300 ${
                            isOpen ? 'rotate-180 text-cyber-neonGreen' : 'group-hover:text-cyber-text'
                          }`}
                        />
                      </button>

                      {/* Smooth CSS Grid Row Accordion Animation */}
                      <div
                        className={`grid transition-all duration-300 ease-in-out ${
                          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                        }`}
                      >
                        <div className="overflow-hidden">
                          <div className="p-3.5 pt-2 border-t border-cyber-border/60 bg-cyber-surface/50">
                            <ul className="space-y-1.5">
                              {section.topics.map((topic, tIdx) => (
                                <li key={tIdx} className="text-xs text-cyber-muted flex items-start space-x-2">
                                  <span className="text-cyber-neonGreen font-mono font-bold">•</span>
                                  <span>{topic}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Direct Admission & Enquiry Form */}
          <div id="enquiry-section" className="lg:col-span-5">
            <div className="sticky top-28 p-6 sm:p-7 rounded-2xl glass-panel-glow border border-cyber-neonGreen/30 bg-[#0A101D]/90 shadow-2xl">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-cyber-border">
                <h3 className="text-base font-bold text-cyber-text flex items-center">
                  <Shield className="w-4 h-4 mr-2 text-cyber-neonGreen" />
                  Quick Track Enrollment
                </h3>
                <span className="text-[10px] font-mono text-cyber-neonGreen font-semibold">SEATS OPEN</span>
              </div>

              {formState.success ? (
                <div className="py-8 text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-cyber-neonGreen mx-auto animate-bounce" />
                  <h4 className="text-lg font-bold text-cyber-text">Enquiry Submitted!</h4>
                  <p className="text-xs text-cyber-muted">
                    Our cybersecurity admissions team will reach out to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">
                  {formState.error && (
                    <div className="p-2.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center space-x-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{formState.error}</span>
                    </div>
                  )}

                  <div>
                    <label className="block text-[11px] font-mono text-cyber-muted mb-1">Full Name *</label>
                    <input
                      type="text"
                      {...register('fullName')}
                      placeholder="Your Full Name"
                      className="w-full px-3 py-2 rounded-lg bg-cyber-surface border border-cyber-border focus:border-cyber-neonGreen outline-none text-xs text-cyber-text placeholder:text-cyber-dim"
                    />
                    {errors.fullName && (
                      <p className="text-red-400 text-[10px] mt-1 font-mono">{errors.fullName.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-cyber-muted mb-1">Email Address *</label>
                    <input
                      type="email"
                      {...register('email')}
                      placeholder="alex@domain.com"
                      className="w-full px-3 py-2 rounded-lg bg-cyber-surface border border-cyber-border focus:border-cyber-neonGreen outline-none text-xs text-cyber-text placeholder:text-cyber-dim"
                    />
                    {errors.email && (
                      <p className="text-red-400 text-[10px] mt-1 font-mono">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-cyber-muted mb-1">Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      {...register('phone')}
                      placeholder="+91 89395 31337"
                      className="w-full px-3 py-2 rounded-lg bg-cyber-surface border border-cyber-border focus:border-cyber-neonGreen outline-none text-xs text-cyber-text placeholder:text-cyber-dim"
                    />
                    {errors.phone && (
                      <p className="text-red-400 text-[10px] mt-1 font-mono">{errors.phone.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-cyber-muted mb-1">Notes / Query</label>
                    <textarea
                      {...register('message')}
                      rows={2}
                      placeholder="Preferred batch timings or questions..."
                      className="w-full px-3 py-2 rounded-lg bg-cyber-surface border border-cyber-border focus:border-cyber-neonGreen outline-none text-xs text-cyber-text placeholder:text-cyber-dim resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={formState.loading}
                    className="w-full py-3 rounded-lg font-mono font-bold text-xs uppercase tracking-wider text-black bg-cyber-neonGreen hover:bg-cyber-teal shadow-neon-green transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
                  >
                    {formState.loading ? (
                      <span className="animate-pulse">SUBMITTING ENQUIRY...</span>
                    ) : (
                      <>
                        <span>Submit Course Enquiry</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* ── OTHER TRAINING TRACKS ── */}
      {relatedCourses.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-cyber-border relative z-10">
          <h3 className="text-xl font-display font-bold text-cyber-text mb-5">
            Explore Other <span className="text-gradient-green">Training Tracks</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 items-stretch">
            {relatedCourses.map((rel) => (
              <div
                key={rel.slug}
                className="p-5 rounded-xl glass-panel border border-cyber-border hover:border-cyber-neonGreen/40 bg-cyber-card/75 flex flex-col justify-between h-full"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono mb-2">
                    <span className="text-cyber-neonGreen">{rel.code}</span>
                    <span className="text-cyber-dim">₹{rel.price.toLocaleString('en-IN')}</span>
                  </div>
                  <h4 className="text-sm font-bold text-cyber-text mb-1.5">
                    <Link to={`/courses/${rel.slug}`} className="hover:text-cyber-neonGreen transition-colors">
                      {rel.title}
                    </Link>
                  </h4>
                  <p className="text-xs text-cyber-muted line-clamp-2 leading-relaxed">
                    {rel.shortDescription}
                  </p>
                </div>
                <div className="mt-3 pt-2.5 border-t border-cyber-border flex items-center justify-between">
                  <Link
                    to={`/courses/${rel.slug}`}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="text-xs font-mono text-cyber-teal hover:underline flex items-center"
                  >
                    View Details <ArrowRight className="w-3 h-3 ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
