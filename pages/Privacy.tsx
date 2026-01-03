import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Menu, Shield, Database, Eye, Trash2 } from 'lucide-react';

interface PrivacyProps {
  onMenuClick: () => void;
}

const Privacy: React.FC<PrivacyProps> = ({ onMenuClick }) => {
  const navigate = useNavigate();

  const highlights = [
    {
      icon: <Database size={20} className="text-apple-blue" />,
      title: "Local Storage Only",
      description: "All your data stays in your browser"
    },
    {
      icon: <Eye size={20} className="text-apple-success" />,
      title: "No Tracking",
      description: "We don't use cookies or analytics"
    },
    {
      icon: <Shield size={20} className="text-purple-500" />,
      title: "No Account Required",
      description: "No personal information collected"
    },
    {
      icon: <Trash2 size={20} className="text-apple-danger" />,
      title: "Easy Deletion",
      description: "Clear browser data to remove everything"
    }
  ];

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
          Privacy Policy
        </h2>

        <div className="w-20" />
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-6 py-12 space-y-8">
          {/* Privacy Highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {highlights.map((item, i) => (
              <div key={i} className="bg-white dark:bg-[#1E1E1E] rounded-2xl p-4 border border-black/5 dark:border-white/10 shadow-sm text-center">
                <div className="w-10 h-10 bg-black/[0.03] dark:bg-white/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                  {item.icon}
                </div>
                <h3 className="font-bold text-sm text-apple-darkGray dark:text-white">{item.title}</h3>
                <p className="text-xs text-apple-gray dark:text-[#A1A1A6] mt-1">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-white dark:bg-[#1E1E1E] rounded-3xl p-8 md:p-10 border border-black/5 dark:border-white/10 shadow-sm space-y-8">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-apple-darkGray dark:text-white">Privacy Policy</h1>
              <p className="text-apple-gray dark:text-[#A1A1A6]">Last updated: January 2025</p>
            </div>

            <div className="space-y-6 text-apple-gray dark:text-[#A1A1A6] leading-relaxed">
              <section className="space-y-3">
                <h2 className="text-xl font-bold text-apple-darkGray dark:text-white">Our Privacy Commitment</h2>
                <p>
                  Stepwise is built with privacy as a core principle. We believe your learning journey is personal,
                  and your data should stay that way. This policy explains how we handle (or rather, don't handle)
                  your information.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-bold text-apple-darkGray dark:text-white">Data We Don't Collect</h2>
                <p>Stepwise does not collect:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Personal information (name, email, phone number)</li>
                  <li>Account credentials (we don't have accounts)</li>
                  <li>Browsing history or behavior analytics</li>
                  <li>Device fingerprints or identifiers</li>
                  <li>Location data</li>
                  <li>Third-party tracking cookies</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-bold text-apple-darkGray dark:text-white">Data Stored Locally</h2>
                <p>
                  The following data is stored in your browser's local storage (on your device only):
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Settings:</strong> Your preferences for theme, decimal notation, and math display methods</li>
                  <li><strong>Solver History:</strong> Recent math problems you've solved (up to 20 entries)</li>
                  <li><strong>Flashcards:</strong> Your spaced repetition cards and learning progress</li>
                  <li><strong>Onboarding Status:</strong> Whether you've completed the welcome tour</li>
                </ul>
                <p className="text-sm bg-apple-blue/5 dark:bg-apple-blue/10 p-4 rounded-xl border border-apple-blue/10">
                  This data never leaves your device. To delete it, simply clear your browser's local storage or site data for Stepwise.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-bold text-apple-darkGray dark:text-white">AI Processing</h2>
                <p>
                  When you use the AI solver feature, your math problems are sent to Google's Gemini API for processing.
                  This is necessary to generate step-by-step solutions. Google processes this data according to their
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-apple-blue hover:underline ml-1">
                    privacy policy
                  </a>.
                </p>
                <p>
                  The problems you submit are used only to generate your solution and are not stored by us.
                  Camera images used for problem scanning are processed temporarily and not retained.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-bold text-apple-darkGray dark:text-white">Third-Party Services</h2>
                <p>Stepwise uses minimal third-party services:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Google Gemini API:</strong> For AI-powered math solving</li>
                  <li><strong>Google Fonts:</strong> For typography (JetBrains Mono for code display)</li>
                  <li><strong>KaTeX CDN:</strong> For mathematical notation rendering</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-bold text-apple-darkGray dark:text-white">Your Rights</h2>
                <p>
                  Since we don't collect personal data, there's nothing to request, correct, or delete from our servers.
                  You have full control over your local data through your browser settings.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-bold text-apple-darkGray dark:text-white">Children's Privacy</h2>
                <p>
                  Stepwise is designed to be safe for users of all ages. We do not knowingly collect
                  any personal information from children or adults. The service is educational in nature
                  and contains no mature content.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-bold text-apple-darkGray dark:text-white">Policy Updates</h2>
                <p>
                  If we make changes to this policy, we'll update the "Last updated" date above.
                  Our commitment to privacy-first design will remain unchanged.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-bold text-apple-darkGray dark:text-white">Contact</h2>
                <p>
                  Questions about our privacy practices? We'd love to hear from you.
                  Reach out through our contact page.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
