import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import managementData from '@/data/management.json';
import { CheckCircle, ArrowRight } from 'lucide-react';

const tabs = [
  { id: 'property', label: 'Property Management' },
  { id: 'leasing', label: 'Leasing Services' },
  { id: 'asset', label: 'Asset Management' },
  { id: 'reo', label: 'REO & Receiverships' },
];

export default function Management() {
  const [activeTab, setActiveTab] = useState('property');
  const pageRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const elements = page.querySelectorAll('.mgmtp-reveal');
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
          <p className="mgmtp-reveal text-xs uppercase tracking-[0.2em] text-gold-primary mb-4">
            Management
          </p>
          <h1 className="mgmtp-reveal font-serif text-4xl md:text-5xl text-white max-w-3xl leading-tight">
            {managementData.propertyManagement.headline}
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
          {activeTab === 'property' && (
            <div className="mgmtp-reveal">
              <h2 className="font-serif text-3xl text-navy-base">Property Management</h2>
              <p className="text-gray-500 mt-4 leading-relaxed max-w-3xl">
                {managementData.propertyManagement.tagline}
              </p>
              <p className="text-gray-500 mt-4 leading-relaxed max-w-3xl">
                {managementData.propertyManagement.description}
              </p>
              <h3 className="text-xs uppercase tracking-[0.2em] text-gold-primary mt-10 mb-6">
                Our Services
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {managementData.propertyManagement.services.map((service, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700 text-sm">
                    <CheckCircle className="w-4 h-4 text-gold-primary flex-shrink-0 mt-0.5" />
                    {service}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'leasing' && (
            <div className="mgmtp-reveal">
              <h2 className="font-serif text-3xl text-navy-base">Leasing Services</h2>
              <div className="mt-8 space-y-8 max-w-3xl">
                <div>
                  <h3 className="text-xs uppercase tracking-[0.2em] text-gold-primary mb-4">
                    Commercial Leasing
                  </h3>
                  <p className="text-gray-500 leading-relaxed">
                    {managementData.leasing.commercial}
                  </p>
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-[0.2em] text-gold-primary mb-4">
                    Residential Leasing
                  </h3>
                  <p className="text-gray-500 leading-relaxed">
                    {managementData.leasing.residential}
                  </p>
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-[0.2em] text-gold-primary mb-4">
                    Tenant Retention
                  </h3>
                  <p className="text-gray-500 leading-relaxed">
                    {managementData.leasing.tenantRetention}
                  </p>
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-[0.2em] text-gold-primary mb-4">
                    Screening Process
                  </h3>
                  <ul className="space-y-2">
                    {managementData.leasing.screeningProcess.map((step, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-700 text-sm">
                        <CheckCircle className="w-4 h-4 text-gold-primary flex-shrink-0 mt-0.5" />
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'asset' && (
            <div className="mgmtp-reveal">
              <h2 className="font-serif text-3xl text-navy-base">Asset Management</h2>
              <p className="text-gray-500 mt-4 leading-relaxed max-w-3xl">
                {managementData.assetManagement.tagline}
              </p>
              <p className="text-gray-500 mt-4 leading-relaxed max-w-3xl">
                {managementData.assetManagement.objective}
              </p>
              <h3 className="text-xs uppercase tracking-[0.2em] text-gold-primary mt-10 mb-6">
                Services
              </h3>
              <ul className="space-y-3">
                {managementData.assetManagement.services.map((service, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-gold-primary flex-shrink-0 mt-0.5" />
                    {service}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'reo' && (
            <div className="mgmtp-reveal">
              <h2 className="font-serif text-3xl text-navy-base">REO & Receiverships</h2>
              <p className="text-gray-500 mt-4 leading-relaxed max-w-3xl">
                {managementData.reo.tagline}
              </p>
              <p className="text-gray-500 mt-4 leading-relaxed max-w-3xl">
                {managementData.reo.description}
              </p>
              <h3 className="text-xs uppercase tracking-[0.2em] text-gold-primary mt-10 mb-6">
                Receivership Services
              </h3>
              <ul className="space-y-3">
                {managementData.reo.receivershipServices.map((service, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700 text-sm">
                    <CheckCircle className="w-4 h-4 text-gold-primary flex-shrink-0 mt-0.5" />
                    {service}
                  </li>
                ))}
              </ul>
              <p className="text-gray-500 mt-8 leading-relaxed max-w-3xl italic">
                {managementData.reo.whyReceivership}
              </p>
            </div>
          )}

          <div className="mt-16 pt-8 border-t border-gray-200">
            <Link
              to="/contact"
              className="pill-button-primary inline-flex items-center gap-2"
            >
              Discuss Management Services <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
