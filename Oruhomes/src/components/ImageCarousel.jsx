import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ImageCarousel({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-zinc-500 text-sm font-semibold">
        No images available
      </div>
    );
  }

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full h-full group overflow-hidden bg-black flex-center">
      {/* Images Slider */}
      <AnimatePresence initial={false} mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`Room image ${currentIndex + 1}`}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="w-full h-full object-cover"
        />
      </AnimatePresence>

      {/* Dark overlay gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 pointer-events-none"></div>

      {/* Navigation Buttons */}
      {images.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-4 w-9 h-9 rounded-full bg-black/40 border border-white/10 hover:bg-black/70 flex-center text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer z-10"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 w-9 h-9 rounded-full bg-black/40 border border-white/10 hover:bg-black/70 flex-center text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer z-10"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}

      {/* Slide Index Badge */}
      <div className="absolute bottom-4 right-4 bg-black/60 border border-white/10 px-2 py-0.5 rounded-lg text-[10px] font-bold text-white font-mono tracking-wider z-10">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Dot Indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(idx);
              }}
              className="w-1.5 h-1.5 rounded-full transition-all"
              style={{
                backgroundColor: currentIndex === idx ? 'var(--primary)' : 'rgba(255, 255, 255, 0.4)',
                width: currentIndex === idx ? '12px' : '6px'
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
