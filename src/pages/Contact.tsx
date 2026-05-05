import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import siteData from '@/data/site.json';

export default function Contact() {
  const pageRef = useRef<HTMLElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    clientType: '',
    service: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const elements = page.querySelectorAll('.contact-reveal');
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        clientType: '',
        service: '',
        message: '',
      });
    }, 500);
  };

  return (
    <main ref={pageRef} className="pt-20">
      {/* Hero */}
      <section className="bg-navy-base py-24 md:py-32">
        <div className="max-container section-padding">
          <p className="contact-reveal text-xs uppercase tracking-[0.2em] text-gold-primary mb-4">
            Contact
          </p>
          <h1 className="contact-reveal font-serif text-4xl md:text-5xl text-white max-w-3xl leading-tight">
            Get in Touch
          </h1>
          <p className="contact-reveal text-text-secondary mt-6 max-w-2xl">
            Whether you are an investor, property owner, developer, tenant, or financial institution, we are ready to assist you with your real estate needs.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="bg-white py-24 md:py-32">
        <div className="max-container section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            {/* Form */}
            <div className="lg:col-span-3">
              {submitted ? (
                <div className="contact-reveal bg-navy-deep border border-gold-primary/20 p-12 text-center">
                  <h3 className="font-serif text-2xl text-white">Thank You</h3>
                  <p className="text-text-secondary mt-4">
                    Your inquiry has been submitted. A member of our team will contact you shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="pill-button-outline mt-6"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-reveal space-y-6">
                  <h2 className="font-serif text-2xl text-navy-base mb-8">Send Us a Message</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input
                      type="text"
                      placeholder="Full Name *"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full border border-gray-300 px-4 py-3 text-navy-base placeholder:text-gray-400 focus:outline-none focus:border-gold-primary transition-colors"
                    />
                    <input
                      type="email"
                      placeholder="Email Address *"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full border border-gray-300 px-4 py-3 text-navy-base placeholder:text-gray-400 focus:outline-none focus:border-gold-primary transition-colors"
                    />
                  </div>

                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full border border-gray-300 px-4 py-3 text-navy-base placeholder:text-gray-400 focus:outline-none focus:border-gold-primary transition-colors"
                  />

                  <select
                    value={formData.clientType}
                    onChange={(e) => setFormData({ ...formData, clientType: e.target.value })}
                    className="w-full border border-gray-300 px-4 py-3 text-navy-base focus:outline-none focus:border-gold-primary transition-colors bg-white"
                  >
                    <option value="">I am a...</option>
                    <option value="investor">Investor</option>
                    <option value="owner">Property Owner</option>
                    <option value="tenant">Tenant</option>
                    <option value="developer">Developer</option>
                    <option value="bank">Bank / Financial Institution</option>
                  </select>

                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full border border-gray-300 px-4 py-3 text-navy-base focus:outline-none focus:border-gold-primary transition-colors bg-white"
                  >
                    <option value="">Service Interest</option>
                    <option value="investment">Investment</option>
                    <option value="development">Development</option>
                    <option value="management">Management</option>
                    <option value="properties">Properties</option>
                    <option value="reo">REO & Receiverships</option>
                  </select>

                  <textarea
                    placeholder="Your Message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full border border-gray-300 px-4 py-3 text-navy-base placeholder:text-gray-400 focus:outline-none focus:border-gold-primary transition-colors resize-none"
                  />

                  <button type="submit" className="pill-button-primary inline-flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    Submit Inquiry
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-8">
              <div className="contact-reveal">
                <h3 className="font-serif text-xl text-navy-base mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-5 h-5 text-gold-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-navy-base font-medium">Location</p>
                      <p className="text-gray-500 text-sm">{siteData.location}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Phone className="w-5 h-5 text-gold-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-navy-base font-medium">Phone</p>
                      <p className="text-gray-500 text-sm">(305) 555-0100</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Mail className="w-5 h-5 text-gold-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-navy-base font-medium">Email</p>
                      <p className="text-gray-500 text-sm">info@cuervogroup.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Clock className="w-5 h-5 text-gold-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-navy-base font-medium">Business Hours</p>
                      <p className="text-gray-500 text-sm">Mon - Fri: 9:00 AM - 6:00 PM EST</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="contact-reveal bg-navy-deep p-8">
                <h3 className="font-serif text-lg text-white mb-4">Client Portal</h3>
                <p className="text-text-secondary text-sm mb-6">
                  Existing clients can access their accounts, view statements, and make payments through our secure portal.
                </p>
                <a
                  href={siteData.clientLogin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pill-button-primary text-xs w-full text-center"
                >
                  Access Client Portal
                </a>
              </div>

              <div className="contact-reveal bg-cream p-8">
                <h3 className="font-serif text-lg text-navy-base mb-4">Tenant Services</h3>
                <p className="text-gray-500 text-sm mb-4">
                  For maintenance requests, rent payments, and other tenant services.
                </p>
                <a href="#" className="text-gold-primary text-sm uppercase tracking-[0.1em] hover:text-navy-base transition-colors">
                  Tenant Portal →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
