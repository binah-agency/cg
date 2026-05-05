import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import siteData from '@/data/site.json';
import communityData from '@/data/community.json';
import { ArrowRight } from 'lucide-react';

export default function About() {
  const pageRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const elements = page.querySelectorAll('.about-reveal');
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
          <p className="about-reveal text-xs uppercase tracking-[0.2em] text-gold-primary mb-4">
            About Us
          </p>
          <h1 className="about-reveal font-serif text-4xl md:text-5xl text-white max-w-3xl leading-tight">
            The Cuervo Group provides the highest standard of real estate services.
          </h1>
        </div>
      </section>

      {/* Overview */}
      <section className="bg-white py-24 md:py-32">
        <div className="max-container section-padding">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <h2 className="about-reveal font-serif text-3xl text-navy-base">
                Our Mission
              </h2>
              <p className="about-reveal text-gray-500 mt-6 leading-relaxed">
                {siteData.mission}
              </p>
              <div className="about-reveal flex flex-wrap gap-3 mt-6">
                {siteData.values.map((val) => (
                  <span
                    key={val}
                    className="border border-gold-primary/40 text-gold-primary text-xs uppercase tracking-[0.1em] px-4 py-2 rounded-full"
                  >
                    {val}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h2 className="about-reveal font-serif text-3xl text-navy-base">
                Who We Are
              </h2>
              <p className="about-reveal text-gray-500 mt-6 leading-relaxed">
                {siteData.description}
              </p>
              <p className="about-reveal text-gray-500 mt-4 leading-relaxed">
                Led by principal {siteData.leader}, CG is comprised of proven South Florida real estate professionals with deep expertise in investment, development, management, and brokerage services.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section id="leadership" className="bg-navy-deep py-24 md:py-32">
        <div className="max-container section-padding">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="about-reveal">
              <img
                src="/images/about-building.jpg"
                alt="Christina Cuervo"
                className="w-full h-[500px] object-cover"
                loading="lazy"
              />
            </div>
            <div>
              <p className="about-reveal text-xs uppercase tracking-[0.2em] text-gold-primary mb-4">
                Leadership
              </p>
              <h2 className="about-reveal font-serif text-4xl text-white">
                {siteData.leader}
              </h2>
              <p className="about-reveal text-sm uppercase tracking-[0.2em] text-gold-primary mt-3">
                {siteData.title}
              </p>
              <p className="about-reveal text-text-secondary mt-6 leading-relaxed">
                {siteData.leaderBio}
              </p>
              <p className="about-reveal text-text-secondary mt-4 leading-relaxed">
                With extensive experience in both the public and private sectors, Christina brings a unique perspective to real estate development and investment in South Florida.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Community */}
      <section id="community" className="bg-cream py-24 md:py-32">
        <div className="max-container section-padding">
          <h2 className="about-reveal font-serif text-3xl md:text-4xl text-navy-base text-center">
            {communityData.headline}
          </h2>
          <p className="about-reveal text-gray-500 text-center mt-6 max-w-2xl mx-auto">
            {communityData.leaderNote}
          </p>
          <div className="about-reveal grid grid-cols-2 md:grid-cols-5 gap-6 mt-16 place-items-center">
            {communityData.organizations.map((org) => (
              <div
                key={org}
                className="w-full h-24 flex items-center justify-center bg-white/60 border border-navy-base/10 p-3 hover:bg-white hover:shadow-md transition-all duration-300"
              >
                <span className="text-xs text-navy-base/60 text-center font-serif">
                  {org}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Careers CTA */}
      <section id="careers" className="bg-white py-24 md:py-32">
        <div className="max-container section-padding text-center">
          <h2 className="about-reveal font-serif text-3xl md:text-4xl text-navy-base">
            Join Our Team
          </h2>
          <p className="about-reveal text-gray-500 mt-6 max-w-2xl mx-auto">
            We are always looking for talented professionals who share our commitment to excellence in real estate. If you are passionate about making an impact in South Florida real estate, we want to hear from you.
          </p>
          <Link
            to="/contact"
            className="about-reveal pill-button-primary inline-flex items-center gap-2 mt-8"
          >
            Get in Touch <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
