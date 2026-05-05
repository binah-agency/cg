import { Link } from 'react-router-dom';
import { Instagram, Facebook, Youtube, Twitter } from 'lucide-react';
import footerData from '@/data/footer.json';
import siteData from '@/data/site.json';

const iconMap: Record<string, React.ReactNode> = {
  Instagram: <Instagram className="w-5 h-5" />,
  Facebook: <Facebook className="w-5 h-5" />,
  Youtube: <Youtube className="w-5 h-5" />,
  Twitter: <Twitter className="w-5 h-5" />,
};

interface FooterItem {
  type: string;
  content?: string;
  label?: string;
  href?: string;
  icon?: string;
}

export default function Footer() {
  return (
    <footer className="bg-navy-base border-t border-gold-primary/20">
      <div className="max-container section-padding py-16 md:py-24">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12">
          {footerData.columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs uppercase tracking-[0.2em] text-white mb-4 font-sans">
                {col.title}
              </h4>
              {(col.items as FooterItem[]).map((item, idx) => {
                if (item.type === 'text' && item.content) {
                  return (
                    <p key={idx} className="text-sm text-text-secondary mt-2">
                      {item.content}
                    </p>
                  );
                }
                if (item.type === 'link' && item.label) {
                  const isExternal = item.href?.startsWith('http');
                  if (isExternal) {
                    return (
                      <a
                        key={idx}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-sm text-text-secondary hover:text-gold-primary mt-2 transition-colors"
                      >
                        {item.label}
                      </a>
                    );
                  }
                  return (
                    <Link
                      key={idx}
                      to={item.href || '#'}
                      className="block text-sm text-text-secondary hover:text-gold-primary mt-2 transition-colors"
                    >
                      {item.label}
                    </Link>
                  );
                }
                if (item.type === 'social' && item.icon) {
                  return (
                    <a
                      key={idx}
                      href={item.href || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex text-text-secondary hover:text-gold-primary mt-2 mr-4 transition-colors"
                      aria-label={item.label}
                    >
                      {iconMap[item.icon]}
                    </a>
                  );
                }
                return null;
              })}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-text-secondary/40">
            {siteData.copyright}
          </p>
          <p className="text-xs text-text-secondary/40">
            {siteData.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
}
