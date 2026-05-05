import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function createWavyText(element: HTMLElement) {
  const text = element.textContent || '';
  element.innerHTML = '';
  const words = text.split(' ');
  const spans: HTMLSpanElement[] = [];

  words.forEach((word, i) => {
    const wrapper = document.createElement('span');
    wrapper.className = 'reveal-word-container';

    const inner = document.createElement('span');
    inner.className = 'reveal-word';
    inner.textContent = word;

    wrapper.appendChild(inner);
    element.appendChild(wrapper);
    spans.push(inner);

    if (i < words.length - 1) {
      element.appendChild(document.createTextNode(' '));
    }
  });

  return spans;
}

export function useWavyReveal<T extends HTMLElement>(direction: 'up' | 'down' = 'up') {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const spans = createWavyText(el);
    const yOffset = direction === 'up' ? '125%' : '-125%';

    gsap.set(spans, {
      yPercent: yOffset,
      filter: 'blur(8px)',
      opacity: 0.8,
    });

    const tween = gsap.to(spans, {
      yPercent: 0,
      filter: 'blur(0px)',
      opacity: 1,
      duration: 1.2,
      stagger: { each: 0.04, from: 'start' },
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
    };
  }, [direction]);

  return ref;
}
