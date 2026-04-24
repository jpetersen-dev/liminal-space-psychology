import { motion } from "motion/react";
import { ChevronLeft, ArrowLeft, ArrowRight, Grid, Tag } from "lucide-react";
import { articles } from "../data";

interface ArticleReaderProps {
  articleId: string;
  onBack: () => void;
  onOpenArticle: (id: string) => void;
  onViewCatalog: () => void;
}

export function ArticleReader({ articleId, onBack, onOpenArticle, onViewCatalog }: ArticleReaderProps) {
  const currentIndex = articles.findIndex(a => a.id === articleId);
  const article = articles[currentIndex];

  if (!article) return <div className="p-10 text-center">Artículo no encontrado.</div>;

  const prevArticle = currentIndex > 0 ? articles[currentIndex - 1] : null;
  const nextArticle = currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null;

  return (
    <div className="flex flex-col h-full bg-white w-full relative">
      {/* Header */}
      <div className="px-6 py-4 flex items-center justify-between absolute top-0 w-full z-10 bg-gradient-to-b from-black/50 to-transparent">
        <button onClick={onBack} className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-colors">
          <ChevronLeft size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-24">
        {/* Cover Image */}
        <div className="w-full h-72 sm:h-80 relative">
           <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover" />
           <div className="absolute inset-0 bg-gradient-to-t from-app-bg via-transparent to-transparent"></div>
        </div>

        {/* Content Wrapper */}
        <div className="px-6 -mt-10 relative z-10">
           <div className="bg-white p-6 rounded-3xl shadow-sm border border-border mb-6">
              <div className="flex items-center gap-2 mb-3">
                 <div className="bg-primary-light px-2 py-1 rounded-md flex items-center gap-1">
                   <Tag size={12} className="text-primary" />
                   <span className="text-[10px] uppercase font-bold text-primary tracking-wider">{article.category}</span>
                 </div>
                 <span className="text-[10px] uppercase font-semibold text-text-muted font-mono">{article.date}</span>
              </div>
              <h1 className="text-2xl font-bold text-text-main leading-tight mb-4">
                 {article.title}
              </h1>
              
              <div className="space-y-4 text-sm text-text-main leading-relaxed">
                 {article.content.split("\n\n").map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                 ))}
              </div>
           </div>

           {/* Call to action */}
           <div className="bg-primary-light p-6 rounded-3xl text-center mb-8 border border-primary/20">
               <h3 className="font-bold text-primary mb-2">¿Sientes que necesitas hablar de esto?</h3>
               <p className="text-xs text-text-main mb-4 leading-relaxed">Nuestros especialistas están disponibles para apoyarte en este y otros temas.</p>
               <button onClick={onBack} className="bg-primary text-white text-xs font-semibold uppercase tracking-wider px-6 py-3 rounded-xl hover:bg-cta transition-colors">Volver y Agendar</button>
           </div>
        </div>
      </div>

      <div className="sticky bottom-0 w-full bg-white border-t border-border px-6 py-4 flex justify-between items-center shadow-[0_-10px_20px_rgba(0,0,0,0.03)] z-20">
        {prevArticle ? (
          <button onClick={() => onOpenArticle(prevArticle.id)} className="flex items-center gap-2 text-text-muted hover:text-primary transition-colors text-xs font-semibold uppercase tracking-wider text-left max-w-[100px] truncate">
            <ArrowLeft size={16} className="shrink-0" /> Anterior
          </button>
        ) : <div className="w-[80px]"></div>}

        <button onClick={onViewCatalog} className="flex flex-col items-center justify-center w-12 h-12 bg-surface-active border border-border rounded-full hover:bg-primary hover:text-white hover:border-primary transition-colors text-text-muted shadow-sm">
           <Grid size={20} />
        </button>

        {nextArticle ? (
          <button onClick={() => onOpenArticle(nextArticle.id)} className="flex items-center gap-2 text-text-muted hover:text-primary transition-colors text-xs font-semibold uppercase tracking-wider text-right max-w-[100px] truncate">
            Siguiente <ArrowRight size={16} className="shrink-0" />
          </button>
        ) : <div className="w-[80px]"></div>}
      </div>
    </div>
  );
}
