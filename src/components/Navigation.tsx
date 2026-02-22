import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { gsap } from 'gsap';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Animate nav links on mount
    gsap.fromTo('.nav-link',
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: 'power3.out', delay: 0.2 }
    );
    gsap.fromTo('.nav-logo',
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.6, ease: 'power3.out' }
    );
  }, []);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/services', label: 'Services' },
    { path: '/about', label: 'About' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/contact', label: 'Contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="nav-logo relative z-10 group"
          >
            <span className={`text-2xl font-bold tracking-wider transition-all duration-300 ${
              isScrolled ? 'text-black' : 'text-white'
            } group-hover:scale-105 inline-block`}>
              MURPHY
            </span>
            <span className={`text-xs block tracking-[0.3em] transition-all duration-300 ${
              isScrolled ? 'text-black/70' : 'text-white/80'
            }`}>
              STYLE
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link relative text-sm font-medium tracking-wide transition-all duration-300 group ${
                  isScrolled
                    ? isActive(link.path) ? 'text-black' : 'text-black/70 hover:text-black'
                    : isActive(link.path) ? 'text-white' : 'text-white/80 hover:text-white'
                }`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-current transition-all duration-300 ${
                  isActive(link.path) ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+359887427192"
              className={`nav-link flex items-center gap-2 text-sm font-medium transition-all duration-300 ${
                isScrolled ? 'text-black/70 hover:text-black' : 'text-white/80 hover:text-white'
              }`}
            >
              <Phone className="w-4 h-4" />
              <span className="hidden xl:inline">+359 887 427 192</span>
            </a>
            <Link
              to="/contact"
              className={`nav-link px-6 py-2.5 text-sm font-semibold tracking-wider transition-all duration-300 ${
                isScrolled
                  ? 'bg-black text-white hover:bg-black/90 hover:shadow-lg'
                  : 'bg-white text-black hover:bg-white/90 hover:shadow-lg'
              }`}
            >
              BOOK NOW
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden relative z-10 p-2 transition-colors duration-300 ${
              isScrolled || isMobileMenuOpen ? 'text-black' : 'text-white'
            }`}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 bg-white z-40 transition-all duration-500 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link, index) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-2xl font-medium tracking-wide transition-all duration-300 ${
                isActive(link.path) ? 'text-black' : 'text-black/60 hover:text-black'
              }`}
              style={{
                animationDelay: `${index * 0.1}s`,
                animation: isMobileMenuOpen ? 'slideInUp 0.5s ease forwards' : 'none',
                opacity: isMobileMenuOpen ? 1 : 0,
                transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)'
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="mt-4 px-8 py-3 bg-black text-white text-lg font-semibold tracking-wider"
          >
            BOOK NOW
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
