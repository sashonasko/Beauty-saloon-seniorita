import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Users, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { icon: Award, value: '15+', label: 'Years Experience' },
  { icon: Users, value: '50K+', label: 'Happy Clients' },
  { icon: Heart, value: '100%', label: 'Satisfaction' },
];

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image reveal animation
      gsap.fromTo('.about-image-container',
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 1.2,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none'
          }
        }
      );

      // Content box animation
      gsap.fromTo('.about-content-box',
        { opacity: 0, x: 80 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none none'
          }
        }
      );

      // Text lines animation
      gsap.fromTo('.about-text-line',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.about-content-box',
            start: 'top 70%',
            toggleActions: 'play none none none'
          }
        }
      );

      // Stats animation
      gsap.fromTo('.stat-item',
        { opacity: 0, y: 40, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: '.stats-container',
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );

      // Parallax effect on image
      gsap.to('.about-image', {
        yPercent: -15,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 lg:py-32 bg-white relative overflow-hidden">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0 items-center">
          {/* Image Side */}
          <div className="about-image-container relative overflow-hidden">
            <div className="relative aspect-[4/5] lg:aspect-[3/4]">
              <img
                src="/about-image.jpg"
                alt="MurphyStyle Team"
                className="about-image w-full h-full object-cover"
              />
              {/* Decorative Frame */}
              <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-black/10 -z-10" />
            </div>
          </div>

          {/* Content Side */}
          <div className="about-content-box lg:-ml-20 relative z-10 bg-white p-8 lg:p-12 shadow-2xl">
            <span className="about-text-line inline-block text-sm font-medium tracking-[0.3em] text-black/50 uppercase mb-4">
              About Us
            </span>
            
            <h2 className="about-text-line text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-6 leading-tight">
              Where Beauty Meets
              <span className="block text-black/70">Personal Attention</span>
            </h2>

            <div className="space-y-4 mb-8">
              <p className="about-text-line text-black/70 leading-relaxed">
                Our team brings together proven professionals – hairdressers, medical cosmetologists, 
                and manicurists who work with feeling, knowledge, and a constant striving for perfection.
              </p>
              <p className="about-text-line text-black/70 leading-relaxed">
                Murphy is a symbiosis of style, atmosphere, and personal approach! Every visit is 
                designed to be an experience that leaves you feeling refreshed, confident, and beautiful.
              </p>
            </div>

            {/* Highlight Text */}
            <div className="about-text-line relative pl-6 border-l-2 border-black mb-8">
              <p className="text-xl font-medium text-black italic">
                "We don't just transform appearances – we boost confidence and celebrate individuality."
              </p>
            </div>

            {/* CTA Button */}
            <Link
              to="/about"
              className="about-text-line inline-flex items-center gap-3 px-8 py-4 bg-black text-white font-semibold tracking-wider transition-all duration-300 hover:bg-black/90 hover:shadow-xl group"
            >
              MORE ABOUT US
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Stats Section */}
        <div className="stats-container grid grid-cols-3 gap-6 lg:gap-12 mt-16 lg:mt-24 pt-12 border-t border-black/10">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 mb-4 bg-black/5">
                <stat.icon className="w-6 h-6 text-black" />
              </div>
              <div className="text-3xl lg:text-5xl font-bold text-black mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-black/60 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
