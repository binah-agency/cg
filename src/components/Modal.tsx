import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'md' | 'lg' | 'xl';
}

export default function Modal({ isOpen, onClose, title, children, size = 'md' }: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  return createPortal(
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      onClick={(e) => e.target === overlayRef.current && onClose()}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-navy-base/70 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className={`relative bg-navy-deep border border-gold-primary/20 w-full ${sizeClasses[size]} max-h-[90vh] overflow-y-auto shadow-2xl`}
        style={{
          animation: 'modalIn 280ms ease-out forwards',
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-text-secondary hover:text-white transition-colors z-10"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>

        {title && (
          <div className="px-8 pt-8 pb-4">
            <h2 className="font-serif text-2xl md:text-3xl text-white">{title}</h2>
          </div>
        )}

        <div className="px-8 pb-8">{children}</div>
      </div>

      <style>{`
        @keyframes modalIn {
          from {
            opacity: 0;
            transform: scale(0.96);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>,
    document.body
  );
}
