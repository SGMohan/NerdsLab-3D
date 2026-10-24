import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  Users,
  Terminal,
  Award,
  Compass,
  ArrowRight,
  Star,
  CheckCircle,
  Activity,
  Lock,
  Eye
} from 'lucide-react';
import { TiltCard } from '../components/common/TiltCard';
import { ContactBackground } from '../components/backgrounds/ContactBackground';
import { MissionStatementTyping } from '../components/common/MissionStatementTyping';
import { useModal } from '../context/ModalContext';
import { api } from '../services/api';
import {
  useZoomOnScroll,
  useSectionZoomScrub,
  useRevealOnScroll,
} from '../hooks/useScrollAnimation';

export const AboutPage = () => {
  const { openDemoModal } = useModal();
  const [testimonials, setTestimonials] = useState([]);

  const headerRef = useRef(null);
  const missionRef = useRef(null);
  const whyRef = useRef(null);
  const row3Ref = useRef(null);

  // Coordinated Scroll Animations
  useRevealOnScroll('.about-header', headerRef, { y: 25, duration: 0.8 });
  useSectionZoomScrub(missionRef, { fromScale: 0.95, toScale: 1.02, scrub: 1 });
  useZoomOnScroll(whyRef, '.why-card', { fromScale: 0.9, toScale: 1.0, y: 25, stagger: 0.08 });
  useSectionZoomScrub(row3Ref, { fromScale: 0.95, toScale: 1.02, scrub: 1 });

  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        const res = await api.getTestimonials();
        if (res.success) setTestimonials(res.data.slice(0, 2));
      } catch (err) {
        console.warn('Testimonial fetch error in about:', err.message);
      }
    };
    loadTestimonials();
  }, []);

  const whyPoints = [
    {
      title: 'Active Field Mentors',
      desc: 'Mentorship from active penetration testing and defensive practitioners.',
      icon: Users,
    },
    {
      title: '100% Practical Labs',
      desc: 'Hands-on offensive & defensive exercises on real simulated corporate networks.',
      icon: Terminal,
    },
    {
      title: 'Placement Roadmaps',
      desc: 'Dedicated interview preparation and direct security industry referrals.',
      icon: Award,
    },
    {
      title: 'Flexible Hybrid Cohorts',
      desc: 'On-campus training in Thanjavur or interactive live online batches.',
      icon: Compass,
    },
  ];

  return (
    <div className="pt-24 pb-20 relative overflow-hidden">
      {/* 3D Contact Background Animation */}
      <ContactBackground />

      {/* ── HEADER: Centered High-Impact Title with Animated Text ── */}
      <div ref={headerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 relative z-10">
        <div className="about-header text-center max-w-3xl mx-auto space-y-3.5">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full glass-panel border border-cyber-neonGreen/30 text-cyber-neonGreen text-xs font-mono shadow-[0_0_15px_rgba(0,245,160,0.15)]">
            <Shield className="w-3.5 h-3.5" />
            <span>NERDS LAB CYBER COMMAND</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-cyber-text tracking-tight">
            Where Cybersecurity <br />
            <span className="text-gradient-neon">Excellence Begins</span>
          </h1>
          <p className="text-sm sm:text-base text-cyber-muted max-w-2xl mx-auto leading-relaxed">
            Shaping frontline cyber defenders through real-time simulated defense environments, zero-day threat analysis, and dedicated mentorship.
          </p>
        </div>
      </div>

      {/* ── SECTION 1: CENTERED MISSION STATEMENT & DIRECTIVE ── */}
      <section ref={missionRef} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 relative z-10 text-center">
        <div className="space-y-6">
          <div className="inline-flex items-center space-x-2 text-xs font-mono text-cyber-teal">
            <Activity className="w-3.5 h-3.5 animate-pulse text-cyber-neonGreen" />
            <span>DEFENSIVE CAPABILITY MATRIX</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-display font-bold text-cyber-text leading-tight">
            Transformative Cybersecurity <span className="text-gradient-green">Mastery</span>
          </h2>

          <p className="text-sm sm:text-base text-cyber-muted leading-relaxed max-w-2xl mx-auto">
            <strong className="text-cyber-text font-semibold">NERDS LAB</strong> equips ambitious engineers, students, and professionals with frontline security capabilities through real-time attack and defense simulations.
          </p>

          {/* Viewport-Triggered Live Mission Statement Typing */}
          <div className="my-4">
            <MissionStatementTyping />
          </div>

          {/* Quick Capability Matrix Badges */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-cyber-surface/90 border border-cyber-border text-xs font-mono text-cyber-text">
              <CheckCircle className="w-3.5 h-3.5 text-cyber-neonGreen" />
              <span>Legal Cyber Sandboxes</span>
            </span>
            <span className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-cyber-surface/90 border border-cyber-border text-xs font-mono text-cyber-text">
              <CheckCircle className="w-3.5 h-3.5 text-cyber-teal" />
              <span>Job-Ready Curriculums</span>
            </span>
            <span className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-cyber-surface/90 border border-cyber-border text-xs font-mono text-cyber-text">
              <CheckCircle className="w-3.5 h-3.5 text-cyber-violet" />
              <span>1-on-1 Mentorship</span>
            </span>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: WHY TRAIN WITH NERDS LAB (CENTERED 4-CARD GRID) ── */}
      <section ref={whyRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center space-x-2 text-xs font-mono text-cyber-neonGreen">
            <Eye className="w-3.5 h-3.5" />
            <span>THE STANDARD FOR CYBER DEFENSE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-cyber-text">
            Why Train With <span className="text-gradient-neon">NERDS LAB</span>
          </h2>
          <p className="text-sm text-cyber-muted leading-relaxed">
            Engineered for practical, industry-aligned cybersecurity mastery with zero textbook fluff.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
          {whyPoints.map((pt, i) => {
            const Icon = pt.icon;
            return (
              <div key={i} className="why-card h-full flex flex-col">
                <TiltCard className="h-full w-full flex flex-col">
                  <div className="p-6 rounded-2xl glass-panel border border-cyber-border hover:border-cyber-neonGreen/50 bg-[#0B111A]/90 transition-all flex flex-col justify-between group h-full w-full shadow-lg">
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-cyber-surface border border-cyber-border flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Icon className="w-6 h-6 text-cyber-neonGreen" />
                      </div>
                      <h4 className="text-base font-bold text-cyber-text mb-2">{pt.title}</h4>
                      <p className="text-xs text-cyber-muted leading-relaxed">{pt.desc}</p>
                    </div>
                  </div>
                </TiltCard>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── SECTION 3: LEARNER OUTCOMES & CTA ── */}
      <section ref={row3Ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Highlight Testimonials */}
          <div className="lg:col-span-6 space-y-4">
            <h3 className="text-2xl font-display font-bold text-cyber-text">
              Learner <span className="text-gradient-neon">Success Outcomes</span>
            </h3>
            
            <div className="space-y-3">
              {testimonials.map((t, idx) => (
                <div key={idx} className="p-4 rounded-xl glass-panel border border-cyber-border bg-cyber-card/70">
                  <p className="text-xs text-cyber-text/90 italic mb-2 leading-relaxed">
                    "{t.approvedQuotation}"
                  </p>
                  <div className="text-[11px] font-mono text-cyber-teal">
                    {t.learnerName} • {t.designation}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: High-Impact Action Box */}
          <div className="lg:col-span-6">
            <div className="p-8 sm:p-10 rounded-3xl glass-panel-glow border border-cyber-neonGreen/40 bg-cyber-surface/90 text-center space-y-4 shadow-[0_0_50px_rgba(0,245,160,0.12)]">
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-cyber-text">
                Ready to Become a Cyber Defender?
              </h3>
              <p className="text-xs sm:text-sm text-cyber-muted max-w-md mx-auto leading-relaxed">
                Connect directly with lead security mentors or book a complimentary live virtual demo class today.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  to="/trainings"
                  className="w-full sm:w-auto px-7 py-3 rounded-lg text-xs font-mono font-bold uppercase tracking-wider text-black bg-cyber-neonGreen hover:bg-cyber-teal shadow-neon-green transition-all"
                >
                  Explore 5 Courses
                </Link>
                <button
                  type="button"
                  onClick={() => openDemoModal()}
                  className="w-full sm:w-auto px-7 py-3 rounded-lg text-xs font-mono font-semibold uppercase tracking-wider text-cyber-text glass-panel border border-cyber-border hover:border-cyber-neonGreen transition-all"
                >
                  Book Free Demo
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
