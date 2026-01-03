import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Menu, Mail, MessageSquare, Bug, Lightbulb, Send, CheckCircle2 } from 'lucide-react';

interface ContactProps {
  onMenuClick: () => void;
}

const Contact: React.FC<ContactProps> = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    type: 'feedback',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const contactTypes = [
    { id: 'feedback', label: 'Feedback', icon: <MessageSquare size={18} /> },
    { id: 'bug', label: 'Bug Report', icon: <Bug size={18} /> },
    { id: 'feature', label: 'Feature Request', icon: <Lightbulb size={18} /> },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.message.trim()) return;

    // Store feedback locally (in production, this would go to a backend)
    const feedback = {
      type: formData.type,
      message: formData.message,
      timestamp: Date.now(),
      userAgent: navigator.userAgent
    };

    // Store in localStorage for demo purposes
    const existingFeedback = JSON.parse(localStorage.getItem('stepwise_feedback') || '[]');
    existingFeedback.push(feedback);
    localStorage.setItem('stepwise_feedback', JSON.stringify(existingFeedback));

    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="flex-1 flex flex-col h-full bg-[#F2F2F7] dark:bg-[#121212] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-white/70 dark:bg-[#1E1E1E]/70 backdrop-blur-2xl border-b border-black/[0.05] dark:border-white/10 sticky top-0 z-40">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => navigate(-1)}
              className="p-2.5 text-apple-blue hover:bg-apple-blue/5 rounded-full transition-all flex items-center space-x-1 group"
            >
              <ChevronLeft size={24} strokeWidth={2.5} className="group-active:-translate-x-1 transition-transform" />
              <span className="font-bold text-[17px] hidden sm:inline">Back</span>
            </button>
          </div>
          <h2 className="font-extrabold text-[18px] text-apple-darkGray dark:text-white tracking-tight">Contact</h2>
          <div className="w-20" />
        </div>

        <div className="flex-1 flex items-center justify-center p-6">
          <div className="max-w-md w-full text-center space-y-6 animate-in zoom-in duration-300">
            <div className="w-20 h-20 bg-apple-success/10 rounded-3xl flex items-center justify-center mx-auto">
              <CheckCircle2 size={40} className="text-apple-success" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-apple-darkGray dark:text-white">Thank you!</h2>
              <p className="text-apple-gray dark:text-[#A1A1A6]">
                Your message has been saved. We appreciate your feedback and will use it to improve Stepwise.
              </p>
            </div>
            <button
              onClick={() => navigate('/')}
              className="px-8 py-3 bg-apple-blue text-white rounded-xl font-bold hover:bg-blue-600 transition-colors"
            >
              Back to App
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-[#F2F2F7] dark:bg-[#121212] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-white/70 dark:bg-[#1E1E1E]/70 backdrop-blur-2xl border-b border-black/[0.05] dark:border-white/10 sticky top-0 z-40">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => navigate(-1)}
            className="p-2.5 text-apple-blue hover:bg-apple-blue/5 rounded-full transition-all flex items-center space-x-1 group"
          >
            <ChevronLeft size={24} strokeWidth={2.5} className="group-active:-translate-x-1 transition-transform" />
            <span className="font-bold text-[17px] hidden sm:inline">Back</span>
          </button>

          <div className="h-6 w-px bg-black/[0.08] mx-2 hidden md:block" />

          <button onClick={onMenuClick} className="p-2.5 text-apple-darkGray dark:text-white hover:bg-black/5 rounded-full transition-colors md:hidden">
            <Menu size={22} strokeWidth={2.5} />
          </button>
        </div>

        <h2 className="font-extrabold text-[18px] text-apple-darkGray dark:text-white tracking-tight">
          Contact
        </h2>

        <div className="w-20" />
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-xl mx-auto px-6 py-12 space-y-8">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 bg-apple-blue/10 rounded-2xl flex items-center justify-center mx-auto">
              <Mail size={32} className="text-apple-blue" />
            </div>
            <h1 className="text-3xl font-bold text-apple-darkGray dark:text-white tracking-tight">
              Get in Touch
            </h1>
            <p className="text-apple-gray dark:text-[#A1A1A6]">
              We'd love to hear from you. Share feedback, report bugs, or suggest features.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Message Type Selection */}
            <div className="space-y-3">
              <label className="block text-sm font-bold text-apple-gray dark:text-[#A1A1A6] uppercase tracking-wider">
                What's this about?
              </label>
              <div className="grid grid-cols-3 gap-3">
                {contactTypes.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, type: type.id })}
                    className={`flex flex-col items-center space-y-2 p-4 rounded-2xl border-2 transition-all ${
                      formData.type === type.id
                        ? 'border-apple-blue bg-apple-blue/5 dark:bg-apple-blue/10'
                        : 'border-black/5 dark:border-white/10 bg-white dark:bg-[#1E1E1E] hover:border-black/10 dark:hover:border-white/20'
                    }`}
                  >
                    <div className={`${formData.type === type.id ? 'text-apple-blue' : 'text-apple-gray'}`}>
                      {type.icon}
                    </div>
                    <span className={`text-sm font-bold ${
                      formData.type === type.id ? 'text-apple-blue' : 'text-apple-darkGray dark:text-white'
                    }`}>
                      {type.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Message */}
            <div className="space-y-3">
              <label className="block text-sm font-bold text-apple-gray dark:text-[#A1A1A6] uppercase tracking-wider">
                Your Message
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell us what's on your mind..."
                rows={6}
                className="w-full bg-white dark:bg-[#1E1E1E] border border-black/5 dark:border-white/10 rounded-2xl p-4 text-apple-darkGray dark:text-white placeholder-apple-gray/50 resize-none focus:outline-none focus:ring-2 focus:ring-apple-blue/20 focus:border-apple-blue transition-all"
                required
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={!formData.message.trim()}
              className="w-full flex items-center justify-center space-x-2 py-4 bg-apple-blue text-white rounded-2xl font-bold hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-apple-blue/20"
            >
              <Send size={18} />
              <span>Send Message</span>
            </button>

            <p className="text-center text-sm text-apple-gray dark:text-[#A1A1A6]">
              Your message is saved locally. No personal data is collected.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
