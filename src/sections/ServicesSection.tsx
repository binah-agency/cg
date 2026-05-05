import { useState, useEffect, useRef } from 'react';
import { TrendingUp, Building2, KeyRound, MapPin } from 'lucide-react';
import gsap from 'gsap';
import ServiceModal from '@/components/ServiceModal';
import servicesData from '@/data/services.json';

const iconMap: Record<string, React.ReactNode> = {
  TrendingUp: <TrendingUp className="w-8 h-8" />,
  Building2: <Building2 className="w-8 h-8" />,
  KeyRound: <KeyRound className="w-8 h-8" />,
  MapPin: <MapPin className="w-8 h-8" />,
};

export default function ServicesSection() {
  const [activeService, setActiveService] = useState<string | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const cards = grid.querySelectorAll('.service-card');
    const tween = gsap.from(cards, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: grid,
        start: 'top 80%',
      },
    });

    return () => { tween.kill(); };
  }, []);

  return (
    <section id="services" className="bg-navy-deep py-24 md:py-32">
      <div className="max-container section-padding">
        <p className="text-xs uppercase tracking-[0.2em] text-gold-primary mb-4">
          Our Services
        </p>
        <h2 className="font-serif text-3xl md:text-4xl text-white mb-16">
          A Vertically Integrated Real Estate Platform
        </h2>

        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {servicesData.map((service) => (
            <div
              key={service.id}
              className="service-card bg-navy-base border border-gold-primary/10 p-8 cursor-pointer hover:border-gold-primary/40 hover:-translate-y-1 hover:shadow-lg hover:shadow-gold-primary/5 transition-all duration-300"
              onClick={() => setActiveService(service.id)}
            >
              <div className="text-gold-primary mb-6">{iconMap[service.icon]}</div>
              <h3 className="font-serif text-2xl text-white">{service.title}</h3>
              <p className="text-sm text-gold-primary italic mt-2">{service.tagline}</p>
              <p className="text-sm text-text-secondary mt-4 line-clamp-3">
                {service.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {service.subServices.slice(0, 3).map((sub) => (
                  <span
                    key={sub}
                    className="border border-gold-primary/30 text-gold-primary text-xs px-3 py-1 rounded-full"
                  >
                    {sub}
                  </span>
                ))}
                {service.subServices.length > 3 && (
                  <span className="text-text-secondary text-xs px-2 py-1">
                    +{service.subServices.length - 3} more
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <ServiceModal serviceId={activeService} onClose={() => setActiveService(null)} />
    </section>
  );
}
