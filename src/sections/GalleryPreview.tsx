import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Grid3X3 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const galleryImages = [
  { src: '/gallery-1.jpg', alt: 'Salon Interior', span: 'col-span-1 row-span-2' },
  { src: '/gallery-2.jpg', alt: 'Hair Styling', span: 'col-span-1 row-span-1' },
  { src: '/gallery-3.jpg', alt: 'Color Treatment', span: 'col-span-1 row-span-1' },
  { src: '/gallery-4.jpg', alt: 'Manicure', span: 'col-span-1 row-span-1' },
  { src: '/gallery-5.jpg', alt: 'Bridal Style', span: 'col-span-1 row-span-2' },
  { src: '/gallery-7.jpg', alt: 'Facial Treatment', span: 'col-span-1 row-span-1' },
  { src: '/gallery-8.jpg', alt: 'Blow Dry', span: 'col-span-1 row-span-1' },
];

const GalleryPreview = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo('.gallery-title',
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

      // Gallery items staggered animation
      gsap.fromTo('.gallery-item',
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.gallery-grid',
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
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12 lg:mb-16">
          <div>
            <span className="gallery-title inline-block text-sm font-medium tracking-[0.3em] text-black/50 uppercase mb-4">
              Gallery
            </span>
            <h2 className="gallery-title text-3xl sm:text-4xl lg:text-5xl font-bold text-black">
              Shine with MurphyStyle
            </h2>
          </div>
          <Link
            to="/gallery"
            className="gallery-title mt-6 lg:mt-0 inline-flex items-center gap-3 px-6 py-3 border-2 border-black text-black font-semibold tracking-wider transition-all duration-300 hover:bg-black hover:text-white group"
          >
            <Grid3X3 className="w-5 h-5" />
            VIEW FULL GALLERY
            <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>

        {/* Gallery Grid */}
        <div className="gallery-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4 auto-rows-[200px] lg:auto-rows-[250px]">
          {galleryImages.map((image, index) => (
            <Link
              key={index}
              to="/gallery"
              className={`gallery-item group relative overflow-hidden ${image.span}`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                  <div className="w-12 h-12 bg-white flex items-center justify-center">
                    <ArrowUpRight className="w-6 h-6 text-black" />
                  </div>
                </div>
              </div>
              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-sm font-medium">{image.alt}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GalleryPreview;
