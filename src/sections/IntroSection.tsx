import { useWavyReveal } from '@/hooks/useWavyReveal';

export default function IntroSection() {
  const para1Ref = useWavyReveal<HTMLParagraphElement>('up');
  const para2Ref = useWavyReveal<HTMLParagraphElement>('up');

  return (
    <section className="bg-cream py-32 md:py-40">
      <div className="max-w-[800px] mx-auto px-6 text-center">
        <p
          ref={para1Ref}
          className="font-serif text-2xl md:text-3xl italic text-navy-base leading-relaxed"
        >
          The Cuervo Group provides our clients and partners with seasoned expertise in commercial and residential real estate investment, development, property management, sales, leasing, and marketing.
        </p>
        <p
          ref={para2Ref}
          className="font-serif text-xl md:text-2xl italic text-navy-base/80 leading-relaxed mt-8"
        >
          With the vision to identify strategic opportunities amidst current market conditions, as well as the experience, knowledge, and key relationships to execute plans effectively, we play an essential role in the success of our clients and partners.
        </p>
      </div>
    </section>
  );
}
