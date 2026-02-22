import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Instagram, Youtube, Clock } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.footer-column',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none'
          }
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="bg-black text-white">
      {/* Main Footer */}
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Contact Column */}
          <div className="footer-column">
            <h3 className="text-lg font-semibold mb-6 tracking-wide">Contact Us</h3>
            <div className="space-y-6">
              <div>
                <p className="font-medium mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Salon Murphy - Graf Ignatiev 3
                </p>
                <a href="tel:+359887427192" className="text-white/70 hover:text-white transition-colors flex items-center gap-2 text-sm">
                  <Phone className="w-3 h-3" />
                  +359 887 427 192
                </a>
                <a href="mailto:grafa@murphystyle.com" className="text-white/70 hover:text-white transition-colors flex items-center gap-2 text-sm mt-1">
                  <Mail className="w-3 h-3" />
                  grafa@murphystyle.com
                </a>
              </div>
              <div>
                <p className="font-medium mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Salon Murphy - Patriarch Evtimiy 57
                </p>
                <a href="tel:+359887428326" className="text-white/70 hover:text-white transition-colors flex items-center gap-2 text-sm">
                  <Phone className="w-3 h-3" />
                  +359 887 428 326
                </a>
                <a href="mailto:patriarha@murphystyle.com" className="text-white/70 hover:text-white transition-colors flex items-center gap-2 text-sm mt-1">
                  <Mail className="w-3 h-3" />
                  patriarha@murphystyle.com
                </a>
              </div>
            </div>
          </div>

          {/* Working Hours */}
          <div className="footer-column">
            <h3 className="text-lg font-semibold mb-6 tracking-wide flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Working Hours
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-white/70">Monday - Friday:</span>
                <span>9:00 — 20:00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">Saturday:</span>
                <span>10:00 — 18:00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">Sunday:</span>
                <span>Closed</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-column">
            <h3 className="text-lg font-semibold mb-6 tracking-wide">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { path: '/services', label: 'Services' },
                { path: '/about', label: 'About Us' },
                { path: '/gallery', label: 'Gallery' },
                { path: '/contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-white/70 hover:text-white transition-colors text-sm inline-block relative group"
                  >
                    {link.label}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow Us */}
          <div className="footer-column">
            <h3 className="text-lg font-semibold mb-6 tracking-wide">Follow Us</h3>
            <div className="flex gap-4 mb-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-white/30 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 hover:scale-110"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-white/30 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 hover:scale-110"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-white/30 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 hover:scale-110"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
            <p className="text-white/50 text-sm">
              Stay connected with us for the latest updates, beauty tips, and exclusive offers.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/50 text-sm text-center md:text-left">
              © 2026 MurphyStyle. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link to="/" className="text-white/50 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/" className="text-white/50 hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
