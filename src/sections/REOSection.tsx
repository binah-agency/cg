import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Calculator, Shield } from 'lucide-react';
import gsap from 'gsap';
import managementData from '@/data/management.json';

const pillars = [
  {
    icon: TrendingUp,
    title: 'Disposition & Marketing',
    desc: managementData.reo.disposition,
  },
  {
    icon: Calculator,
    title: 'Valuation Advisory',
    desc: 'Comprehensive property valuation and market analysis for distressed and performing assets.',
  },
  {
    icon: Shield,
    title: 'Receivership Services',
    desc: 'Professional, independent management of court-ordered receiverships with customized, timely reporting.',
  },
];

export default function REOSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const pillars = section.querySelectorAll('.reo-pillar');
    const tween = gsap.from(pillars, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
      },
    });

    return () => { tween.kill(); };
  }, []);

  return (
    <section ref={sectionRef} className="bg-navy-deep py-24 md:py-32">
      <div className="max-w-[1200px] mx-auto section-padding">
        <h2 className="font-serif text-3xl md:text-4xl text-white text-center">
          {managementData.reo.tagline}
        </h2>
        <p className="text-base text-text-secondary text-center mt-6 max-w-2xl mx-auto">
          {managementData.reo.mission}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <div key={i} className="reo-pillar text-center">
                <Icon className="w-12 h-12 text-gold-primary mx-auto" />
                <h3 className="font-serif text-xl text-white mt-4">{pillar.title}</h3>
                <p className="text-sm text-text-secondary mt-3">{pillar.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/management#reo"
            className="inline-flex items-center gap-2 text-gold-primary text-sm uppercase tracking-[0.1em] hover:text-gold-hover transition-colors"
          >
            Learn About REO Services →
          </Link>
        </div>
      </div>
    </section>
  );
}
