import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    // Parallax on scroll
    const tween = gsap.to(content, {
      yPercent: -30,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    return () => {
      tween.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden bg-navy-base"
    >
      {/* Background Image with overlay */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-bg.jpg"
          alt="South Florida skyline"
          loading="eager"
          fetchPriority="high"
          className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto object-cover transform -translate-x-1/2 -translate-y-1/2"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-base/60 via-navy-base/40 to-navy-base" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-base/80 via-navy-base/40 to-transparent" />
      </div>

      {/* Liquid Glass Panel */}
      <div className="absolute z-20 top-1/2 left-[5%] md:left-[10%] transform -translate-y-1/2 p-8 md:p-12 max-w-2xl">
        <div className="liquid-glass">
          {/* Content */}
          <div ref={contentRef} className="relative z-10 pointer-events-auto p-6 md:p-10">
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white mb-4 leading-tight">
              Seasoned Expertise
              <span className="block text-gold-primary">in Commercial Real Estate</span>
            </h1>
            <p className="text-text-secondary text-base md:text-lg mt-6 max-w-md">
              Investment · Development · Management · Properties
            </p>
            <p className="text-text-secondary/70 text-sm md:text-base mt-4 max-w-md">
              Led by Christina Cuervo, CG is comprised of proven South Florida real estate professionals.
            </p>

            {/* Pill Anchors */}
            <div className="flex flex-wrap gap-3 mt-8">
              {['Investment', 'Development', 'Management', 'Properties'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="border border-gold-primary/40 text-gold-primary text-xs uppercase tracking-[0.1em] px-4 py-2 rounded-[50px] hover:bg-gold-primary hover:text-navy-base transition-all duration-300"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById(item.toLowerCase());
                  el?.scrollIntoView({ behavior: 'smooth' });
                  setTimeout(() => el?.focus({ preventScroll: true }), 300);
                }}
                >
                  {item}
                </a>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mt-8">
              <a
                href="#services"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById('services');
                  el?.scrollIntoView({ behavior: 'smooth' });
                  setTimeout(() => el?.focus({ preventScroll: true }), 300);
                }}
                className="pill-button-primary"
              >
                Explore Our Services
              </a>
              <Link
                to="/properties"
                className="text-white text-sm uppercase tracking-[0.1em] hover:text-gold-primary transition-colors inline-flex items-center gap-2"
              >
                View Portfolio <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator Line */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gold-primary/30 z-30">
        <div className="h-full w-1/3 bg-gold-primary shadow-[0_0_15px_#caac5e]" />
      </div>
    </section>
  );
}
