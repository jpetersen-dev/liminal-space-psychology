import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, BookOpen, ChevronDown, ChevronUp } from "lucide-react";
import { therapists, articles } from "../data";
import { Button } from "../components/ui/Button";

interface HomeProps {
  onNavigate: (tab: string) => void;
  onOpenArticles?: () => void;
  onOpenArticle?: (id: string) => void;
}

export function Home({ onNavigate, onOpenArticles, onOpenArticle }: HomeProps) {
  // Take only the first 2 articles for the preview
  const recentArticles = articles.slice(0, 2);
  const [expandedTherapistId, setExpandedTherapistId] = useState<string | null>(null);

  return (
    <div className="flex flex-col">
      {/* Header / Hero */}
      <div className="relative pt-24 pb-12 rounded-b-[2.5rem] shadow-sm overflow-hidden text-center mx-2 mt-2">
        {/* Background Image */}
        <div 
           className="absolute inset-0 z-0 opacity-40 bg-cover bg-center"
           style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80&fit=crop")' }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-white/10 z-0"></div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 px-6"
        >
          <div className="w-16 h-16 rounded-full bg-primary mx-auto mb-4 flex items-center justify-center shadow-lg">
             {/* Logo Mockup */}
             <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4Z" fill="white" opacity="0.3"/>
                <path d="M12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6ZM12 8C14.2091 8 16 9.79086 16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8Z" fill="white"/>
             </svg>
          </div>
          <h1 className="text-3xl font-bold text-text-main mb-3 leading-tight">
            Liminal Space<br/>Psychology
          </h1>
          <p className="text-text-muted text-sm leading-relaxed mb-6 px-4">
            Construyendo bienestar sin fronteras. Apoyo psicológico 100% online para hispanohablantes en Europa y Australia.
          </p>
          <Button onClick={() => onNavigate("agenda")} size="lg">
            Agendar Consulta
          </Button>
        </motion.div>
      </div>

      <div className="px-8 py-10 border-b border-border text-center bg-white">
         <h2 className="text-xl font-bold text-text-main mb-3">
           Tu espacio, estés donde estés
         </h2>
         <p className="text-sm text-text-muted leading-relaxed font-serif italic text-primary/80 mb-4 text-balance">
           "La sanación no ocurre de la noche a la mañana. Ocurre en el espacio intermedio, donde dejas ir quién eras, para descubrir quién puedes llegar a ser en un nuevo destino."
         </p>
         <p className="text-xs text-text-muted leading-relaxed">
           Especializados en expatriados e inmigrantes latinos. Te acompañamos desde Suiza, España, Australia o donde sea que te encuentres cruzando tu propio umbral.
         </p>
      </div>

      {/* Professionals List */}
      <div className="px-6 pt-8 pb-8 border-b border-border">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-text-header">Equipo Destacado</h2>
        </div>

        <div className="space-y-4">
          {therapists.map((t, idx) => {
            const isExpanded = expandedTherapistId === t.id;
            
            return (
              <motion.div 
                key={t.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden"
              >
                <div 
                  onClick={() => setExpandedTherapistId(isExpanded ? null : t.id)}
                  className="p-4 flex gap-4 items-center hover:bg-primary-light/30 transition-colors cursor-pointer"
                >
                  <div className="w-16 h-16 rounded-xl bg-secondary overflow-hidden shrink-0 shadow-sm border border-border">
                     <img src={t.imageUrl} alt={t.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm text-text-main">{t.name}</h3>
                    <p className="text-xs text-text-muted mt-1">{t.role}</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-surface-active flex items-center justify-center text-text-muted shrink-0 transition-colors">
                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </div>
                
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="px-4 pb-5 pt-1 border-t border-border/50 bg-primary-light/10"
                    >
                       <p className="text-sm text-text-muted leading-relaxed mb-4 mt-2">
                         {t.bio}
                       </p>
                       <Button onClick={() => onNavigate("agenda")} variant="default" className="w-full gap-2 py-2.5 shadow-sm text-xs">
                          Agendar con {t.name.split(' ')[0]} <ArrowRight size={14} />
                       </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Articles Sneak Peak */}
      <div className="px-6 pt-8 pb-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-text-header">Últimos Artículos</h2>
          <button onClick={onOpenArticles} className="text-primary text-xs font-semibold uppercase tracking-wider flex items-center gap-1 hover:text-primary/70 transition-colors">
            Ver Todos
          </button>
        </div>

        <div className="space-y-4">
          {recentArticles.map((article, idx) => (
             <motion.div
               key={article.id}
               onClick={() => onOpenArticle?.(article.id)}
               initial={{ opacity: 0, y: 10 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: idx * 0.1 }}
               className="bg-white rounded-xl shadow-sm border border-border flex gap-3 p-3 cursor-pointer group hover:bg-primary-light/30 transition-colors"
             >
                <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 relative">
                   <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>
                <div className="flex-1 py-1">
                   <span className="text-[9px] uppercase font-bold text-primary tracking-wider">{article.category}</span>
                   <h3 className="font-semibold text-sm text-text-main leading-tight mt-1 line-clamp-2">{article.title}</h3>
                </div>
             </motion.div>
          ))}
        </div>

        <div className="mt-6 text-center">
            <Button onClick={onOpenArticles} variant="outline" className="w-full gap-2">
                <BookOpen size={16} /> Explorar Catálogo
            </Button>
        </div>
      </div>

    </div>
  );
}
