import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Scissors, Sparkles, Hand, Smile, PersonStanding, Sun } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: 1,
    title: 'Hair Services',
    description: 'Professional cuts, styling, coloring, and treatments for all hair types.',
    image: '/service-hair.jpg',
    icon: Scissors,
    link: '/services#hair'
  },
  {
    id: 2,
    title: 'Rituals & Therapies',
    description: 'Luxurious hair and scalp treatments for ultimate relaxation and rejuvenation.',
    image: '/service-rituals.jpg',
    icon: Sparkles,
    link: '/services#rituals'
  },
  {
    id: 3,
    title: 'Manicure & Pedicure',
    description: 'Expert nail care with premium products and the latest techniques.',
    image: '/service-manicure.jpg',
    icon: Hand,
    link: '/services#nails'
  },
  {
    id: 4,
    title: 'Face Procedures',
    description: 'Advanced facials and skin treatments for a radiant, youthful glow.',
    image: '/service-facial.jpg',
    icon: Smile,
    link: '/services#face'
  },
  {
    id: 5,
    title: 'Body Procedures',
    description: 'Relaxing massages and body treatments for total wellness.',
    image: '/service-body.jpg',
    icon: PersonStanding,
    link: '/services#body'
  },
  {
    id: 6,
    title: 'Laser Epilation',
    description: 'Safe and effective permanent hair removal with state-of-the-art technology.',
    image: '/service-laser.jpg',
    icon: Sun,
    link: '/services#laser'
  }
];

const ServicesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section title animation
      gsap.fromTo('.services-title',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );

      // Service cards staggered animation
      gsap.fromTo('.service-card',
        { opacity: 0, y: 80, rotateY: -15 },
        {
          opacity: 1,
          y: 0,
          rotateY: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.services-grid',
            start: 'top 75%',
            toggleActions: 'play none none none'
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 lg:py-32 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 0, transparent 50%)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          <span className="services-title inline-block text-sm font-medium tracking-[0.3em] text-black/50 uppercase mb-4">
            What We Offer
          </span>
          <h2 className="services-title text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-6">
            Our Services
          </h2>
          <p className="services-title text-black/60 max-w-2xl mx-auto text-lg">
            Experience luxury and professionalism with our comprehensive range of beauty services.
          </p>
        </div>

        {/* Services Grid */}
        <div className="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <Link
              key={service.id}
              to={service.link}
              className={`service-card group relative bg-white rounded-none overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 ${
                index % 3 === 1 ? 'lg:-translate-y-6' : ''
              }`}
              style={{ perspective: '1000px' }}
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Icon Badge */}
                <div className="absolute top-4 left-4 w-12 h-12 bg-white flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
                  <service.icon className="w-6 h-6 text-black" />
                </div>

                {/* Arrow */}
                <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                  <ArrowUpRight className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-black mb-2 group-hover:tracking-wide transition-all duration-300">
                  {service.title}
                </h3>
                <p className="text-black/60 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Hover Border Effect */}
              <div className="absolute inset-0 border-2 border-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12 lg:mt-16">
          <Link
            to="/services"
            className="inline-flex items-center gap-3 px-8 py-4 bg-black text-white font-semibold tracking-wider transition-all duration-300 hover:bg-black/90 hover:shadow-xl group"
          >
            VIEW ALL SERVICES
            <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;