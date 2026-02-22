import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background image parallax
      gsap.fromTo('.hero-bg-image',
        { scale: 1.1 },
        { scale: 1, duration: 2, ease: 'power2.out' }
      );

      // Content animations
      const tl = gsap.timeline({ delay: 0.3 });
      
      tl.fromTo('.hero-headline-line',
        { opacity: 0, y: 80, rotateX: -30 },
        { opacity: 1, y: 0, rotateX: 0, duration: 1, stagger: 0.2, ease: 'power3.out' }
      )
      .fromTo('.hero-subheadline',
        { opacity: 0, y: 40, filter: 'blur(10px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, ease: 'power2.out' },
        '-=0.4'
      )
      .fromTo('.hero-cta',
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' },
        '-=0.3'
      );

      // Floating particles animation
      gsap.utils.toArray<HTMLElement>('.floating-particle').forEach((particle, i) => {
        gsap.to(particle, {
          y: `random(-30, 30)`,
          x: `random(-20, 20)`,
          rotation: `random(-15, 15)`,
          duration: `random(3, 6)`,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.2
        });
      });

      // Scroll parallax for hero content
      gsap.to('.hero-content', {
        yPercent: -30,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        }
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero-bg.jpg"
          alt="MurphyStyle Salon"
          className="hero-bg-image w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
      </div>

      {/* Floating Particles */}
      <div ref={particlesRef} className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="floating-particle absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
            <Sparkles
              className="text-white/20"
              style={{
                width: `${Math.random() * 20 + 10}px`,
                height: `${Math.random() * 20 + 10}px`,
              }}
            />
          </div>
        ))}
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 w-32 h-32 border border-white/10 rounded-full animate-pulse hidden lg:block" />
      <div className="absolute bottom-40 left-10 w-20 h-20 border border-white/10 hidden lg:block" />
      <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-white/40 rounded-full hidden lg:block" />

      {/* Main Content */}
      <div
        ref={contentRef}
        className="hero-content relative z-20 w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-32"
      >
        <div className="max-w-4xl">
          {/* Headline */}
          <div className="mb-8" style={{ perspective: '1000px' }}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              <span className="hero-headline-line block overflow-hidden">
                <span className="inline-block">Murphy – a place</span>
              </span>
              <span className="hero-headline-line block overflow-hidden">
                <span className="inline-block">that begins with you</span>
              </span>
            </h1>
          </div>

          {/* Subheadline */}
          <p className="hero-subheadline text-lg sm:text-xl md:text-2xl text-white/80 max-w-2xl mb-10 leading-relaxed">
            Your time is valuable. We make sure it's spent in the best possible way.
          </p>

          {/* CTA Buttons */}
          <div className="hero-cta flex flex-col sm:flex-row gap-4">
            <Link
              to="/contact"
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-black font-semibold tracking-wider transition-all duration-300 hover:bg-black hover:text-white hover:shadow-2xl"
            >
              BOOK APPOINTMENT
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 border-2 border-white/50 text-white font-semibold tracking-wider transition-all duration-300 hover:bg-white/10 hover:border-white"
            >
              OUR SERVICES
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-30" />
    </section>
  );
};

export default HeroSection;
