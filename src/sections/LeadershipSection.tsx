import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import siteData from '@/data/site.json';

export default function LeadershipSection() {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const tween = gsap.from(card, {
      scale: 0.96,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
      },
    });

    return () => { tween.kill(); };
  }, []);

  return (
    <section className="bg-navy-base py-24 md:py-32">
      <div className="max-w-[800px] mx-auto section-padding">
        <div
          ref={cardRef}
          className="bg-navy-deep border border-gold-primary/20 p-12 md:p-16 text-center"
        >
          <h3 className="font-serif text-3xl text-white">
            {siteData.leader}
          </h3>
          <p className="text-sm uppercase tracking-[0.2em] text-gold-primary mt-3">
            {siteData.title}
          </p>
          <p className="text-base text-text-secondary mt-6 max-w-lg mx-auto">
            {siteData.leaderBio}
          </p>
          <Link
            to="/about#leadership"
            className="inline-flex items-center gap-2 text-gold-primary text-sm uppercase tracking-[0.1em] hover:text-gold-hover mt-6 transition-colors"
          >
            View Full Bio →
          </Link>
        </div>
      </div>
    </section>
  );
}
