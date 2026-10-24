import React, { useState, useEffect, useRef } from 'react';
import { Terminal } from 'lucide-react';
import { prefersReducedMotion } from '../../hooks/useScrollAnimation';

const MISSION_STATEMENT =
  '“Fueling the next generation of cybersecurity leaders through innovative training and building resilience in a digital world.”';

/**
 * MissionStatementTyping
 * Smooth animated terminal typing effect for the official NERDS LAB mission statement.
 * - Cursor strictly follows each character inline as it is typed.
 * - Triggers when entering the viewport.
 * - Cadence: ~50ms per character.
 * - Single-instance guard and cleanup on unmount.
 */
export const MissionStatementTyping = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(false);

  const containerRef = useRef(null);
  const intervalRef = useRef(null);
  const isRunningRef = useRef(false);
  const observerRef = useRef(null);

  useEffect(() => {
    // If user prefers reduced motion, display the complete statement immediately
    if (prefersReducedMotion()) {
      setDisplayedText(MISSION_STATEMENT);
      setHasCompleted(true);
      return;
    }

    const startTyping = () => {
      // Guard against multiple simultaneous runs
      if (isRunningRef.current) return;
      isRunningRef.current = true;

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      setDisplayedText('');
      setIsTyping(true);
      setHasCompleted(false);

      let charIndex = 0;
      const totalChars = MISSION_STATEMENT.length;

      intervalRef.current = setInterval(() => {
        charIndex += 1;
        setDisplayedText(MISSION_STATEMENT.slice(0, charIndex));

        if (charIndex >= totalChars) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          setIsTyping(false);
          setHasCompleted(true);
          isRunningRef.current = false;
        }
      }, 70); // Smooth, readable ~70ms typing speed
    };

    const targetEl = containerRef.current;
    if (!targetEl) return;

    // Check if element is already in viewport upon mount
    const rect = targetEl.getBoundingClientRect();
    const isAlreadyInViewport =
      rect.top < window.innerHeight && rect.bottom > 0;

    if (isAlreadyInViewport) {
      startTyping();
    } else {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          if (entry.isIntersecting && !isRunningRef.current) {
            if (observerRef.current) {
              observerRef.current.disconnect();
              observerRef.current = null;
            }
            startTyping();
          }
        },
        { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
      );
      observerRef.current.observe(targetEl);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
      isRunningRef.current = false;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative max-w-3xl w-full my-6 p-6 sm:p-8 rounded-2xl glass-panel-glow border border-cyber-neonGreen/40 bg-[#0B111A]/90 shadow-[0_0_30px_rgba(0,245,160,0.12)] cyber-bracket text-center mx-auto"
    >
      {/* Top Header Badge */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-cyber-border/60">
        <div className="flex items-center space-x-2 text-[11px] font-mono text-cyber-neonGreen uppercase tracking-wider mx-auto sm:mx-0">
          <Terminal className="w-3.5 h-3.5 text-cyber-neonGreen" />
          <span className="font-bold">MISSION STATEMENT</span>
          <span className="text-cyber-dim">//</span>
          <span className="text-cyber-muted">NERDS LAB DIRECTIVE</span>
        </div>
      </div>

      {/* Main Mission Text with Inline Typing Cursor moving with letters */}
      <blockquote className="min-h-[85px] sm:min-h-[70px] font-mono text-base sm:text-lg md:text-xl text-cyber-text leading-relaxed font-medium text-center">
        <span className="inline">
          {displayedText}
          <span
            className="inline-block w-[3px] sm:w-[3.5px] h-[1.15em] ml-1 bg-cyber-neonGreen align-middle shadow-[0_0_8px_#00F5A0] animate-pulse"
            style={{ verticalAlign: '-0.15em' }}
            aria-hidden="true"
          />
        </span>
      </blockquote>

      {/* Subtle Bottom Accent Indicator */}
      <div className="mt-4 pt-3 border-t border-cyber-border/40 flex items-center justify-center space-x-4 text-[10px] font-mono text-cyber-dim">
        <span className="flex items-center space-x-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-cyber-neonGreen" />
          <span>CYBER RESILIENCE</span>
        </span>
        <span>•</span>
        <span className="flex items-center space-x-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-cyber-teal" />
          <span>INNOVATIVE TRAINING</span>
        </span>
        <span>•</span>
        <span className="flex items-center space-x-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-cyber-violet" />
          <span>JOB-READY LEADERS</span>
        </span>
      </div>
    </div>
  );
};
