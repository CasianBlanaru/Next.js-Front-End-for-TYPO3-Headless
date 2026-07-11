"use client";

import React, { useEffect, useRef } from 'react';

interface AnimationSettings {
  animation: string;
  duration?: number;
  delay?: number;
  easing?: string;
  offset?: number;
  anchorPlacement?: string;
  once?: boolean;
}

interface GsapAnimatedContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  animationSettings: AnimationSettings;
}

export function GsapAnimatedContent({ children, animationSettings, ...props }: GsapAnimatedContentProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!animationSettings?.animation || typeof window === 'undefined') {
      return;
    }

    let cleanup = () => {};

    const loadAndAnimate = async () => {
      try {
        const gsapModule = await import('gsap');
        const scrollTriggerModule = await import('gsap/ScrollTrigger');
        
        const gsap = (gsapModule as any).default || gsapModule;
        const ScrollTrigger = (scrollTriggerModule as any).default || scrollTriggerModule;

        gsap.registerPlugin(ScrollTrigger);

        const element = elementRef.current;
        if (!element) return;

        const {
          animation,
          duration = 1,
          delay = 0,
          easing = 'power2.out',
          offset = 0,
          anchorPlacement = 'top-bottom',
          once = true,
        } = animationSettings;

        const animationConfig = {
          duration: duration / 1000,
          delay: delay / 1000,
          ease: easing,
          scrollTrigger: {
            trigger: element,
            start: anchorPlacement,
            toggleActions: once ? 'play none none none' : 'play none none reverse',
            markers: false,
          },
        };

        let anim: any;
        switch (animation) {
          case 'fade':
            anim = gsap.from(element, { ...animationConfig, opacity: 0 });
            break;
          case 'fade-up':
            anim = gsap.from(element, { ...animationConfig, opacity: 0, y: offset || 50 });
            break;
          case 'fade-down':
            anim = gsap.from(element, { ...animationConfig, opacity: 0, y: -(offset || 50) });
            break;
          case 'fade-left':
            anim = gsap.from(element, { ...animationConfig, opacity: 0, x: offset || 50 });
            break;
          case 'fade-right':
            anim = gsap.from(element, { ...animationConfig, opacity: 0, x: -(offset || 50) });
            break;
          case 'zoom-in':
            anim = gsap.from(element, { ...animationConfig, opacity: 0, scale: 0.8 });
            break;
          case 'zoom-out':
            anim = gsap.from(element, { ...animationConfig, opacity: 0, scale: 1.2 });
            break;
          case 'flip-left':
            anim = gsap.from(element, { ...animationConfig, opacity: 0, rotationY: -90 });
            break;
          case 'flip-right':
            anim = gsap.from(element, { ...animationConfig, opacity: 0, rotationY: 90 });
            break;
          case 'flip-up':
            anim = gsap.from(element, { ...animationConfig, opacity: 0, rotationX: 90 });
            break;
          case 'flip-down':
            anim = gsap.from(element, { ...animationConfig, opacity: 0, rotationX: -90 });
            break;
          case 'slide-up':
            anim = gsap.from(element, { ...animationConfig, y: offset || 100 });
            break;
          case 'slide-down':
            anim = gsap.from(element, { ...animationConfig, y: -(offset || 100) });
            break;
          case 'slide-left':
            anim = gsap.from(element, { ...animationConfig, x: offset || 100 });
            break;
          case 'slide-right':
            anim = gsap.from(element, { ...animationConfig, x: -(offset || 100) });
            break;
        }

        cleanup = () => {
          if (anim) anim.kill();
          ScrollTrigger.getAll().forEach((st: any) => st.kill());
        };
      } catch (error) {
        console.warn('GSAP animation failed to load:', error);
      }
    };

    loadAndAnimate();

    return () => cleanup();
  }, [animationSettings]);

  return <div ref={elementRef} {...props}>{children}</div>;
}
