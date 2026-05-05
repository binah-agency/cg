import { useState, useEffect, useRef } from 'react';
import { MessageSquare, Phone, Building, LogIn, X, Send, ExternalLink } from 'lucide-react';

const tabs = [
  { id: 'chat', label: 'AI Assistant', icon: MessageSquare },
  { id: 'contact', label: 'Contact', icon: Phone },
  { id: 'properties', label: 'Listings', icon: Building },
  { id: 'portal', label: 'Client Portal', icon: LogIn },
];

const suggestedPrompts = [
  'What investment services does CG offer?',
  'How does CG handle REO properties?',
  'Does CG work with foreign national investors?',
  'What property management services are available?',
];

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([
    {
      role: 'assistant',
      text: 'Welcome to The Cuervo Group. I am your AI assistant. How can I help you with our real estate services today?',
    },
  ]);
  const [input, setInput] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && chatRef.current) {
      chatRef.current.focus();
    }
  }, [isOpen]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: 'Thank you for your inquiry. A member of our team will review your message and get back to you shortly. You may also contact us directly at our office or use the Client Portal for account-specific inquiries.',
        },
      ]);
    }, 1000);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => {
      alert('Thank you for your inquiry. We will contact you shortly.');
      setFormData({ name: '', email: '', phone: '', service: '', message: '' });
    }, 500);
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
          isOpen
            ? 'bg-navy-deep border border-gold-primary/30'
            : 'bg-gold-primary hover:bg-gold-hover'
        }`}
        aria-label="Toggle chat"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageSquare className="w-6 h-6 text-navy-base" />
        )}
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div
          ref={chatRef}
          tabIndex={-1}
          role="dialog"
          aria-label="Chat widget"
          className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] h-[520px] bg-navy-deep border border-gold-primary/20 shadow-2xl flex flex-col outline-none"
        >
          {/* Tabs */}
          <div className="flex border-b border-white/10">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-xs uppercase tracking-wider transition-colors ${
                    activeTab === tab.id
                      ? 'text-gold-primary border-b-2 border-gold-primary'
                      : 'text-text-secondary hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {activeTab === 'chat' && (
              <div className="flex flex-col h-full">
                <div className="flex-1 space-y-4 mb-4">
                  {messages.map((msg, i) => (
                    <div
                      key={i}
                      className={`p-3 text-sm ${
                        msg.role === 'user'
                          ? 'bg-gold-primary/10 text-white ml-8'
                          : 'bg-white/5 text-text-secondary mr-8'
                      }`}
                    >
                      {msg.text}
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2">
                    {suggestedPrompts.map((prompt) => (
                      <button
                        key={prompt}
                        onClick={() => {
                          setInput(prompt);
                        }}
                        className="text-xs text-gold-primary border border-gold-primary/20 px-2 py-1 hover:bg-gold-primary/10 transition-colors"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                      placeholder="Ask about our services..."
                      className="flex-1 bg-white/5 border border-white/10 text-white text-sm px-3 py-2 placeholder:text-text-secondary/50 focus:outline-none focus:border-gold-primary/40"
                    />
                    <button
                      onClick={handleSend}
                      className="bg-gold-primary text-navy-base p-2 hover:bg-gold-hover transition-colors"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'contact' && (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <h3 className="text-white font-serif text-lg">Contact Us</h3>
                <input
                  type="text"
                  placeholder="Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 text-white text-sm px-3 py-2 placeholder:text-text-secondary/50 focus:outline-none focus:border-gold-primary/40"
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 text-white text-sm px-3 py-2 placeholder:text-text-secondary/50 focus:outline-none focus:border-gold-primary/40"
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 text-white text-sm px-3 py-2 placeholder:text-text-secondary/50 focus:outline-none focus:border-gold-primary/40"
                />
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 text-white text-sm px-3 py-2 focus:outline-none focus:border-gold-primary/40"
                >
                  <option value="" className="bg-navy-deep">Service Interest</option>
                  <option value="investment" className="bg-navy-deep">Investment</option>
                  <option value="development" className="bg-navy-deep">Development</option>
                  <option value="management" className="bg-navy-deep">Management</option>
                  <option value="properties" className="bg-navy-deep">Properties</option>
                </select>
                <textarea
                  placeholder="Message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 text-white text-sm px-3 py-2 placeholder:text-text-secondary/50 focus:outline-none focus:border-gold-primary/40 resize-none"
                />
                <button type="submit" className="pill-button-primary w-full">
                  Submit Inquiry
                </button>
              </form>
            )}

            {activeTab === 'properties' && (
              <div className="space-y-4">
                <h3 className="text-white font-serif text-lg">Property Listings</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { type: 'Commercial', loc: 'Downtown Miami', status: 'Available' },
                    { type: 'Residential', loc: 'Miami Beach', status: 'Leased' },
                    { type: 'Retail', loc: 'Coral Gables', status: 'Available' },
                    { type: 'Office', loc: 'Brickell', status: 'Available' },
                  ].map((prop, i) => (
                    <div
                      key={i}
                      className="bg-white/5 border border-white/10 p-3 hover:border-gold-primary/30 transition-colors cursor-pointer"
                    >
                      <p className="text-xs text-gold-primary uppercase">{prop.type}</p>
                      <p className="text-sm text-white mt-1">{prop.loc}</p>
                      <p className="text-xs text-text-secondary mt-1">{prop.status}</p>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-text-secondary text-center">
                  Contact us for full portfolio access
                </p>
              </div>
            )}

            {activeTab === 'portal' && (
              <div className="space-y-6 text-center py-8">
                <LogIn className="w-12 h-12 text-gold-primary mx-auto" />
                <h3 className="text-white font-serif text-xl">Client Portal</h3>
                <p className="text-text-secondary text-sm">
                  Access your account, view statements, make payments, and manage your properties.
                </p>
                <a
                  href="https://tgcg.twa.rentmanager.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pill-button-primary inline-flex items-center gap-2"
                >
                  Access Portal <ExternalLink className="w-4 h-4" />
                </a>
                <div className="pt-4 border-t border-white/10">
                  <p className="text-xs text-text-secondary">
                    For portal support, contact us at info@cuervogroup.com
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
