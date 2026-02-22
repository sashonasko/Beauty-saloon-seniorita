import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, Calendar, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const CTASection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background gradient animation
      gsap.to('.cta-bg-gradient', {
        backgroundPosition: '200% 50%',
        duration: 15,
        repeat: -1,
        ease: 'none'
      });

      // Card animation
      gsap.fromTo('.cta-card',
        { opacity: 0, y: 80, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );

      // Text animation
      gsap.fromTo('.cta-text',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.cta-card',
            start: 'top 70%',
            toggleActions: 'play none none none'
          }
        }
      );

      // Info items animation
      gsap.fromTo('.cta-info-item',
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.cta-info',
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 lg:py-32 relative overflow-hidden">
      {/* Animated Background */}
      <div 
        className="cta-bg-gradient absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 25%, #f5f5f5 50%, #e8e8e8 75%, #f5f5f5 100%)',
          backgroundSize: '400% 400%'
        }}
      />
      
      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-40 h-40 border border-black/5 rounded-full" />
      <div className="absolute bottom-10 right-10 w-60 h-60 border border-black/5 rounded-full" />
      <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-black/10 rounded-full" />
      <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-black/10 rounded-full" />

      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 relative z-10">
        <div className="cta-card max-w-5xl mx-auto bg-white p-8 lg:p-16 shadow-2xl relative">
          {/* Decorative Corner */}
          <div className="absolute -top-4 -left-4 w-full h-full border-2 border-black/10 -z-10" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left Content */}
            <div>
              <span className="cta-text inline-block text-sm font-medium tracking-[0.3em] text-black/50 uppercase mb-4">
                Book Your Visit
              </span>
              <h2 className="cta-text text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-6 leading-tight">
                Ready to
                <span className="block text-black/70">Transform?</span>
              </h2>
              <p className="cta-text text-black/60 text-lg mb-8 leading-relaxed">
                Book your appointment today and experience the MurphyStyle difference. 
                Our team is ready to help you look and feel your best.
              </p>
              
              <Link
                to="/contact"
                className="cta-text inline-flex items-center gap-3 px-8 py-4 bg-black text-white font-semibold tracking-wider transition-all duration-300 hover:bg-black/90 hover:shadow-xl group"
              >
                BOOK APPOINTMENT
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Right Content - Contact Info */}
            <div className="cta-info space-y-6">
              <div className="cta-info-item flex items-start gap-4 p-4 bg-neutral-50">
                <div className="w-12 h-12 bg-black flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-black mb-1">Call Us</p>
                  <a href="tel:+359887427192" className="text-black/60 hover:text-black transition-colors">
                    +359 887 427 192
                  </a>
                </div>
              </div>

              <div className="cta-info-item flex items-start gap-4 p-4 bg-neutral-50">
                <div className="w-12 h-12 bg-black flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-black mb-1">Working Hours</p>
                  <p className="text-black/60">Mon - Fri: 9:00 - 20:00</p>
                  <p className="text-black/60">Sat: 10:00 - 18:00</p>
                </div>
              </div>

              <div className="cta-info-item flex items-start gap-4 p-4 bg-neutral-50">
                <div className="w-12 h-12 bg-black flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-black mb-1">Our Locations</p>
                  <p className="text-black/60">Graf Ignatiev 3, Sofia</p>
                  <p className="text-black/60">Patriarch Evtimiy 57, Sofia</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
