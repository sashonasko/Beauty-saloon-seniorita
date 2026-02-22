import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Scissors, Sparkles, Hand, Smile, PersonStanding, Sun } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const serviceCategories = [
  {
    id: 'hair',
    title: 'Hair Services',
    description: 'From precision cuts to stunning color transformations, our expert stylists deliver exceptional results tailored to your unique style.',
    image: '/service-hair.jpg',
    icon: Scissors,
    features: [
      'Haircuts & Styling',
      'Hair Coloring & Highlights',
      'Balayage & Ombre',
      'Hair Treatments',
      'Keratin Smoothing',
      'Bridal Hair Styling'
    ],
    priceRange: 'from 50 BGN'
  },
  {
    id: 'rituals',
    title: 'Rituals & Therapies',
    description: 'Indulge in our luxurious hair and scalp treatments designed to nourish, repair, and rejuvenate your hair from root to tip.',
    image: '/service-rituals.jpg',
    icon: Sparkles,
    features: [
      'Scalp Treatments',
      'Deep Conditioning',
      'Hair Spa Rituals',
      'Olaplex Treatments',
      'Steam Therapy',
      'Aromatherapy Massage'
    ],
    priceRange: 'from 80 BGN'
  },
  {
    id: 'nails',
    title: 'Manicure & Pedicure',
    description: 'Experience the art of nail care with our premium manicure and pedicure services using the finest products and techniques.',
    image: '/service-manicure.jpg',
    icon: Hand,
    features: [
      'Classic Manicure & Pedicure',
      'Gel Polish',
      'Nail Art & Design',
      'Spa Pedicure',
      'Nail Extensions',
      'Paraffin Treatment'
    ],
    priceRange: 'from 40 BGN'
  },
  {
    id: 'face',
    title: 'Face Procedures',
    description: 'Reveal your natural radiance with our advanced facial treatments and skin care services performed by certified professionals.',
    image: '/service-facial.jpg',
    icon: Smile,
    features: [
      'Deep Cleansing Facials',
      'Anti-Aging Treatments',
      'Hydrating Facials',
      'Chemical Peels',
      'Microdermabrasion',
      'LED Light Therapy'
    ],
    priceRange: 'from 100 BGN'
  },
  {
    id: 'body',
    title: 'Body Procedures',
    description: 'Relax and rejuvenate with our therapeutic body treatments designed to soothe muscles, detoxify, and restore balance.',
    image: '/service-body.jpg',
    icon: PersonStanding,
    features: [
      'Swedish Massage',
      'Deep Tissue Massage',
      'Hot Stone Therapy',
      'Body Wraps',
      'Exfoliation Treatments',
      'Aromatherapy'
    ],
    priceRange: 'from 90 BGN'
  },
  {
    id: 'laser',
    title: 'Laser Epilation',
    description: 'Achieve smooth, hair-free skin with our state-of-the-art laser hair removal treatments performed by trained specialists.',
    image: '/service-laser.jpg',
    icon: Sun,
    features: [
      'Full Body Laser',
      'Facial Hair Removal',
      'Underarm Treatment',
      'Leg & Arm Laser',
      'Bikini Line',
      'Consultation & Assessment'
    ],
    priceRange: 'from 60 BGN'
  }
];

const Services = () => {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.fromTo('.services-hero-content',
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out'
        }
      );

      // Service cards animation
      serviceCategories.forEach((_, index) => {
        gsap.fromTo(`.service-detail-${index}`,
          { opacity: 0, y: 80 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: `.service-detail-${index}`,
              start: 'top 75%',
              toggleActions: 'play none none none'
            }
          }
        );
      });

    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-black overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(90deg, #fff 0, #fff 1px, transparent 0, transparent 100px)`,
          }} />
        </div>
        
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 relative z-10">
          <div className="services-hero-content max-w-4xl">
            <span className="inline-block text-sm font-medium tracking-[0.3em] text-white/50 uppercase mb-4">
              Our Services
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Premium Beauty
              <span className="block text-white/70">Services</span>
            </h1>
            <p className="text-white/60 text-lg lg:text-xl max-w-2xl leading-relaxed">
              Discover our comprehensive range of beauty services designed to enhance your natural beauty 
              and provide an unforgettable salon experience.
            </p>
          </div>
        </div>
      </section>

      {/* Services Detail Section */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="space-y-24 lg:space-y-32">
            {serviceCategories.map((service, index) => (
              <div
                key={service.id}
                id={service.id}
                className={`service-detail-${index} grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Image */}
                <div className={`relative ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  </div>
                  {/* Icon Badge */}
                  <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-black flex items-center justify-center shadow-xl">
                    <service.icon className="w-10 h-10 text-white" />
                  </div>
                  {/* Decorative Frame */}
                  <div className={`absolute -top-4 ${index % 2 === 1 ? '-left-4' : '-right-4'} w-full h-full border-2 border-black/10 -z-10`} />
                </div>

                {/* Content */}
                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <h2 className="text-3xl lg:text-4xl font-bold text-black mb-4">
                    {service.title}
                  </h2>
                  <p className="text-black/60 text-lg mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features List */}
                  <div className="grid grid-cols-2 gap-3 mb-8">
                    {service.features.map((feature, fIndex) => (
                      <div key={fIndex} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-black flex-shrink-0" />
                        <span className="text-sm text-black/70">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Price & CTA */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="px-6 py-3 bg-neutral-100">
                      <span className="text-sm text-black/50">Starting from</span>
                      <p className="text-xl font-bold text-black">{service.priceRange}</p>
                    </div>
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-3 px-8 py-4 bg-black text-white font-semibold tracking-wider transition-all duration-300 hover:bg-black/90 hover:shadow-xl group"
                    >
                      BOOK NOW
                      <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-neutral-50">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-black mb-4">
              Not Sure What You Need?
            </h2>
            <p className="text-black/60 text-lg mb-8">
              Our experts are here to help. Schedule a free consultation and let us recommend 
              the perfect treatments for your needs.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-black text-white font-semibold tracking-wider transition-all duration-300 hover:bg-black/90 hover:shadow-xl group"
            >
              FREE CONSULTATION
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
