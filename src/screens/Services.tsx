import { motion } from "motion/react";
import { User, Users, Globe, Clock, Plus } from "lucide-react";
import { services } from "../data";
import { Button } from "../components/ui/Button";

export function Services({ onNavigate }: { onNavigate: (tab: string) => void }) {
  const getIcon = (type: string) => {
    switch (type) {
      case "individual": return <User className="text-primary" size={24} />;
      case "couple": return <Users className="text-primary" size={24} />;
      case "online": return <Globe className="text-primary" size={24} />;
      default: return <User className="text-primary" size={24} />;
    }
  };

  return (
    <div className="px-6 pt-8 pb-10">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-8"
      >
        <h1 className="text-lg font-semibold text-text-main py-2">
          Nuestros Servicios
        </h1>
        <p className="text-text-muted text-sm mt-1">
          Especialidades diseñadas para acompañar cada proceso vital de manera profesional.
        </p>
      </motion.div>

      <div className="space-y-6">
        {services.map((service, idx) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white rounded-3xl overflow-hidden shadow-sm border border-border group"
          >
            {/* Image Header */}
            {service.imageUrl && (
              <div className="h-40 w-full relative overflow-hidden bg-secondary">
                 <img src={service.imageUrl} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                 <div className="absolute top-4 left-4 p-2 rounded-xl bg-white/90 backdrop-blur-sm shadow-sm flex items-center justify-center">
                    {getIcon(service.iconType)}
                 </div>
              </div>
            )}
            
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg text-text-main line-clamp-1">{service.title}</h3>
                <span className="font-bold text-sm text-primary bg-primary-light px-2 py-1 rounded-md shrink-0">
                  {service.price}
                </span>
              </div>
              
              <p className="text-xs text-text-muted leading-relaxed mb-4">
                {service.description}
              </p>
              
              <div className="flex justify-between items-center pt-4 border-t border-border">
                  <div className="flex items-center gap-1.5 text-text-muted text-[10px] font-semibold uppercase tracking-wider">
                    <Clock size={14} className="text-primary" />
                    {service.duration} min
                  </div>
                  <Button onClick={() => onNavigate("agenda")} variant="outline" size="sm" className="gap-1 h-8 text-[11px] px-3">
                    <Plus size={14} /> Agendar
                  </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
