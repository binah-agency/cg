import { useEffect, useRef } from 'react';
import {
  Building,
  FileText,
  HardHat,
  Users,
  BarChart3,
  Gavel,
} from 'lucide-react';
import gsap from 'gsap';
import managementData from '@/data/management.json';

const features = [
  { icon: Building, title: 'Property Management', desc: 'Commercial, Residential, Industrial' },
  { icon: FileText, title: 'Leasing Services', desc: 'Commercial + Residential leasing and tenant retention' },
  { icon: HardHat, title: 'Development Management', desc: 'Full-cycle project oversight' },
  { icon: Users, title: 'Association Management', desc: 'HOA and community management' },
  { icon: BarChart3, title: 'Asset Management', desc: 'Retail, Multifamily, Industrial' },
  { icon: Gavel, title: 'REO Management & Receiverships', desc: 'Special asset and court-ordered services' },
];

export default function ManagementSection() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const cards = grid.querySelectorAll('.mgmt-card');
    const tween = gsap.from(cards, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: grid,
        start: 'top 80%',
      },
    });

    return () => { tween.kill(); };
  }, []);

  return (
    <section id="management" className="bg-white py-24 md:py-32">
      <div className="max-container section-padding">
        <h2 className="font-serif text-3xl md:text-4xl text-navy-base max-w-2xl leading-snug">
          {managementData.propertyManagement.headline}
        </h2>

        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
        >
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={i}
                className="mgmt-card p-8 border border-gray-200 hover:border-gold-primary/30 hover:shadow-md transition-all duration-300"
              >
                <Icon className="w-10 h-10 text-gold-primary mb-4" />
                <h3 className="font-serif text-xl text-navy-base">{feature.title}</h3>
                <p className="text-sm text-gray-500 mt-2">{feature.desc}</p>
              </div>
            );
          })}
        </div>

        <p className="text-sm text-gray-500 italic mt-12 text-center">
          We utilize advanced property management software allowing for fiscal transparency to owners and value-added services to tenants.
        </p>
      </div>
    </section>
  );
}
