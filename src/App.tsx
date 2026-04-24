import { useState, useEffect } from "react";
import { MobileLayout } from "./components/layout/MobileLayout";
import { Home } from "./screens/Home";
import { Services } from "./screens/Services";
import { Booking } from "./screens/Booking";
import { More } from "./screens/More";
import { ArticlesHub } from "./screens/ArticlesHub";
import { ArticleReader } from "./screens/ArticleReader";
import { PatientPortal } from "./screens/PatientPortal";
import { LanguageSelector } from "./components/ui/LanguageSelector";
import { AuthProvider } from "./contexts/AuthContext";

type Route = 
  | { name: 'main' }
  | { name: 'articles_hub' }
  | { name: 'article_reader', id: string }
  | { name: 'portal' };

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("inicio");
  const [route, setRoute] = useState<Route>({ name: 'main' });

  // Intersection Observer to update bottom nav when scrolling
  useEffect(() => {
    if (route.name !== 'main') return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveTab(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [route.name]);
  
  const handleTabNavigate = (id: string) => {
    if (id === 'portal') {
      setRoute({ name: 'portal' });
      setActiveTab('portal');
      return;
    }

    if (route.name !== 'main') {
      setRoute({ name: 'main' });
      setActiveTab(id);
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AuthProvider>
      <div className="bg-desktop-bg min-h-screen">
         <MobileLayout 
           activeTab={route.name === 'main' ? activeTab : activeTab}
           onTabClick={handleTabNavigate}
         >
           {/* Global Language Selector (floating top right of the mobile view) */}
           <LanguageSelector />

         {route.name === 'portal' ? (
            <PatientPortal />
         ) : route.name === 'articles_hub' ? (
            <ArticlesHub 
              onBack={() => setRoute({ name: 'main' })} 
              onOpenArticle={(id) => setRoute({ name: 'article_reader', id })} 
            />
         ) : route.name === 'article_reader' ? (
            <ArticleReader 
              articleId={route.id}
              onBack={() => setRoute({ name: 'main' })} 
              onOpenArticle={(id) => setRoute({ name: 'article_reader', id })}
              onViewCatalog={() => setRoute({ name: 'articles_hub' })}
            />
         ) : (
            <>
              <section id="inicio">
                <Home 
                  onNavigate={(id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })} 
                  onOpenArticles={() => setRoute({ name: 'articles_hub' })}
                  onOpenArticle={(id) => setRoute({ name: 'article_reader', id })}
                />
              </section>
              <section id="servicios">
                <Services onNavigate={(id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })} />
              </section>
              <section id="agenda">
                <Booking />
              </section>
              <section id="articulos">
                <More 
                  onOpenArticles={() => setRoute({ name: 'articles_hub' })} 
                />
              </section>

              {/* Global Footer */}
              <footer className="bg-white border-t border-border mt-8 pt-10 pb-16 px-6 text-center">
                 <div className="w-12 h-12 rounded-full bg-primary mx-auto mb-4 flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                       <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4Z" fill="white" opacity="0.3"/>
                       <path d="M12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6ZM12 8C14.2091 8 16 9.79086 16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8Z" fill="white"/>
                    </svg>
                 </div>
                 <h2 className="font-bold text-text-main text-lg mb-1">Liminal Space</h2>
                 <p className="text-[10px] uppercase tracking-wider font-semibold text-text-muted mb-6">Psychology</p>

                 <p className="text-xs text-text-muted leading-relaxed mb-6 max-w-xs mx-auto">
                    Atención psicológica 100% online especializada para hispanohablantes alrededor del mundo.
                 </p>

                 <div className="flex justify-center gap-4 text-xs font-medium text-text-muted">
                    <a href="#" className="hover:text-primary transition-colors">Instagram</a>
                    <a href="#" className="hover:text-primary transition-colors">LinkedIn</a>
                    <a href="#" className="hover:text-primary transition-colors">Términos</a>
                 </div>
                 <div className="mt-8 text-[10px] text-text-muted/60">
                    &copy; {new Date().getFullYear()} Liminal Space Psychology.
                 </div>
              </footer>
            </>
         )}
         </MobileLayout>
      </div>
    </AuthProvider>
  );
}
