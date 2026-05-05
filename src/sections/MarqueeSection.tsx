import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const marqueeWords = ['LIVING', 'DESIGN', 'ARCHITECTURE', 'INVESTMENT', 'PRESTIGE', 'SOUTH FLORIDA', 'DEVELOPMENT', 'MANAGEMENT'];
const marqueeImages = [
  '/images/marquee-1.jpg',
  '/images/marquee-2.jpg',
  '/images/marquee-3.jpg',
  '/images/about-building.jpg',
];

export default function MarqueeSection() {
  const track1Ref = useRef<HTMLDivElement>(null);
  const track2Ref = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const track1 = track1Ref.current;
    const track2 = track2Ref.current;
    if (!track1 || !track2) return;

    // Infinite scroll animation
    const tl1 = gsap.to(track1, {
      xPercent: -50,
      duration: 30,
      ease: 'none',
      repeat: -1,
    });

    const tl2 = gsap.to(track2, {
      xPercent: 50,
      duration: 35,
      ease: 'none',
      repeat: -1,
    });

    return () => {
      tl1.kill();
      tl2.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[80vh] bg-navy-base overflow-hidden flex flex-col justify-center"
    >
      {/* Row 1 - Images scrolling left */}
      <div className="overflow-hidden mb-4">
        <div ref={track1Ref} className="flex gap-4 whitespace-nowrap" style={{ width: 'fit-content' }}>
          {[...marqueeImages, ...marqueeImages, ...marqueeImages, ...marqueeImages].map((src, i) => (
            <div
              key={`img-${i}`}
              className="flex-shrink-0 w-[300px] md:w-[400px] h-[200px] md:h-[260px] overflow-hidden"
            >
              <img
                src={src}
                alt=""
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 - Text scrolling right */}
      <div className="overflow-hidden">
        <div ref={track2Ref} className="flex gap-8 whitespace-nowrap" style={{ width: 'fit-content' }}>
          {[...marqueeWords, ...marqueeWords, ...marqueeWords, ...marqueeWords].map((word, i) => (
            <span
              key={`word-${i}`}
              className="font-serif text-6xl md:text-8xl lg:text-9xl text-white/10 flex-shrink-0 select-none"
            >
              {word}
            </span>
          ))}
        </div>
      </div>

      {/* Gradient overlays */}
      <div className="absolute top-0 left-0 w-32 md:w-64 h-full bg-gradient-to-r from-navy-base to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-32 md:w-64 h-full bg-gradient-to-l from-navy-base to-transparent z-10 pointer-events-none" />
    </section>
  );
}
