import { TrendingUp, Building2, KeyRound, MapPin } from 'lucide-react';
import Modal from './Modal';
import servicesData from '@/data/services.json';
import { Link } from 'react-router-dom';

const iconMap: Record<string, React.ReactNode> = {
  TrendingUp: <TrendingUp className="w-8 h-8" />,
  Building2: <Building2 className="w-8 h-8" />,
  KeyRound: <KeyRound className="w-8 h-8" />,
  MapPin: <MapPin className="w-8 h-8" />,
};

interface ServiceModalProps {
  serviceId: string | null;
  onClose: () => void;
}

export default function ServiceModal({ serviceId, onClose }: ServiceModalProps) {
  const service = servicesData.find((s) => s.id === serviceId);
  if (!service) return null;

  return (
    <Modal isOpen={!!serviceId} onClose={onClose} title={service.title} size="lg">
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="text-gold-primary">{iconMap[service.icon]}</div>
          <p className="text-gold-primary italic">{service.tagline}</p>
        </div>

        <p className="text-text-secondary leading-relaxed">{service.description}</p>

        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] text-white mb-4">
            Services
          </h4>
          <div className="flex flex-wrap gap-2">
            {service.subServices.map((sub) => (
              <span
                key={sub}
                className="border border-gold-primary/30 text-gold-primary text-xs px-3 py-1.5 rounded-full"
              >
                {sub}
              </span>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-white/10">
          <Link
            to={service.href}
            onClick={onClose}
            className="pill-button-primary inline-flex items-center gap-2"
          >
            Explore {service.title} Services
          </Link>
        </div>
      </div>
    </Modal>
  );
}
