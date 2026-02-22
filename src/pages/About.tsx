import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Heart, Sparkles, Users, Target, Lightbulb } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    icon: Heart,
    title: 'Passion',
    description: 'We love what we do and it shows in every service we provide.'
  },
  {
    icon: Target,
    title: 'Excellence',
    description: 'We strive for perfection in every cut, color, and treatment.'
  },
  {
    icon: Users,
    title: 'Personal Touch',
    description: 'Every client receives individualized attention and care.'
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'We stay ahead with the latest techniques and trends.'
  }
];

const team = [
  {
    name: 'Blaga Murphy',
    role: 'Founder & Creative Director',
    image: '/gallery-2.jpg',
    description: 'With over 20 years of experience, Blaga leads our team with vision and passion.'
  },
  {
    name: 'Maria Santos',
    role: 'Senior Stylist',
    image: '/gallery-5.jpg',
    description: 'Specializing in color transformations and bridal styling.'
  },
  {
    name: 'Elena Petrova',
    role: 'Beauty Therapist',
    image: '/gallery-7.jpg',
    description: 'Expert in facial treatments and skin rejuvenation.'
  },
  {
    name: 'Anna Kowalski',
    role: 'Nail Artist',
    image: '/gallery-4.jpg',
    description: 'Creating stunning nail art with precision and creativity.'
  }
];

const About = () => {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.fromTo('.about-hero-content',
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out'
        }
      );

      // Story section animation
      gsap.fromTo('.story-content',
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.story-section',
            start: 'top 70%',
            toggleActions: 'play none none none'
          }
        }
      );

      // Values animation
      gsap.fromTo('.value-card',
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.values-grid',
            start: 'top 75%',
            toggleActions: 'play none none none'
          }
        }
      );

      // Team animation
      gsap.fromTo('.team-card',
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.team-grid',
            start: 'top 75%',
            toggleActions: 'play none none none'
          }
        }
      );

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
            backgroundImage: `radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>
        
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 relative z-10">
          <div className="about-hero-content max-w-4xl">
            <span className="inline-block text-sm font-medium tracking-[0.3em] text-white/50 uppercase mb-4">
              About Us
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Our Story of
              <span className="block text-white/70">Beauty & Passion</span>
            </h1>
            <p className="text-white/60 text-lg lg:text-xl max-w-2xl leading-relaxed">
              For over 15 years, MurphyStyle has been Sofia's premier destination for luxury beauty services. 
              Our journey began with a simple vision: to create a space where beauty meets personal attention.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="story-section py-20 lg:py-32 bg-white">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image */}
            <div className="relative">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="/gallery-1.jpg"
                  alt="MurphyStyle Salon Interior"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-black flex items-center justify-center">
                <div className="text-center text-white">
                  <p className="text-4xl font-bold">15+</p>
                  <p className="text-sm tracking-wider">YEARS</p>
                </div>
              </div>
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-black/10 -z-10" />
            </div>

            {/* Content */}
            <div className="story-content">
              <h2 className="text-3xl lg:text-4xl font-bold text-black mb-6">
                A Legacy of Excellence
              </h2>
              <div className="space-y-4 text-black/70 leading-relaxed">
                <p>
                  Founded in 2009 by Blaga Murphy, our salon started as a small studio with a big dream. 
                  Today, we are proud to be one of Sofia's most respected beauty destinations, with two 
                  locations serving thousands of satisfied clients.
                </p>
                <p>
                  Our team of over 30 professionals includes award-winning stylists, certified cosmetologists, 
                  and skilled nail artists who share a common goal: to make every client feel beautiful and confident.
                </p>
                <p>
                  We believe that true beauty comes from within, and our role is to enhance your natural features 
                  while providing a relaxing, rejuvenating experience that leaves you feeling refreshed and renewed.
                </p>
              </div>

              <div className="mt-8 flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Award className="w-6 h-6 text-black" />
                  <span className="text-sm font-medium">Award Winning</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-black" />
                  <span className="text-sm font-medium">Premium Service</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 lg:py-32 bg-neutral-50">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="inline-block text-sm font-medium tracking-[0.3em] text-black/50 uppercase mb-4">
              Our Values
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-black">
              What We Stand For
            </h2>
          </div>

          {/* Values Grid */}
          <div className="values-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="value-card bg-white p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-14 h-14 bg-black flex items-center justify-center mb-6">
                  <value.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-black mb-3">{value.title}</h3>
                <p className="text-black/60 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="inline-block text-sm font-medium tracking-[0.3em] text-black/50 uppercase mb-4">
              Our Team
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-black mb-4">
              Meet the Experts
            </h2>
            <p className="text-black/60 max-w-2xl mx-auto">
              Our talented team of professionals is dedicated to making you look and feel your best.
            </p>
          </div>

          {/* Team Grid */}
          <div className="team-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="team-card group"
              >
                {/* Image */}
                <div className="relative aspect-[3/4] overflow-hidden mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                {/* Info */}
                <h3 className="text-lg font-bold text-black">{member.name}</h3>
                <p className="text-sm text-black/50 mb-2">{member.role}</p>
                <p className="text-sm text-black/60 leading-relaxed">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-black">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Experience the MurphyStyle Difference
            </h2>
            <p className="text-white/60 text-lg mb-8">
              Book your appointment today and discover why we are Sofia's premier beauty destination.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-semibold tracking-wider transition-all duration-300 hover:bg-white/90 hover:shadow-xl group"
            >
              BOOK APPOINTMENT
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
