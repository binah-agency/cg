import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { MapPin, Building, ArrowRight } from 'lucide-react';

const listings = [
  { type: 'Commercial', location: 'Downtown Miami', status: 'Available', sqft: '15,000 SF', image: '/images/marquee-3.jpg' },
  { type: 'Residential', location: 'Miami Beach', status: 'Leased', sqft: '2,400 SF', image: '/images/marquee-1.jpg' },
  { type: 'Retail', location: 'Coral Gables', status: 'Available', sqft: '3,500 SF', image: '/images/marquee-2.jpg' },
  { type: 'Office', location: 'Brickell', status: 'Available', sqft: '8,200 SF', image: '/images/about-building.jpg' },
  { type: 'Industrial', location: 'Hialeah', status: 'Available', sqft: '25,000 SF', image: '/images/development-project.jpg' },
  { type: 'Mixed-Use', location: 'Wynwood', status: 'Under Contract', sqft: '12,000 SF', image: '/images/hero-bg.jpg' },
];

export default function Properties() {
  const pageRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const elements = page.querySelectorAll('.prop-reveal');
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
          <p className="prop-reveal text-xs uppercase tracking-[0.2em] text-gold-primary mb-4">
            Properties
          </p>
          <h1 className="prop-reveal font-serif text-4xl md:text-5xl text-white max-w-3xl leading-tight">
            Commercial & Residential Properties Across South Florida
          </h1>
          <p className="prop-reveal text-text-secondary mt-6 max-w-2xl">
            Full brokerage services including commercial and residential listings, portfolio inventory, and advisory on acquisitions and dispositions across all property types.
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="bg-navy-deep border-b border-white/10">
        <div className="max-container section-padding py-4 flex gap-4 overflow-x-auto">
          {['All', 'Commercial', 'Residential', 'Retail', 'Office', 'Industrial'].map((filter) => (
            <button
              key={filter}
              className={`text-sm uppercase tracking-[0.1em] transition-colors whitespace-nowrap ${
                filter === 'All'
                  ? 'text-gold-primary'
                  : 'text-text-secondary hover:text-white'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </section>

      {/* Listings Grid */}
      <section className="bg-white py-24 md:py-32">
        <div className="max-container section-padding">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {listings.map((listing, i) => (
              <div
                key={i}
                className="prop-reveal group cursor-pointer border border-gray-200 hover:border-gold-primary/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={listing.image}
                    alt={listing.location}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`text-xs uppercase tracking-[0.1em] px-3 py-1 ${
                      listing.status === 'Available'
                        ? 'bg-gold-primary text-navy-base'
                        : listing.status === 'Leased'
                        ? 'bg-gray-500 text-white'
                        : 'bg-navy-base text-white'
                    }`}>
                      {listing.status}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-gold-primary text-xs uppercase tracking-[0.1em]">
                    <Building className="w-4 h-4" />
                    {listing.type}
                  </div>
                  <h3 className="font-serif text-xl text-navy-base mt-3 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gold-primary" />
                    {listing.location}
                  </h3>
                  <p className="text-sm text-gray-500 mt-2">{listing.sqft}</p>
                  <button className="mt-4 text-sm uppercase tracking-[0.1em] text-gold-primary hover:text-navy-base transition-colors inline-flex items-center gap-2">
                    View Details <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-cream py-24">
        <div className="max-container section-padding text-center">
          <h2 className="prop-reveal font-serif text-3xl text-navy-base">
            Looking for Something Specific?
          </h2>
          <p className="prop-reveal text-gray-500 mt-4 max-w-2xl mx-auto">
            Our team can help you find the perfect property for your needs. Contact us to discuss your requirements and let us help you find your next investment.
          </p>
          <Link
            to="/contact"
            className="prop-reveal pill-button-primary inline-flex items-center gap-2 mt-8"
          >
            Contact Our Brokers <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
