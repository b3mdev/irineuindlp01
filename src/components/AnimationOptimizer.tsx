import React, { useEffect, useRef, useState } from 'react';

// Performance monitoring utility
export const useAnimationPerformance = () => {
  const [metrics, setMetrics] = useState({
    fps: 0,
    frameTime: 0,
    animationCount: 0
  });

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animationId: number;

    const measurePerformance = (currentTime: number) => {
      frameCount++;
      const deltaTime = currentTime - lastTime;
      
      if (deltaTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / deltaTime);
        const frameTime = deltaTime / frameCount;
        
        setMetrics(prev => ({
          ...prev,
          fps,
          frameTime: Math.round(frameTime * 100) / 100
        }));
        
        frameCount = 0;
        lastTime = currentTime;
      }
      
      animationId = requestAnimationFrame(measurePerformance);
    };

    animationId = requestAnimationFrame(measurePerformance);
    
    return () => cancelAnimationFrame(animationId);
  }, []);

  return metrics;
};

// Optimized intersection observer hook
export const useOptimizedIntersection = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true);
          setHasAnimated(true);
          observer.unobserve(element);
        }
      },
      { 
        threshold,
        rootMargin: '50px 0px'
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, hasAnimated]);

  return { elementRef, isVisible, hasAnimated };
};

// Reduced motion detection
export const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
};