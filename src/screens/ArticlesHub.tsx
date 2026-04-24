import { useState } from "react";
import { motion } from "motion/react";
import { ChevronLeft, Search, Tag } from "lucide-react";
import { useData } from "../contexts/DataContext";

interface ArticlesHubProps {
  onBack: () => void;
  onOpenArticle: (id: string) => void;
}

export function ArticlesHub({ onBack, onOpenArticle }: ArticlesHubProps) {
  const { articles, isLoading } = useData();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("Todos");

  if (isLoading) return <div className="p-10 text-center text-text-muted">Cargando...</div>;

  // Derive categories from articles (unique values) manually
  const categories = ["Todos", "Ansiedad", "Relaciones", "Bienestar", "Terapia"];

  const filteredArticles = articles.filter(a => {
    const matchesCategory = activeCategory === "Todos" || a.category === activeCategory;
    const matchesSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          a.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col h-full bg-app-bg pt-6 pb-6 w-full relative">
      {/* Header */}
      <div className="px-6 mb-4 flex items-center justify-between">
        <button onClick={onBack} className="w-10 h-10 flex items-center justify-center rounded-full bg-primary-light text-primary hover:bg-primary hover:text-white transition-colors">
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-lg font-semibold text-text-main">
          Catálogo de Artículos
        </h1>
        <div className="w-10 h-10"></div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-12">
        {/* Search */}
        <div className="px-6 mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
            <input 
              type="text" 
              placeholder="Buscar un tema o publicación..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-border rounded-2xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:border-primary shadow-sm"
            />
          </div>
        </div>

        {/* Categories Bar */}
        <div className="px-6 mb-6 overflow-x-auto no-scrollbar flex gap-2">
           {categories.map(cat => (
             <button
               key={cat}
               onClick={() => setActiveCategory(cat)}
               className={`shrink-0 px-4 py-2 rounded-xl text-xs font-semibold tracking-wider uppercase transition-colors border ${
                 activeCategory === cat ? 'bg-primary text-white border-primary' : 'bg-white text-text-muted border-border hover:bg-primary-light/50'
               }`}
             >
               {cat}
             </button>
           ))}
        </div>

        {/* Articles Grid */}
        <div className="px-6 space-y-5">
           {filteredArticles.length === 0 ? (
             <div className="text-center py-10">
               <p className="text-text-muted text-sm">No se encontraron artículos para esta búsqueda.</p>
             </div>
           ) : (
             filteredArticles.map((article, idx) => (
               <motion.div
                 key={article.id}
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: idx * 0.05 }}
                 onClick={() => onOpenArticle(article.id)}
                 className="bg-white rounded-2xl overflow-hidden shadow-sm border border-border cursor-pointer group hover:border-primary/50 transition-colors"
               >
                 <div className="h-44 overflow-hidden relative">
                    <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1 shadow-sm">
                       <Tag size={12} className="text-primary" />
                       <span className="text-[10px] uppercase font-bold text-primary tracking-wider">{article.category}</span>
                    </div>
                 </div>
                 <div className="p-5">
                    <span className="text-[10px] text-text-muted uppercase font-semibold tracking-wider font-mono">{article.date}</span>
                    <h3 className="font-bold text-base text-text-main leading-tight mt-1 mb-2 group-hover:text-primary transition-colors">{article.title}</h3>
                    <p className="text-xs text-text-muted leading-relaxed line-clamp-2">{article.summary}</p>
                 </div>
               </motion.div>
             ))
           )}
        </div>
      </div>
    </div>
  );
}
