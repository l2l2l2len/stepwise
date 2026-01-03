import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Menu } from 'lucide-react';

interface TermsProps {
  onMenuClick: () => void;
}

const Terms: React.FC<TermsProps> = ({ onMenuClick }) => {
  const navigate = useNavigate();

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
          Terms of Service
        </h2>

        <div className="w-20" />
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-6 py-12">
          <div className="bg-white dark:bg-[#1E1E1E] rounded-3xl p-8 md:p-10 border border-black/5 dark:border-white/10 shadow-sm space-y-8">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-apple-darkGray dark:text-white">Terms of Service</h1>
              <p className="text-apple-gray dark:text-[#A1A1A6]">Last updated: January 2025</p>
            </div>

            <div className="space-y-6 text-apple-gray dark:text-[#A1A1A6] leading-relaxed">
              <section className="space-y-3">
                <h2 className="text-xl font-bold text-apple-darkGray dark:text-white">1. Acceptance of Terms</h2>
                <p>
                  By accessing and using Stepwise, you agree to be bound by these Terms of Service.
                  Stepwise is a free, educational math tool designed to help users understand mathematical concepts.
                  If you do not agree to these terms, please do not use the service.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-bold text-apple-darkGray dark:text-white">2. Description of Service</h2>
                <p>
                  Stepwise provides AI-powered math problem solving, a scientific calculator, and spaced repetition
                  flashcards. The service is provided free of charge and requires no account registration.
                  All user data is stored locally in your browser.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-bold text-apple-darkGray dark:text-white">3. User Responsibilities</h2>
                <p>You agree to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Use the service for lawful, educational purposes only</li>
                  <li>Not attempt to reverse engineer, hack, or disrupt the service</li>
                  <li>Not use the service to cheat on academic assessments where prohibited</li>
                  <li>Verify important calculations independently when accuracy is critical</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-bold text-apple-darkGray dark:text-white">4. Educational Use Disclaimer</h2>
                <p>
                  Stepwise is designed as a learning aid to help you understand mathematical concepts.
                  While we strive for accuracy, AI-generated solutions may occasionally contain errors.
                  Always verify solutions for critical applications. The service should complement, not replace,
                  formal mathematics education.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-bold text-apple-darkGray dark:text-white">5. Intellectual Property</h2>
                <p>
                  The Stepwise name, logo, and all original content are protected intellectual property.
                  The solutions generated for your problems are yours to use for personal and educational purposes.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-bold text-apple-darkGray dark:text-white">6. Limitation of Liability</h2>
                <p>
                  Stepwise is provided "as is" without warranties of any kind. We are not liable for any damages
                  arising from the use of the service, including but not limited to academic consequences,
                  incorrect calculations, or data loss.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-bold text-apple-darkGray dark:text-white">7. Service Availability</h2>
                <p>
                  We strive to keep Stepwise available at all times, but cannot guarantee uninterrupted service.
                  AI features require an internet connection. Calculator and flashcard features work offline
                  once the page is loaded.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-bold text-apple-darkGray dark:text-white">8. Changes to Terms</h2>
                <p>
                  We may update these terms periodically. Continued use of the service after changes
                  constitutes acceptance of the new terms. We encourage you to review this page periodically.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-bold text-apple-darkGray dark:text-white">9. Contact</h2>
                <p>
                  If you have questions about these terms, please reach out through our contact page.
                  We value your feedback and are committed to maintaining a positive learning environment.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
