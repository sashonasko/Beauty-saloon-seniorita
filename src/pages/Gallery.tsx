import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const galleryImages = [
  { src: '/gallery-1.jpg', alt: 'Salon Interior', category: 'Interior' },
  { src: '/gallery-2.jpg', alt: 'Hair Styling', category: 'Hair' },
  { src: '/gallery-3.jpg', alt: 'Color Treatment', category: 'Hair' },
  { src: '/gallery-4.jpg', alt: 'Manicure', category: 'Nails' },
  { src: '/gallery-5.jpg', alt: 'Bridal Style', category: 'Hair' },
  { src: '/gallery-6.jpg', alt: 'Spa Area', category: 'Interior' },
  { src: '/gallery-7.jpg', alt: 'Facial Treatment', category: 'Face' },
  { src: '/gallery-8.jpg', alt: 'Blow Dry', category: 'Hair' },
  { src: '/service-hair.jpg', alt: 'Hair Cut', category: 'Hair' },
  { src: '/service-rituals.jpg', alt: 'Hair Treatment', category: 'Hair' },
  { src: '/service-manicure.jpg', alt: 'Nail Care', category: 'Nails' },
  { src: '/service-facial.jpg', alt: 'Facial', category: 'Face' },
];

const categories = ['All', 'Hair', 'Nails', 'Face', 'Interior'];

const Gallery = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredImages = activeCategory === 'All' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % filteredImages.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + filteredImages.length) % filteredImages.length);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.fromTo('.gallery-hero-content',
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out'
        }
      );

      // Filter buttons animation
      gsap.fromTo('.filter-btn',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.05,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.filter-container',
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );

      // Gallery items animation
      gsap.fromTo('.gallery-item',
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.gallery-masonry',
            start: 'top 75%',
            toggleActions: 'play none none none'
          }
        }
      );

    }, pageRef);

    return () => ctx.revert();
  }, []);

  // Re-animate when category changes
  useEffect(() => {
    gsap.fromTo('.gallery-item',
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        stagger: 0.05,
        ease: 'power3.out'
      }
    );
  }, [activeCategory]);

  return (
    <div ref={pageRef} className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-black overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50px)`,
          }} />
        </div>
        
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20 relative z-10">
          <div className="gallery-hero-content max-w-4xl">
            <span className="inline-block text-sm font-medium tracking-[0.3em] text-white/50 uppercase mb-4">
              Gallery
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Our Work
              <span className="block text-white/70">Speaks for Itself</span>
            </h1>
            <p className="text-white/60 text-lg lg:text-xl max-w-2xl leading-relaxed">
              Browse through our portfolio of transformations and get inspired for your next visit.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
          {/* Filter Buttons */}
          <div className="filter-container flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`filter-btn px-6 py-3 text-sm font-medium tracking-wider transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-black text-white'
                    : 'bg-neutral-100 text-black/70 hover:bg-neutral-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Masonry Grid */}
          <div className="gallery-masonry grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4">
            {filteredImages.map((image, index) => (
              <div
                key={`${image.src}-${index}`}
                className={`gallery-item group relative overflow-hidden cursor-pointer ${
                  index % 5 === 0 ? 'col-span-2 row-span-2' : ''
                }`}
                onClick={() => openLightbox(index)}
              >
                <div className={`${index % 5 === 0 ? 'aspect-square' : 'aspect-square'}`}>
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-500 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                    <div className="w-14 h-14 bg-white flex items-center justify-center">
                      <ZoomIn className="w-6 h-6 text-black" />
                    </div>
                  </div>
                </div>

                {/* Label */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-sm font-medium">{image.alt}</p>
                  <p className="text-white/60 text-xs">{image.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 w-12 h-12 bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors z-10"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Navigation */}
          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors z-10"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors z-10"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          {/* Image */}
          <div 
            className="max-w-5xl max-h-[80vh] px-20"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filteredImages[selectedImage].src}
              alt={filteredImages[selectedImage].alt}
              className="max-w-full max-h-[80vh] object-contain"
            />
            <div className="text-center mt-4">
              <p className="text-white text-lg">{filteredImages[selectedImage].alt}</p>
              <p className="text-white/50 text-sm">{filteredImages[selectedImage].category}</p>
            </div>
          </div>

          {/* Image Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-sm">
            {selectedImage + 1} / {filteredImages.length}
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
