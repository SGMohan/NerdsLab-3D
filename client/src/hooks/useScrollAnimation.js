/**
 * useScrollAnimation.js
 * Central GSAP + ScrollTrigger animation hooks.
 * All hooks handle reduced-motion and GSAP context cleanup automatically.
 */
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function prefersReducedMotion() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Fade + slide up reveal for one or many elements.
 */
export function useRevealOnScroll(
  selector,
  containerRef,
  {
    y = 40,
    opacity = 0,
    duration = 0.85,
    stagger = 0.12,
    ease = 'power3.out',
    start = 'top 88%',
    delay = 0,
  } = {},
  deps = []
) {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const elements =
        typeof selector === 'string'
          ? gsap.utils.toArray(selector, containerRef?.current)
          : [selector];
      if (!elements.length) return;
      gsap.fromTo(
        elements,
        { y, opacity },
        {
          y: 0,
          opacity: 1,
          duration,
          stagger,
          ease,
          delay,
          scrollTrigger: {
            trigger: elements[0],
            start,
            once: true,
          },
        }
      );
    }, containerRef);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/**
 * Staggered children reveal from a parent container ref.
 */
export function useStaggerReveal(
  containerRef,
  childSelector = '*',
  {
    y = 30,
    x = 0,
    opacity = 0,
    duration = 0.7,
    stagger = 0.1,
    ease = 'power2.out',
    start = 'top 85%',
  } = {},
  deps = []
) {
  useEffect(() => {
    if (!containerRef.current || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray(childSelector, containerRef.current);
      if (!items.length) return;
      gsap.fromTo(
        items,
        { y, x, opacity },
        {
          y: 0,
          x: 0,
          opacity: 1,
          duration,
          stagger,
          ease,
          scrollTrigger: {
            trigger: containerRef.current,
            start,
            once: true,
          },
        }
      );
    }, containerRef);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/**
 * Scroll-scrubbed parallax — element moves slower/faster than scroll.
 */
export function useParallax(ref, { yPercent = -20, ease = 'none' } = {}) {
  useEffect(() => {
    if (!ref.current || prefersReducedMotion()) return;
    const tween = gsap.to(ref.current, {
      yPercent,
      ease,
      scrollTrigger: {
        trigger: ref.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [yPercent]);
}

/**
 * Hero scroll timeline: moves headline upward and fades out gently as user scrolls into the next section.
 */
export function useHeroScroll(heroSectionRef, heroContentRef) {
  useEffect(() => {
    if (!heroSectionRef.current || !heroContentRef.current || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.to(heroContentRef.current, {
        y: -100,
        opacity: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: heroSectionRef.current,
          start: 'top top',
          end: 'bottom 40%',
          scrub: 0.3,
        },
      });
    }, heroSectionRef);

    return () => ctx.revert();
  }, [heroSectionRef, heroContentRef]);
}

/**
 * Coordinated split-screen hero scroll:
 * Central 3D globe zooms in while left hero column slides left+up and right HUD column slides right+up.
 */
export function useHeroSplitScroll(heroSectionRef, leftColRef, rightColRef) {
  useEffect(() => {
    if (!heroSectionRef.current || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      if (leftColRef?.current) {
        gsap.to(leftColRef.current, {
          x: -60,
          y: -90,
          opacity: 0.12,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: heroSectionRef.current,
            start: 'top top',
            end: 'bottom 35%',
            scrub: 0.3,
          },
        });
      }

      if (rightColRef?.current) {
        gsap.to(rightColRef.current, {
          x: 60,
          y: -90,
          opacity: 0.12,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: heroSectionRef.current,
            start: 'top top',
            end: 'bottom 35%',
            scrub: 0.3,
          },
        });
      }
    }, heroSectionRef);

    return () => ctx.revert();
  }, [heroSectionRef, leftColRef, rightColRef]);
}

/**
 * Scroll-triggered Zoom-In animation with staggered reveal.
 * Used for cards, badges, and domain items across sections.
 */
export function useZoomOnScroll(
  containerRef,
  childSelector = '*',
  {
    fromScale = 0.9,
    toScale = 1.0,
    y = 35,
    opacity = 0,
    duration = 0.75,
    stagger = 0.08,
    ease = 'power2.out',
    start = 'top 85%',
  } = {},
  deps = []
) {
  useEffect(() => {
    if (!containerRef.current || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray(childSelector, containerRef.current);
      if (!items.length) return;

      gsap.fromTo(
        items,
        { scale: fromScale, y, opacity },
        {
          scale: toScale,
          y: 0,
          opacity: 1,
          duration,
          stagger,
          ease,
          scrollTrigger: {
            trigger: containerRef.current,
            start,
            once: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/**
 * Continuous Section Zoom Scrub:
 * Gently zooms in or zooms out a container as it travels through the viewport.
 */
export function useSectionZoomScrub(
  elementRef,
  {
    fromScale = 0.94,
    toScale = 1.03,
    start = 'top bottom',
    end = 'bottom top',
    scrub = 1.2,
    ease = 'none',
  } = {}
) {
  useEffect(() => {
    if (!elementRef.current || prefersReducedMotion()) return;

    const tween = gsap.fromTo(
      elementRef.current,
      { scale: fromScale },
      {
        scale: toScale,
        ease,
        scrollTrigger: {
          trigger: elementRef.current,
          start,
          end,
          scrub,
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromScale, toScale, start, end, scrub, ease]);
}

/**
 * Curtain reveal: an absolutely-positioned dark panel scales down / lifts up like a theater curtain.
 */
export function useCurtainReveal(curtainRef, contentRef, opts = {}) {
  const { duration = 1.0, ease = 'power4.inOut', start = 'top 80%' } = opts;
  useEffect(() => {
    if (!curtainRef.current || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: curtainRef.current,
          start,
          once: true,
        },
      });
      tl.to(curtainRef.current, {
        scaleY: 0,
        transformOrigin: 'top center',
        duration,
        ease,
      });
      if (contentRef?.current) {
        tl.fromTo(
          contentRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
          '-=0.4'
        );
      }
    });
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

/**
 * Pinned horizontal scroll track for course cards.
 * Pins the section while translating the cards track horizontally.
 * On mobile (<768px), falls back cleanly to natural vertical scrolling.
 */
export function usePinnedHorizontal(sectionRef, trackRef, deps = []) {
  useEffect(() => {
    if (!sectionRef.current || !trackRef.current || prefersReducedMotion()) return;
    if (window.innerWidth < 768) return;

    let ctx;
    const timer = setTimeout(() => {
      ctx = gsap.context(() => {
        const totalWidth = trackRef.current.scrollWidth - sectionRef.current.offsetWidth + 120;
        if (totalWidth <= 0) return;

        gsap.to(trackRef.current, {
          x: -totalWidth,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            pin: true,
            scrub: 1.2,
            end: () => `+=${totalWidth}`,
            invalidateOnRefresh: true,
          },
        });
      }, sectionRef);
    }, 100);

    return () => {
      clearTimeout(timer);
      ctx?.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/**
 * Terminal panel entrance: scales and slides in with glowing cyber scanline effect.
 */
export function useTerminalEntrance(terminalContainerRef) {
  useEffect(() => {
    if (!terminalContainerRef.current || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        terminalContainerRef.current,
        {
          opacity: 0,
          scale: 0.95,
          y: 40,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: terminalContainerRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      );
    }, terminalContainerRef);

    return () => ctx.revert();
  }, [terminalContainerRef]);
}

export { gsap, ScrollTrigger };

