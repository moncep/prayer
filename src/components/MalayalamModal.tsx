import React from 'react';
import { X, Languages, Sparkles, CheckCircle2, Clock } from 'lucide-react';

interface MalayalamModalProps {
  onClose: () => void;
}

export const MalayalamModal: React.FC<MalayalamModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4 transition-page">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-stone-200 overflow-hidden">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-amber-900 via-stone-900 to-amber-950 p-6 text-amber-50 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-300 mb-1">
            <Languages className="w-4 h-4" />
            <span>Bilingual Prayer Architecture</span>
          </div>
          <h2 className="font-heading text-xl sm:text-2xl font-bold">
            മലയാളം പ്രാർത്ഥനകൾ (Malayalam)
          </h2>
          <p className="text-xs text-amber-200/80 mt-1 font-prayer">
            Phased rollout: English prayers active in Phase 1; Malayalam prayers slated for Phase 2.
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4">
          <div className="bg-amber-50/80 rounded-2xl p-4 border border-amber-200/70">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-stone-900 text-sm">Phase 1: English Prayers Complete</h4>
                <p className="text-xs text-stone-600 mt-0.5">
                  All 273 English prayers, 18 categories, interactive 53-bead Rosary counter, and multi-day novenas are active and ready to pray.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200/80">
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-stone-900 text-sm">Phase 2: Malayalam Prayers Ingestion</h4>
                <p className="text-xs text-stone-600 mt-0.5 mb-2">
                  Your <code className="bg-stone-200 px-1 py-0.5 rounded text-[11px]">MalBackup.zip</code> contains:
                </p>
                <ul className="text-xs text-stone-700 space-y-1 pl-2">
                  <li>• <strong>342+ Malayalam prayers</strong> across 23 sacred categories</li>
                  <li>• <strong>വേദപാഠം</strong> (Catechism) & <strong>അനുദിന പ്രാർത്ഥനകൾ</strong> (Daily Prayers)</li>
                  <li>• <strong>വിശുദ്ധ ജപമാല</strong> (Malayalam Holy Rosary)</li>
                  <li>• <strong>വണക്കമാസം</strong> (Vanakkamasam) & <strong>സുകൃതങ്ങൾ</strong> (Daily Virtues)</li>
                  <li>• Malayalam typography rendering via <em>Noto Serif Malayalam</em> font</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-full bg-amber-900 text-white font-semibold text-xs hover:bg-amber-800 transition-colors shadow-md"
            >
              Continue Praying in English
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
