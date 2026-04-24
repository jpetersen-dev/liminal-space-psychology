import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Globe, Check } from "lucide-react";
import { cn } from "../../lib/utils";

const LANGUAGES = [
  { code: "es", label: "ES", name: "Español" },
  { code: "de-CH", label: "DE", name: "Deutsch (CH)" },
  { code: "fr-CH", label: "FR", name: "Français (CH)" },
  { code: "it-CH", label: "IT", name: "Italiano (CH)" },
  { code: "en", label: "EN", name: "English" },
];

export function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(LANGUAGES[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="absolute top-6 right-6 z-50" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-white/80 backdrop-blur-md shadow-sm border border-border px-3 py-2 rounded-full text-text-main hover:bg-white transition-colors"
      >
        <Globe size={16} className="text-primary" />
        <span className="text-xs font-bold">{selected.label}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-lg border border-border overflow-hidden min-w-[140px]"
          >
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setSelected(lang);
                  setIsOpen(false);
                }}
                className={cn(
                  "w-full flex items-center justify-between px-4 py-3 text-sm transition-colors",
                  selected.code === lang.code ? "bg-primary-light/50 text-primary font-semibold" : "text-text-main hover:bg-gray-50"
                )}
              >
                <span>{lang.name}</span>
                {selected.code === lang.code && <Check size={14} />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
