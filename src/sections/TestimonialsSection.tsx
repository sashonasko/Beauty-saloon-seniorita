import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    id: 1,
    name: 'Nikolaya Dimitrova',
    text: 'Very pleasant atmosphere. The result is unique and I will definitely visit again. The staff made me feel welcome from the moment I walked in.',
    rating: 5
  },
  {
    id: 2,
    name: 'Milena Tsvetanova',
    text: 'Exceptional professionals and creators. I have never encountered such careful attention elsewhere – kind, good, and always dedicated to their craft.',
    rating: 5
  },
  {
    id: 3,
    name: 'Elena Petrova',
    text: 'I am very happy and satisfied with our work together. More than half a year together and we will continue forward. Highly recommend!',
    rating: 5
  },
  {
    id: 4,
    name: 'Maria Ivanova',
    text: 'The best salon experience I have ever had. From the warm welcome to the perfect result – everything was top notch. My go-to place for beauty treatments.',
    rating: 5
  }
];

const TestimonialsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo('.testimonials-title',
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

      // Quote icon animation
      gsap.fromTo('.quote-icon',
        { opacity: 0, scale: 0, rotation: -20 },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.6,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none'
          }
        }
      );

      // Testimonial card animation
      gsap.fromTo('.testimonial-card',
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none none'
          }
        }
      );

      // Navigation dots animation
      gsap.fromTo('.nav-dot',
        { opacity: 0, scale: 0 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          stagger: 0.08,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 50%',
            toggleActions: 'play none none none'
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Auto-advance testimonials
  useEffect(() => {
    const interval = setInterval(nextTestimonial, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="py-20 lg:py-32 bg-neutral-50 relative overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-64 h-64 bg-black/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-black/5 rounded-full blur-3xl" />
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="testimonials-title inline-block text-sm font-medium tracking-[0.3em] text-black/50 uppercase mb-4">
            Testimonials
          </span>
          <h2 className="testimonials-title text-3xl sm:text-4xl lg:text-5xl font-bold text-black">
            What Our Clients Say
          </h2>
        </div>

        {/* Testimonial Card */}
        <div className="max-w-4xl mx-auto">
          <div className="testimonial-card relative bg-white p-8 lg:p-12 shadow-xl">
            {/* Quote Icon */}
            <div className="quote-icon absolute -top-6 left-8 w-12 h-12 bg-black flex items-center justify-center">
              <Quote className="w-6 h-6 text-white" />
            </div>

            {/* Content */}
            <div className="pt-4">
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-black text-black" />
                ))}
              </div>

              {/* Text */}
              <p 
                key={currentIndex}
                className="text-xl lg:text-2xl text-black/80 leading-relaxed mb-8 italic"
                style={{
                  animation: 'fadeInUp 0.5s ease forwards'
                }}
              >
                "{testimonials[currentIndex].text}"
              </p>

              {/* Author */}
              <div 
                key={`author-${currentIndex}`}
                className="flex items-center gap-4"
                style={{
                  animation: 'fadeInUp 0.5s ease 0.1s forwards',
                  opacity: 0
                }}
              >
                <div className="w-12 h-12 bg-black/10 flex items-center justify-center">
                  <span className="text-lg font-semibold text-black">
                    {testimonials[currentIndex].name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-black">{testimonials[currentIndex].name}</p>
                  <p className="text-sm text-black/50">Verified Client</p>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <div className="absolute top-1/2 -translate-y-1/2 -left-4 lg:-left-6">
              <button
                onClick={prevTestimonial}
                className="w-10 h-10 lg:w-12 lg:h-12 bg-white shadow-lg flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6" />
              </button>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 -right-4 lg:-right-6">
              <button
                onClick={nextTestimonial}
                className="w-10 h-10 lg:w-12 lg:h-12 bg-white shadow-lg flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6" />
              </button>
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (!isAnimating) {
                    setIsAnimating(true);
                    setCurrentIndex(index);
                    setTimeout(() => setIsAnimating(false), 500);
                  }
                }}
                className={`nav-dot w-3 h-3 transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-black scale-125' 
                    : 'bg-black/20 hover:bg-black/40'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default TestimonialsSection;
