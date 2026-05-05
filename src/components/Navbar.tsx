import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import navigationData from '@/data/navigation.json';
import siteData from '@/data/site.json';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${
          scrolled
            ? 'bg-navy-base/90 backdrop-blur-md shadow-lg'
            : 'bg-transparent'
        }`}
        style={{ height: 80 }}
      >
        <div className="max-container h-full flex items-center justify-between section-padding">
          {/* Logo */}
          <Link
            to="/"
            className="font-serif text-white text-lg tracking-[0.2em] font-light hover:text-gold-primary transition-colors"
          >
            THE CUERVO GROUP
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navigationData.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {item.children ? (
                  <button
                    onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setActiveDropdown(activeDropdown === item.label ? null : item.label);
                      }
                    }}
                    aria-expanded={activeDropdown === item.label}
                    aria-haspopup="true"
                    className={`text-sm uppercase tracking-[0.1em] transition-colors flex items-center gap-1 ${
                      location.pathname === item.href
                        ? 'text-gold-primary'
                        : 'text-text-secondary hover:text-white'
                    }`}
                  >
                    {item.label}
                    <ChevronDown className={`w-3 h-3 transition-transform ${activeDropdown === item.label ? 'rotate-180' : ''}`} />
                  </button>
                ) : (
                  <Link
                    to={item.href}
                    className={`text-sm uppercase tracking-[0.1em] transition-colors flex items-center gap-1 ${
                      location.pathname === item.href
                        ? 'text-gold-primary'
                        : 'text-text-secondary hover:text-white'
                    }`}
                  >
                    {item.label}
                  </Link>
                )}

                {/* Dropdown */}
                {item.children && activeDropdown === item.label && (
                  <div className="absolute top-full left-0 pt-2 min-w-[220px]">
                    <div className="bg-navy-deep border border-gold-primary/20 shadow-xl py-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          to={child.href}
                          className="block px-5 py-2.5 text-sm text-text-secondary hover:text-gold-primary hover:bg-white/5 transition-all"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-6">
            <Link
              to="/management#tenant-services"
              className="text-sm uppercase tracking-[0.1em] text-gold-primary hover:text-gold-hover transition-colors"
            >
              Tenant Services
            </Link>
            <a
              href={siteData.clientLogin}
              target="_blank"
              rel="noopener noreferrer"
              className="pill-button-outline text-xs py-2.5 px-5"
            >
              Client Login
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-[320px] bg-navy-base shadow-2xl overflow-y-auto pt-24 pb-8 px-6">
            {navigationData.map((item) => (
              <div key={item.label} className="mb-4">
                {item.children ? (
                  <div>
                    <button
                      className="flex items-center justify-between w-full text-left text-white text-lg font-serif py-3 border-b border-white/10"
                      onClick={() =>
                        setActiveDropdown(
                          activeDropdown === item.label ? null : item.label
                        )
                      }
                    >
                      {item.label}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          activeDropdown === item.label ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {activeDropdown === item.label && (
                      <div className="pl-4 mt-2 space-y-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            to={child.href}
                            className="block text-text-secondary hover:text-gold-primary py-2 text-sm transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.href}
                    className="block text-white text-lg font-serif py-3 border-b border-white/10"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            <div className="mt-8 space-y-4">
              <Link
                to="/management#tenant-services"
                className="flex items-center gap-2 text-gold-primary text-sm uppercase tracking-[0.1em]"
              >
                Tenant Services <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={siteData.clientLogin}
                target="_blank"
                rel="noopener noreferrer"
                className="pill-button-primary w-full text-center"
              >
                Client Login
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
