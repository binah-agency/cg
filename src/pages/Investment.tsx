import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import investmentData from '@/data/investment.json';
import { CheckCircle, ArrowRight } from 'lucide-react';

const tabs = [
  { id: 'acquisitions', label: 'Acquisitions' },
  { id: 'dispositions', label: 'Dispositions' },
  { id: 'financing', label: 'Financing' },
  { id: 'advisory', label: 'Advisory' },
];

export default function Investment() {
  const [activeTab, setActiveTab] = useState('acquisitions');
  const pageRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const elements = page.querySelectorAll('.inv-reveal');
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
          <p className="inv-reveal text-xs uppercase tracking-[0.2em] text-gold-primary mb-4">
            Investment
          </p>
          <h1 className="inv-reveal font-serif text-4xl md:text-5xl text-white max-w-3xl leading-tight">
            {investmentData.hero}
          </h1>
        </div>
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
          {activeTab === 'acquisitions' && (
            <div className="inv-reveal">
              <h2 className="font-serif text-3xl text-navy-base">Acquisitions</h2>
              <p className="text-gray-500 mt-4 leading-relaxed max-w-3xl">
                {investmentData.acquisitions.tagline}
              </p>
              <p className="text-gray-500 mt-4 leading-relaxed max-w-3xl">
                {investmentData.acquisitions.strategy}
              </p>
              <h3 className="text-xs uppercase tracking-[0.2em] text-gold-primary mt-10 mb-6">
                Target Investments
              </h3>
              <ul className="space-y-3">
                {investmentData.acquisitions.targets.map((target, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-gold-primary flex-shrink-0 mt-0.5" />
                    {target}
                  </li>
                ))}
              </ul>
              <h3 className="text-xs uppercase tracking-[0.2em] text-gold-primary mt-10 mb-6">
                Due Diligence Process
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {investmentData.acquisitions.dueDiligence.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700 text-sm">
                    <CheckCircle className="w-4 h-4 text-gold-primary flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'dispositions' && (
            <div className="inv-reveal">
              <h2 className="font-serif text-3xl text-navy-base">Dispositions</h2>
              <p className="text-gray-500 mt-4 leading-relaxed max-w-3xl">
                {investmentData.dispositions.tagline}
              </p>
              <p className="text-gray-500 mt-4 leading-relaxed max-w-3xl">
                {investmentData.dispositions.strategy}
              </p>
              <h3 className="text-xs uppercase tracking-[0.2em] text-gold-primary mt-10 mb-6">
                Key Factors
              </h3>
              <ul className="space-y-3">
                {investmentData.dispositions.factors.map((factor, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-gold-primary flex-shrink-0 mt-0.5" />
                    {factor}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'financing' && (
            <div className="inv-reveal">
              <h2 className="font-serif text-3xl text-navy-base">Financing</h2>
              <p className="text-gray-500 mt-4 leading-relaxed max-w-3xl">
                {investmentData.financing.tagline}
              </p>
              <p className="text-gray-500 mt-4 leading-relaxed max-w-3xl">
                {investmentData.financing.description}
              </p>
            </div>
          )}

          {activeTab === 'advisory' && (
            <div className="inv-reveal">
              <h2 className="font-serif text-3xl text-navy-base">Advisory</h2>
              <p className="text-gray-500 mt-4 leading-relaxed max-w-3xl">
                {investmentData.advisory.tagline}
              </p>
              <h3 className="text-xs uppercase tracking-[0.2em] text-gold-primary mt-10 mb-6">
                Our Services
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {investmentData.advisory.services.map((service, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-gold-primary flex-shrink-0 mt-0.5" />
                    {service}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-16 pt-8 border-t border-gray-200">
            <Link
              to="/contact"
              className="pill-button-primary inline-flex items-center gap-2"
            >
              Discuss Your Investment Goals <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
