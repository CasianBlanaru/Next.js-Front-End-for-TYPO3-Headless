import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function GsapAnimatedContent({ children, animationSettings }) {
  const elementRef = useRef(null);

  useEffect(() => {
    if (!animationSettings?.animation || typeof window === 'undefined') {
      return;
    }

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
      mirror = false,
    } = animationSettings;

    const animationConfig = {
      duration: duration / 1000,
      delay: delay / 1000,
      ease: easing,
      scrollTrigger: {
        trigger: element,
        start: anchorPlacement,
        toggleActions: once ? 'play none none none' : 'play none none reverse',
        markers: process.env.NEXT_PUBLIC_HEADLESS_DEVTOOLS === 'true',
      },
    };

    let anim;
    switch (animation) {
      case 'fade':
        gsap.from(element, { ...animationConfig, opacity: 0 });
        break;
      case 'fade-up':
        gsap.from(element, { ...animationConfig, opacity: 0, y: offset || 50 });
        break;
      case 'fade-down':
        gsap.from(element, { ...animationConfig, opacity: 0, y: -(offset || 50) });
        break;
      case 'fade-left':
        gsap.from(element, { ...animationConfig, opacity: 0, x: offset || 50 });
        break;
      case 'fade-right':
        gsap.from(element, { ...animationConfig, opacity: 0, x: -(offset || 50) });
        break;
      case 'zoom-in':
        gsap.from(element, { ...animationConfig, opacity: 0, scale: 0.8 });
        break;
      case 'zoom-out':
        gsap.from(element, { ...animationConfig, opacity: 0, scale: 1.2 });
        break;
      case 'flip-left':
        gsap.from(element, { ...animationConfig, opacity: 0, rotationY: -90 });
        break;
      case 'flip-right':
        gsap.from(element, { ...animationConfig, opacity: 0, rotationY: 90 });
        break;
      case 'flip-up':
        gsap.from(element, { ...animationConfig, opacity: 0, rotationX: 90 });
        break;
      case 'flip-down':
        gsap.from(element, { ...animationConfig, opacity: 0, rotationX: -90 });
        break;
      case 'slide-up':
        gsap.from(element, { ...animationConfig, y: offset || 100 });
        break;
      case 'slide-down':
        gsap.from(element, { ...animationConfig, y: -(offset || 100) });
        break;
      case 'slide-left':
        gsap.from(element, { ...animationConfig, x: offset || 100 });
        break;
      case 'slide-right':
        gsap.from(element, { ...animationConfig, x: -(offset || 100) });
        break;
    }

    return () => {
      if (anim) anim.kill();
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, [animationSettings]);

  return <div ref={elementRef}>{children}</div>;
}
