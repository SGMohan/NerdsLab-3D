import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Shield, ChevronDown, Phone, Menu, X, Terminal } from 'lucide-react';
import { useModal } from '../../context/ModalContext';
import { useIntro } from '../../context/IntroContext';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileTrainingsOpen, setMobileTrainingsOpen] = useState(false);
  const [trainingsDropdownOpen, setTrainingsDropdownOpen] = useState(false);
  const { openDemoModal } = useModal();
  const { introRevealed } = useIntro();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setTrainingsDropdownOpen(false);
  }, [location.pathname]);

  const coursesList = [
    { title: 'Ethical Hacking Nerd', slug: 'ethical-hacking-nerd', code: 'C-EHN' },
    { title: 'Penetration Testing Nerd', slug: 'penetration-testing-nerd', code: 'C-PTN' },
    { title: 'Web App Security Nerd', slug: 'web-application-security-nerd', code: 'C-WASN' },
    { title: 'Cloud Security Nerd', slug: 'cloud-security-nerd', code: 'C-CSN' },
    { title: 'SOC Analysis Nerd', slug: 'soc-analysis-nerd', code: 'C-SAN' },
  ];

  const navLinkClass = ({ isActive }) =>
    `px-3 py-2 text-sm font-medium transition-all duration-200 relative ${
      isActive
        ? 'text-cyber-neonGreen font-semibold'
        : 'text-cyber-muted hover:text-cyber-text'
    }`;

  const mobileNavLinkClass = ({ isActive }) =>
    `text-base transition-colors duration-300 block py-1 ${
      isActive
        ? 'text-cyber-neonGreen font-semibold'
        : 'text-cyber-text hover:text-cyber-neonGreen'
    }`;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 smooth-reveal-navbar ${
          introRevealed ? 'revealed pointer-events-auto' : 'pointer-events-none'
        } ${
          isScrolled
            ? 'bg-cyber-bg/90 backdrop-blur-md border-b border-cyber-border shadow-xl py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo with authentic nerdslab-logo.png */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative flex items-center justify-center p-1 rounded-xl bg-cyber-surface/90 border border-cyber-neonGreen/40 group-hover:border-cyber-neonGreen transition-all shadow-[0_0_12px_rgba(0,245,160,0.2)] group-hover:shadow-[0_0_20px_rgba(0,245,160,0.4)] group-hover:scale-105 duration-300">
                <img
                  src="/nerdslab-logo.png"
                  alt="NERDS LAB Logo"
                  className="h-8 sm:h-9 w-auto object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-extrabold text-xl tracking-wider text-cyber-text group-hover:text-cyber-neonGreen transition-colors flex items-center">
                  NERDS<span className="text-cyber-neonGreen ml-1.5">LAB</span>
                </span>
                <span className="text-[9px] font-mono tracking-widest text-cyber-dim uppercase">
                  Cyber Defense Academy
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1">
              <NavLink to="/" className={navLinkClass}>
                Home
              </NavLink>
              <NavLink to="/about" className={navLinkClass}>
                About Us
              </NavLink>

              {/* Trainings Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setTrainingsDropdownOpen(true)}
                onMouseLeave={() => setTrainingsDropdownOpen(false)}
              >
                <button
                  type="button"
                  className={`flex items-center space-x-1 px-3 py-2 text-sm font-medium transition-colors ${
                    location.pathname.startsWith('/courses') || location.pathname === '/trainings'
                      ? 'text-cyber-neonGreen font-semibold'
                      : 'text-cyber-muted hover:text-cyber-text'
                  }`}
                  aria-expanded={trainingsDropdownOpen}
                >
                  <span>Trainings</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      trainingsDropdownOpen ? 'rotate-180 text-cyber-neonGreen' : ''
                    }`}
                  />
                </button>

                {trainingsDropdownOpen && (
                  <div className="absolute top-full left-0 w-72 pt-2 z-50">
                    <div className="glass-panel p-2 rounded-xl border border-cyber-border shadow-2xl bg-cyber-surface/95 backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-150">
                      <Link
                        to="/trainings"
                        className="block px-3 py-2 rounded-lg text-xs font-mono font-bold text-cyber-neonGreen hover:bg-cyber-card border-b border-cyber-border mb-1"
                      >
                        BROWSE ALL 5 PROGRAMMES →
                      </Link>
                      {coursesList.map((course) => (
                        <Link
                          key={course.slug}
                          to={`/courses/${course.slug}`}
                          className="flex items-center justify-between px-3 py-2 rounded-lg text-sm text-cyber-muted hover:text-cyber-text hover:bg-cyber-card transition-colors group"
                        >
                          <span className="group-hover:text-cyber-neonGreen transition-colors">
                            {course.title}
                          </span>
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyber-border text-cyber-dim group-hover:text-cyber-teal">
                            {course.code}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <NavLink to="/faq" className={navLinkClass}>
                FAQ
              </NavLink>
              <NavLink to="/contact" className={navLinkClass}>
                Contact Us
              </NavLink>
            </nav>

            {/* Right Action Area */}
            <div className="hidden lg:flex items-center space-x-4">
              {/* Click to Call */}
              <a
                href="tel:+918939531337"
                className="flex items-center space-x-2 text-xs font-mono text-cyber-muted hover:text-cyber-neonGreen transition-colors py-1 px-2.5 rounded border border-cyber-border hover:border-cyber-neonGreen/40 bg-cyber-surface/50"
              >
                <Phone className="w-3.5 h-3.5 text-cyber-neonGreen" />
                <span>+91 89395 31337</span>
              </a>

              {/* Primary CTA */}
              <button
                type="button"
                onClick={() => openDemoModal()}
                className="relative group px-5 py-2.5 rounded-lg font-medium text-xs font-mono uppercase tracking-wider text-black bg-cyber-neonGreen hover:bg-cyber-teal shadow-neon-green transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                Book a Free Demo
              </button>
            </div>

            {/* Mobile Actions: Free Demo CTA & Hamburger Trigger (portfolio-inspired) */}
            <div className="flex lg:hidden items-center space-x-3">
              <button
                type="button"
                onClick={() => openDemoModal()}
                className="px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-cyber-neonGreen text-black shadow-neon-green active:scale-95 transition-transform"
              >
                Free Demo
              </button>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 text-cyber-text hover:text-cyber-neonGreen transition-colors cursor-pointer"
                aria-label="Open mobile menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── MOBILE MENU BACKDROP OVERLAY ── */}
      <div
        className={`lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* ── MOBILE SLIDE-IN SIDE MENU DRAWER (REFERENCED FROM sgmohan-dev.netlify.app) ── */}
      <aside
        id="sideMenu"
        className={`lg:hidden fixed top-0 bottom-0 right-0 w-72 sm:w-80 max-w-[85vw] h-screen z-50 bg-[#0B111A]/95 backdrop-blur-2xl border-l border-cyber-border shadow-2xl transition-transform duration-500 ease-in-out flex flex-col justify-between ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Close Button at top-6 right-6 matching portfolio design */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(false)}
          className="absolute top-6 right-6 p-1 text-cyber-muted hover:text-cyber-neonGreen transition-colors cursor-pointer z-10"
          aria-label="Close menu"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Scrollable Navigation Area */}
        <div className="pt-20 pb-6 px-8 overflow-y-auto flex-1">
          {/* Brand header */}
          <div className="flex items-center space-x-2.5 mb-8 pb-4 border-b border-cyber-border/60">
            <div className="p-1 rounded-lg bg-cyber-surface border border-cyber-neonGreen/40 shadow-[0_0_10px_rgba(0,245,160,0.2)]">
              <img
                src="/nerdslab-logo.png"
                alt="NERDS LAB Logo"
                className="h-6 w-auto object-contain"
              />
            </div>
            <div>
              <span className="font-display font-extrabold text-base tracking-wider text-cyber-text">
                NERDS<span className="text-cyber-neonGreen ml-1">LAB</span>
              </span>
              <span className="block text-[8px] font-mono tracking-widest text-cyber-dim uppercase">
                Cyber Defense Academy
              </span>
            </div>
          </div>

          {/* Navigation Links with gap-5 layout from portfolio */}
          <ul className="flex flex-col gap-4 font-display">
            <li>
              <NavLink to="/" onClick={() => setMobileMenuOpen(false)} className={mobileNavLinkClass}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" onClick={() => setMobileMenuOpen(false)} className={mobileNavLinkClass}>
                About Us
              </NavLink>
            </li>

            {/* Trainings with expandable sub-links */}
            <li>
              <div className="flex items-center justify-between py-1">
                <NavLink
                  to="/trainings"
                  onClick={() => setMobileMenuOpen(false)}
                  className={mobileNavLinkClass}
                >
                  Trainings
                </NavLink>
                <button
                  type="button"
                  onClick={() => setMobileTrainingsOpen(!mobileTrainingsOpen)}
                  className="p-1 text-cyber-muted hover:text-cyber-neonGreen"
                  aria-label="Toggle courses"
                >
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      mobileTrainingsOpen ? 'rotate-180 text-cyber-neonGreen' : ''
                    }`}
                  />
                </button>
              </div>

              {mobileTrainingsOpen && (
                <ul className="pl-3 mt-2 space-y-2 border-l border-cyber-border/70 text-xs font-mono">
                  <li>
                    <Link
                      to="/trainings"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-cyber-neonGreen hover:underline block py-0.5"
                    >
                      Browse All 5 Tracks →
                    </Link>
                  </li>
                  {coursesList.map((course) => (
                    <li key={course.slug}>
                      <Link
                        to={`/courses/${course.slug}`}
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-cyber-muted hover:text-cyber-neonGreen transition-colors block py-0.5"
                      >
                        {course.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            <li>
              <NavLink to="/faq" onClick={() => setMobileMenuOpen(false)} className={mobileNavLinkClass}>
                FAQ
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" onClick={() => setMobileMenuOpen(false)} className={mobileNavLinkClass}>
                Contact Us
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Bottom Drawer Actions */}
        <div className="p-6 border-t border-cyber-border/60 bg-cyber-surface/50 space-y-3">
          <a
            href="tel:+918939531337"
            className="flex items-center justify-center space-x-2 w-full py-2.5 rounded-lg text-xs font-mono text-cyber-muted hover:text-cyber-neonGreen bg-cyber-card border border-cyber-border transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-cyber-neonGreen" />
            <span>+91 89395 31337</span>
          </a>

          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              openDemoModal();
            }}
            className="w-full py-3 rounded-lg font-mono font-bold text-xs uppercase tracking-wider text-black bg-cyber-neonGreen hover:bg-cyber-teal shadow-neon-green transition-all transform active:scale-98"
          >
            Book a Free Demo
          </button>
        </div>
      </aside>
    </>
  );
};
