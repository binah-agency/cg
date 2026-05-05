import { Link } from 'react-router-dom';
import { useWavyReveal } from '@/hooks/useWavyReveal';
import siteData from '@/data/site.json';

export default function FinalCTASection() {
  const headlineRef = useWavyReveal<HTMLHeadingElement>('up');

  return (
    <section className="bg-navy-base py-24 md:py-32">
      <div className="max-w-[800px] mx-auto section-padding text-center">
        <h2
          ref={headlineRef}
          className="font-serif text-4xl md:text-5xl text-white"
        >
          Ready to maximize your real estate investment?
        </h2>
        <p className="text-lg text-text-secondary mt-6 max-w-2xl mx-auto">
          Whether you need guidance through a short-term issue or a more complex longer-term challenge requiring higher-level strategic input, we are ready to help.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center mt-10">
          <Link to="/contact" className="pill-button-primary">
            Contact Us
          </Link>
          <a
            href={siteData.clientLogin}
            target="_blank"
            rel="noopener noreferrer"
            className="pill-button-outline"
          >
            Client Login
          </a>
        </div>
      </div>
    </section>
  );
}
