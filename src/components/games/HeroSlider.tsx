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

  // Auto-rotate slides
  useEffect(() => {
    if (slides.length <= 1) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [currentSlide, slides.length]);
  
  if (!slides.length) return null;

  return (
    <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent z-10" />
          
          {/* Background image */}
          <img
            src={slide.heroImageUrl}
            alt={slide.title}
            className="h-full w-full object-cover object-center"
          />
          
          {/* Content */}
          <div className="absolute inset-0 z-20 flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-xl">
                {slide.badge && (
                  <span className="inline-block rounded-md bg-purple-600 px-3 py-1 text-sm font-medium text-white mb-4">
                    {slide.badge}
                  </span>
                )}
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
                  {slide.title}
                </h2>
                <p className="text-lg text-slate-300 mb-6">
                  {slide.description}
                </p>
                <div className="flex space-x-4">
                  <Link to={`/games/${slide.id}`}>
                    <Button size="lg">
                      Explore Game
                    </Button>
                  </Link>
                  <span className="text-xl font-bold text-white flex items-center">
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
            className="absolute left-4 top-1/2 z-30 -translate-y-1/2 rounded-full bg-slate-900/60 p-2 text-white hover:bg-slate-900 focus:outline-none"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 z-30 -translate-y-1/2 rounded-full bg-slate-900/60 p-2 text-white hover:bg-slate-900 focus:outline-none"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}
      
      {/* Indicators */}
      {slides.length > 1 && (
        <div className="absolute bottom-4 left-1/2 z-30 -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 w-2 rounded-full ${
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