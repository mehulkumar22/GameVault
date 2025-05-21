import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '../ui/Button';
import { FeaturedGame } from '../../types';

interface HeroSliderProps {
  slides: FeaturedGame[];
}

const HeroSlider = ({ slides }: HeroSliderProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (slides.length <= 1) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSlide, slides.length]);

  if (!slides.length) return null;

  return (
    <div className="relative h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent z-10" />

          {/* Responsive Background image */}
          <img
            src={slide.heroImageUrl}
            srcSet={`
              ${slide.heroImageUrl}?w=320 320w,
              ${slide.heroImageUrl}?w=480 480w,
              ${slide.heroImageUrl}?w=768 768w,
              ${slide.heroImageUrl}?w=1024 1024w,
              ${slide.heroImageUrl}?w=1280 1280w
            `}
            sizes="(max-width: 640px) 320px,
                   (max-width: 768px) 480px,
                   (max-width: 1024px) 768px,
                   (max-width: 1280px) 1024px,
                   1280px"
            alt={slide.title}
            loading="lazy"
            className="h-full w-full object-cover object-center"
          />

          {/* Slide content */}
          <div className="absolute inset-0 z-20 flex items-center">
            <div className="container mx-auto px-3 sm:px-6 md:px-8">
              <div className="max-w-md sm:max-w-lg">
                {slide.badge && (
                  <span className="inline-block rounded-md bg-purple-600 px-2 py-0.5 text-[10px] sm:text-sm font-medium text-white mb-2 sm:mb-4">
                    {slide.badge}
                  </span>
                )}
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-2 sm:mb-4">
                  {slide.title}
                </h2>
                <p className="text-xs sm:text-base text-slate-300 mb-3 sm:mb-6 line-clamp-3">
                  {slide.description}
                </p>
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
                  <Link to={`/games/${slide.id}`}>
                    <Button size="sm" className="text-xs sm:text-base px-3 py-1.5 sm:px-6 sm:py-2">
                      Explore Game
                    </Button>
                  </Link>
                  <span className="text-sm sm:text-xl font-bold text-white">
                    Just ₹{slide.price}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation buttons */}
      {slides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-2 sm:left-4 top-1/2 z-30 -translate-y-1/2 rounded-full bg-slate-900/60 p-1.5 sm:p-2 text-white hover:bg-slate-900 focus:outline-none"
          >
            <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 sm:right-4 top-1/2 z-30 -translate-y-1/2 rounded-full bg-slate-900/60 p-1.5 sm:p-2 text-white hover:bg-slate-900 focus:outline-none"
          >
            <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6" />
          </button>
        </>
      )}

      {/* Indicators */}
      {slides.length > 1 && (
        <div className="absolute bottom-3 left-1/2 z-30 -translate-x-1/2 flex space-x-1 sm:space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-1 w-1 sm:h-2 sm:w-2 rounded-full ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HeroSlider;
