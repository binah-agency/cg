import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import developmentData from '@/data/development.json';
import { CheckCircle, ArrowRight } from 'lucide-react';

const tabs = [
  { id: 'management', label: 'Development Management' },
  { id: 'design', label: 'Design & Entitlement' },
  { id: 'consulting', label: 'Consulting' },
];

export default function Development() {
  const [activeTab, setActiveTab] = useState('management');
  const pageRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const elements = page.querySelectorAll('.devp-reveal');
    const tweens: gsap.core.Tween[] = [];

    elements.forEach((el) => {
      const tween = gsap.from(el, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
        },
      });
      tweens.push(tween);
    });

    return () => {
      tweens.forEach((t) => t.kill());
    };
  }, []);

  return (
    <main ref={pageRef} className="pt-20">
      {/* Hero */}
      <section className="bg-navy-base py-24 md:py-32">
        <div className="max-container section-padding">
          <p className="devp-reveal text-xs uppercase tracking-[0.2em] text-gold-primary mb-4">
            Development
          </p>
          <h1 className="devp-reveal font-serif text-4xl md:text-5xl text-white max-w-4xl leading-tight">
            {developmentData.hero}
          </h1>
        </div>
      </section>

      {/* Parallax Image */}
      <section className="relative h-[50vh] overflow-hidden">
        <img
          src="/images/development-project.jpg"
          alt="Development project"
          className="absolute top-0 left-0 w-full h-[130%] object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-base via-navy-base/40 to-transparent" />
      </section>

      {/* Tab Navigation */}
      <section className="bg-navy-deep border-b border-white/10">
        <div className="max-container section-padding">
          <div className="flex gap-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 text-sm uppercase tracking-[0.1em] border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-gold-primary border-gold-primary'
                    : 'text-text-secondary border-transparent hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <section className="bg-white py-24 md:py-32">
        <div className="max-container section-padding">
          {activeTab === 'management' && (
            <div className="devp-reveal">
              <h2 className="font-serif text-3xl text-navy-base">Development Management</h2>
              <p className="text-gray-500 mt-4 leading-relaxed max-w-3xl">
                {developmentData.management.description}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
                <div>
                  <h3 className="text-xs uppercase tracking-[0.2em] text-gold-primary mb-4">
                    Project Management
                  </h3>
                  <ul className="space-y-3">
                    {developmentData.management.projectManagement.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-700 text-sm">
                        <CheckCircle className="w-4 h-4 text-gold-primary flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-[0.2em] text-gold-primary mb-4">
                    Construction Management
                  </h3>
                  <ul className="space-y-3">
                    {developmentData.management.constructionManagement.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-700 text-sm">
                        <CheckCircle className="w-4 h-4 text-gold-primary flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'design' && (
            <div className="devp-reveal">
              <h2 className="font-serif text-3xl text-navy-base">Design & Entitlement</h2>
              <div className="mt-8 space-y-8 max-w-3xl">
                <div>
                  <h3 className="text-xs uppercase tracking-[0.2em] text-gold-primary mb-4">
                    Design Philosophy
                  </h3>
                  <p className="text-gray-500 leading-relaxed">
                    {developmentData.designEntitlement.design}
                  </p>
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-[0.2em] text-gold-primary mb-4">
                    Entitlement Services
                  </h3>
                  <p className="text-gray-500 leading-relaxed">
                    {developmentData.designEntitlement.entitlement}
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'consulting' && (
            <div className="devp-reveal">
              <h2 className="font-serif text-3xl text-navy-base">Development Consulting</h2>
              <p className="text-gray-500 mt-4 leading-relaxed max-w-3xl">
                {developmentData.consulting.tagline}
              </p>
              <h3 className="text-xs uppercase tracking-[0.2em] text-gold-primary mt-10 mb-6">
                Areas of Expertise
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {developmentData.consulting.expertise.map((item, i) => (
                  <span
                    key={i}
                    className="border border-gold-primary/30 text-navy-base text-sm px-4 py-2 text-center"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <p className="text-gray-500 mt-8 leading-relaxed max-w-3xl">
                {developmentData.consulting.approach}
              </p>
            </div>
          )}

          <div className="mt-16 pt-8 border-t border-gray-200">
            <Link
              to="/contact"
              className="pill-button-primary inline-flex items-center gap-2"
            >
              Start Your Development Project <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
