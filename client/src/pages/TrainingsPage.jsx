import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Terminal, ArrowRight, CheckCircle, Search, Clock, Award, Shield } from 'lucide-react';
import { TiltCard } from '../components/common/TiltCard';
import { ContactBackground } from '../components/backgrounds/ContactBackground';
import { useModal } from '../context/ModalContext';
import { api } from '../services/api';
import { useRevealOnScroll, useZoomOnScroll } from '../hooks/useScrollAnimation';

export const TrainingsPage = () => {
  const { openDemoModal } = useModal();
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const headerRef = useRef(null);
  const coursesListRef = useRef(null);

  useRevealOnScroll('.catalogue-header', headerRef, { y: 25, duration: 0.8 });
  useZoomOnScroll(coursesListRef, '.course-card-item', { fromScale: 0.9, toScale: 1.0, y: 25, stagger: 0.08 });

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await api.getCourses();
        if (res.success) setCourses(res.data);
      } catch (err) {
        console.warn('Failed to load courses on catalogue:', err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const filteredCourses = courses.filter((course) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      course.title?.toLowerCase().includes(q) ||
      course.code?.toLowerCase().includes(q) ||
      course.shortDescription?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="pt-24 pb-20 relative overflow-hidden">
      {/* 3D Contact Background Animation */}
      <ContactBackground />

      {/* ── HEADER: Centered Title, Subtitle & Extended Search Bar ── */}
      <div ref={headerRef} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 relative z-10 text-center">
        <div className="catalogue-header space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full glass-panel border border-cyber-neonGreen/30 text-cyber-neonGreen text-xs font-mono shadow-[0_0_15px_rgba(0,245,160,0.15)]">
            <Terminal className="w-3.5 h-3.5" />
            <span>CURRICULUM DIRECTORY</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-cyber-text tracking-tight">
            Cybersecurity Training <br />
            <span className="text-gradient-neon">Catalogue</span>
          </h1>

          <p className="text-sm sm:text-base text-cyber-muted max-w-xl mx-auto leading-relaxed">
            Five specialized industrial tracks engineered with 100% practical virtual lab ranges, attack simulations, and verifiable credentials.
          </p>

          {/* Extended Full-Width Search Bar */}
          <div className="pt-2 max-w-2xl mx-auto px-4 sm:px-0">
            <div className="relative flex items-center w-full">
              <Search className="w-4 h-4 text-cyber-dim absolute left-4 pointer-events-none z-10" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search courses by title, domain, or code (e.g. C-PTN, SOC, Cloud)..."
                className="w-full pl-11 pr-11 py-3 rounded-xl bg-cyber-card/90 border border-cyber-border focus:border-cyber-neonGreen outline-none text-xs sm:text-sm text-cyber-text placeholder:text-cyber-dim font-mono transition-colors shadow-inner"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 text-cyber-dim hover:text-cyber-text text-xs p-1 z-10"
                  title="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── REVERTED ORIGINAL COURSE CARDS GRID (3-COLUMNS) ── */}
      <div ref={coursesListRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {loading ? (
          <div className="py-20 text-center font-mono text-sm text-cyber-neonGreen animate-pulse">
            [ACCESSING TRAINING DATABASE...]
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="py-16 text-center text-cyber-muted font-mono text-sm">
            No courses found matching your query.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            {filteredCourses.map((course) => (
              <div key={course.slug} className="course-card-item h-full flex flex-col">
                <TiltCard className="h-full w-full flex flex-col">
                  <div className="h-full w-full rounded-2xl glass-panel p-6 sm:p-7 flex flex-col justify-between border border-cyber-border hover:border-cyber-neonGreen/50 bg-[#0B111A]/90 transition-all shadow-xl group">
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

                      {/* Course Title */}
                      <h3 className="text-xl font-display font-bold text-cyber-text mb-2.5 group-hover:text-cyber-neonGreen transition-colors">
                        <Link to={`/courses/${course.slug}`}>{course.title}</Link>
                      </h3>

                      {/* Course Short Description */}
                      <p className="text-xs text-cyber-muted line-clamp-3 mb-5 leading-relaxed">
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
                        className="flex-1 py-2.5 rounded-lg text-center font-mono text-xs font-semibold text-cyber-text bg-cyber-surface hover:bg-cyber-neonGreen/10 border border-cyber-border hover:border-cyber-neonGreen transition-colors flex items-center justify-center space-x-1"
                      >
                        <span>Course Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => openDemoModal(course.title)}
                        className="py-2.5 px-4 rounded-lg text-center font-mono text-xs font-bold text-black bg-cyber-neonGreen hover:bg-cyber-teal shadow-neon-green transition-colors"
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
        )}
      </div>
    </div>
  );
};
