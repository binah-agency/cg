import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import investmentData from '@/data/investment.json';

export default function InvestmentSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const items = list.querySelectorAll('li');
    const tween = gsap.from(items, {
      x: 60,
      opacity: 0,
      filter: 'blur(6px)',
      duration: 1,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: list,
        start: 'top 80%',
      },
    });

    return () => { tween.kill(); };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const textEls = section.querySelectorAll('.invest-reveal');
    const tween = gsap.from(textEls, {
      y: 30,
      opacity: 0,
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
    <section ref={sectionRef} id="investment" className="bg-navy-base py-24 md:py-32">
      <div className="max-container section-padding">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-16">
          {/* Left Column */}
          <div className="md:col-span-2">
            <h2 className="invest-reveal font-serif text-3xl md:text-4xl text-white leading-snug">
              {investmentData.hero}
            </h2>
            <p className="invest-reveal text-base text-text-secondary mt-6">
              {investmentData.acquisitions.strategy}
            </p>
            <Link
              to="/investment"
              className="invest-reveal inline-flex items-center gap-2 text-gold-primary text-sm uppercase tracking-[0.1em] hover:text-gold-hover mt-6 transition-colors"
            >
              View Investment Services →
            </Link>
          </div>

          {/* Right Column - Target Investments */}
          <div className="md:col-span-3">
            <p className="invest-reveal text-xs uppercase tracking-[0.2em] text-gold-primary mb-6">
              Target Investments
            </p>
            <ul ref={listRef} className="space-y-0">
              {investmentData.acquisitions.targets.map((target, i) => (
                <li
                  key={i}
                  className="text-lg text-white py-4 border-b border-white/10"
                >
                  {target}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
