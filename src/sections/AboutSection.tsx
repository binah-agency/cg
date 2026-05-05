import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import siteData from '@/data/site.json';

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [counters, setCounters] = useState([0, 0, 0]);

  // Parallax on image
  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    if (!section || !image) return;

    const tween = gsap.to(image, {
      yPercent: 20,
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

  // Stat counters
  useEffect(() => {
    const stats = statsRef.current;
    if (!stats) return;

    const targets = [20, 1, 100];
    const st = ScrollTrigger.create({
      trigger: stats,
      start: 'top 85%',
      onEnter: () => {
        targets.forEach((target, i) => {
          gsap.to(
            { val: 0 },
            {
              val: target,
              duration: 2,
              ease: 'power2.out',
              onUpdate: function () {
                setCounters((prev) => {
                  const next = [...prev];
                  next[i] = Math.round(this.targets()[0].val);
                  return next;
                });
              },
            }
          );
        });
      },
      once: true,
    });

    return () => { st.kill(); };
  }, []);

  // Text reveal
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const textElements = section.querySelectorAll('.reveal-text');
    const tween = gsap.from(textElements, {
      y: 30,
      opacity: 0,
      filter: 'blur(4px)',
      duration: 1,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 75%',
      },
    });

    return () => { tween.kill(); };
  }, []);

  return (
    <section ref={sectionRef} className="bg-white py-24 md:py-32">
      <div className="max-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Image */}
          <div className="relative h-[400px] md:h-[700px] overflow-hidden">
            <div ref={imageRef} className="absolute inset-0">
              <img
                src="/images/about-building.jpg"
                alt="South Florida commercial real estate"
                className="w-full h-[120%] object-cover"
                loading="lazy"
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center px-8 md:px-16 py-12 md:py-0">
            <h2 className="reveal-text font-serif text-3xl md:text-4xl text-navy-base leading-snug">
              The Cuervo Group provides the highest standard of real estate services.
            </h2>
            <p className="reveal-text text-base text-gray-500 mt-6 leading-relaxed">
              We pride ourselves in our value-added services, proven solutions, industry-leading expertise and local knowledge. As a full service firm, we strive for excellence in all facets of real estate. Our mission is to maximize profits, minimize headaches, and have a positive impact on every property and community that we engage.
            </p>

            {/* Values pills */}
            <div className="reveal-text flex flex-wrap gap-3 mt-6">
              {siteData.values.map((val) => (
                <span
                  key={val}
                  className="border border-gold-primary/40 text-gold-primary text-xs uppercase tracking-[0.1em] px-4 py-2 rounded-full"
                >
                  {val}
                </span>
              ))}
            </div>

            {/* Stats */}
            <div ref={statsRef} className="grid grid-cols-3 gap-8 mt-10">
              <div className="reveal-text">
                <p className="font-serif text-4xl text-gold-primary font-light">
                  {counters[0]}+
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Years in South Florida Real Estate
                </p>
              </div>
              <div className="reveal-text">
                <p className="font-serif text-2xl md:text-4xl text-gold-primary font-light">
                  Full
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Service Commercial & Residential Firm
                </p>
              </div>
              <div className="reveal-text">
                <p className="font-serif text-4xl text-gold-primary font-light">
                  {counters[2]}%
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Commitment to Community
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
