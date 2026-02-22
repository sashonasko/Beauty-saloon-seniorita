import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroSection from '../sections/HeroSection';
import ServicesSection from '../sections/ServicesSection';
import AboutSection from '../sections/AboutSection';
import TestimonialsSection from '../sections/TestimonialsSection';
import GalleryPreview from '../sections/GalleryPreview';
import CTASection from '../sections/CTASection';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax effect for decorative elements
      gsap.to('.parallax-bg', {
        yPercent: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: pageRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        }
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="overflow-hidden">
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <TestimonialsSection />
      <GalleryPreview />
      <CTASection />
    </div>
  );
};

export default Home;
