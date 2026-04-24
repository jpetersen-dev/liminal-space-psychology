import { ReactNode } from "react";
import { Home, Calendar as CalendarIcon, Briefcase, Search, User } from "lucide-react";
import { ChatWidget } from "../ChatWidget";

interface MobileLayoutProps {
  children: ReactNode;
  activeTab: string;
  onTabClick?: (id: string) => void;
}

export function MobileLayout({ children, activeTab, onTabClick }: MobileLayoutProps) {
  const tabs = [
    { id: "inicio", icon: Home, label: "Inicio" },
    { id: "servicios", icon: Briefcase, label: "Servicios" },
    { id: "agenda", icon: CalendarIcon, label: "Agenda" },
    { id: "articulos", icon: Search, label: "Descubre" },
    { id: "portal", icon: User, label: "Portal" },
  ];

  const handleTabClick = (id: string) => {
    if (onTabClick) {
      onTabClick(id);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <div className="w-full sm:max-w-xl mx-auto h-[100dvh] bg-app-bg sm:border-x sm:border-border sm:shadow-2xl relative flex flex-col font-sans overflow-hidden">
      {/* Content Area - continuous scroll */}
      <main className="flex-1 overflow-y-auto no-scrollbar scroll-smooth pb-24" id="main-scroll">
        {children}
      </main>

      {/* Floating Chat Widget */}
      <ChatWidget />

      {/* Bottom Navigation */}
      <nav className="absolute bottom-0 w-full h-16 sm:h-20 bg-white/95 backdrop-blur-md border-t border-border flex justify-around items-center px-4 z-50">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`flex flex-col items-center transition-all duration-300 ${
                isActive ? "text-primary scale-110" : "text-text-muted hover:text-primary/70"
              }`}
            >
              <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[9px] mt-1 font-medium">
                {tab.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
