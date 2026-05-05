import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import communityData from '@/data/community.json';

// Generate placeholder logos using organization names as text
const organizations = communityData.organizations;

export default function CommunitySection() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const logos = grid.querySelectorAll('.org-logo');
    const tween = gsap.from(logos, {
      opacity: 0,
      y: 20,
      duration: 0.6,
      stagger: 0.08,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: grid,
        start: 'top 85%',
      },
    });

    return () => { tween.kill(); };
  }, []);

  return (
    <section className="bg-cream py-24 md:py-32">
      <div className="max-w-[1200px] mx-auto section-padding">
        <h2 className="font-serif text-3xl md:text-4xl text-navy-base text-center">
          {communityData.headline}
        </h2>
        <p className="text-base text-gray-500 text-center mt-6 max-w-2xl mx-auto">
          {communityData.leaderNote}
        </p>

        <div
          ref={gridRef}
          className="grid grid-cols-3 md:grid-cols-5 gap-8 md:gap-12 mt-16 place-items-center"
        >
          {organizations.map((org) => (
            <div
              key={org}
              className="org-logo w-28 h-28 flex items-center justify-center bg-white/60 border border-navy-base/10 p-4 hover:bg-white hover:shadow-md transition-all duration-300 group"
            >
              <span className="text-xs md:text-sm text-navy-base/60 text-center font-serif leading-tight group-hover:text-navy-base transition-colors">
                {org}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
