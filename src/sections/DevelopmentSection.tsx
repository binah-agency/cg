import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import developmentData from '@/data/development.json';

export default function DevelopmentSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    if (!section || !image) return;

    // Parallax on image
    const tween = gsap.to(image, {
      yPercent: 30,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    return () => { tween.kill(); };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const textEls = section.querySelectorAll('.dev-reveal');
    const tween = gsap.from(textEls, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 70%',
      },
    });

    return () => { tween.kill(); };
  }, []);

  return (
    <section ref={sectionRef} id="development" className="relative h-[80vh] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          ref={imageRef}
          src="/images/development-project.jpg"
          alt="South Florida development project"
          className="absolute top-0 left-0 w-full h-[130%] object-cover"
          loading="lazy"
        />
      </div>

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy-base/95 via-navy-base/75 to-navy-base/40" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-container section-padding max-w-xl">
          <h2 className="dev-reveal font-serif text-3xl md:text-4xl text-white leading-snug">
            {developmentData.hero}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div className="dev-reveal">
              <h4 className="text-xs uppercase tracking-[0.2em] text-gold-primary mb-3">
                Project Management
              </h4>
              <ul className="space-y-2">
                {developmentData.management.projectManagement.slice(0, 4).map((item, i) => (
                  <li key={i} className="text-sm text-text-secondary">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="dev-reveal">
              <h4 className="text-xs uppercase tracking-[0.2em] text-gold-primary mb-3">
                Construction Management
              </h4>
              <ul className="space-y-2">
                {developmentData.management.constructionManagement.slice(0, 4).map((item, i) => (
                  <li key={i} className="text-sm text-text-secondary">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Link
            to="/development"
            className="dev-reveal inline-flex items-center gap-2 text-gold-primary text-sm uppercase tracking-[0.1em] hover:text-gold-hover mt-8 transition-colors"
          >
            Explore Development Services →
          </Link>
        </div>
      </div>
    </section>
  );
}
