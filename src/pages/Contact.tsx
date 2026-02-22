import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const locations = [
  {
    name: 'Salon Murphy - Graf Ignatiev',
    address: 'Graf Ignatiev 3, Sofia',
    phone: '+359 887 427 192',
    email: 'grafa@murphystyle.com',
    hours: 'Mon - Fri: 9:00 - 20:00, Sat: 10:00 - 18:00'
  },
  {
    name: 'Salon Murphy - Patriarch Evtimiy',
    address: 'Patriarch Evtimiy 57, Sofia',
    phone: '+359 887 428 326',
    email: 'patriarha@murphystyle.com',
    hours: 'Mon - Fri: 9:00 - 20:00, Sat: 10:00 - 18:00'
  }
];

const Contact = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', phone: '', service: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.fromTo('.contact-hero-content',
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out'
        }
      );

      // Locations animation
      gsap.fromTo('.location-card',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.locations-section',
            start: 'top 75%',
            toggleActions: 'play none none none'
          }
        }
      );

      // Form animation
      gsap.fromTo('.contact-form-container',
        { opacity: 0, x: 60 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.form-section',
            start: 'top 70%',
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
            backgroundSize: '50px 50px'
          }} />
        </div>
        
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 relative z-10">
          <div className="contact-hero-content max-w-4xl">
            <span className="inline-block text-sm font-medium tracking-[0.3em] text-white/50 uppercase mb-4">
              Contact Us
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Get in
              <span className="block text-white/70">Touch</span>
            </h1>
            <p className="text-white/60 text-lg lg:text-xl max-w-2xl leading-relaxed">
              Ready to book your appointment or have questions? We are here to help. 
              Reach out to us through any of our channels.
            </p>
          </div>
        </div>
      </section>

      {/* Locations Section */}
      <section className="locations-section py-20 lg:py-32 bg-white">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="inline-block text-sm font-medium tracking-[0.3em] text-black/50 uppercase mb-4">
              Our Locations
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-black">
              Visit Us in Sofia
            </h2>
          </div>

          {/* Locations Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {locations.map((location, index) => (
              <div
                key={index}
                className="location-card bg-neutral-50 p-8 lg:p-10"
              >
                <h3 className="text-xl font-bold text-black mb-6">{location.name}</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-black flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-black">Address</p>
                      <p className="text-black/60">{location.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-black flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-black">Phone</p>
                      <a href={`tel:${location.phone}`} className="text-black/60 hover:text-black transition-colors">
                        {location.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-black flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-black">Email</p>
                      <a href={`mailto:${location.email}`} className="text-black/60 hover:text-black transition-colors">
                        {location.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-black flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-black">Working Hours</p>
                      <p className="text-black/60">{location.hours}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="form-section py-20 lg:py-32 bg-neutral-50">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Form Info */}
            <div>
              <span className="inline-block text-sm font-medium tracking-[0.3em] text-black/50 uppercase mb-4">
                Book Appointment
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-black mb-6">
                Schedule Your Visit
              </h2>
              <p className="text-black/60 text-lg mb-8 leading-relaxed">
                Fill out the form and we will get back to you within 24 hours to confirm your appointment. 
                For urgent bookings, please call us directly.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-white">
                  <div className="w-12 h-12 bg-black flex items-center justify-center">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-black">Call Us</p>
                    <a href="tel:+359887427192" className="text-black/60 hover:text-black transition-colors">
                      +359 887 427 192
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-white">
                  <div className="w-12 h-12 bg-black flex items-center justify-center">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-black">Working Hours</p>
                    <p className="text-black/60">Mon - Fri: 9:00 - 20:00</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="contact-form-container bg-white p-8 lg:p-10 shadow-xl">
              {isSubmitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="w-16 h-16 bg-black flex items-center justify-center mb-6">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-black mb-2">Thank You!</h3>
                  <p className="text-black/60">We will contact you soon to confirm your appointment.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-black mb-2">Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-black/20 focus:border-black focus:outline-none transition-colors"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-black mb-2">Phone *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-black/20 focus:border-black focus:outline-none transition-colors"
                        placeholder="Your phone"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-black/20 focus:border-black focus:outline-none transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Service</label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-black/20 focus:border-black focus:outline-none transition-colors bg-white"
                    >
                      <option value="">Select a service</option>
                      <option value="hair">Hair Services</option>
                      <option value="rituals">Rituals & Therapies</option>
                      <option value="nails">Manicure & Pedicure</option>
                      <option value="face">Face Procedures</option>
                      <option value="body">Body Procedures</option>
                      <option value="laser">Laser Epilation</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-black/20 focus:border-black focus:outline-none transition-colors resize-none"
                      placeholder="Any special requests or questions..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-black text-white font-semibold tracking-wider transition-all duration-300 hover:bg-black/90 hover:shadow-xl group"
                  >
                    SEND REQUEST
                    <Send className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
