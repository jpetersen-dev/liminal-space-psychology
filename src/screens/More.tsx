import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, ChevronLeft, Phone, Mail, HelpCircle, Plus, Minus } from "lucide-react";
import { useData } from "../contexts/DataContext";
import { useAuth } from "../contexts/AuthContext";

interface MoreProps {
  onOpenArticles?: () => void;
}

export function More({ onOpenArticles }: MoreProps) {
  const { therapists, isLoading } = useData();
  const [view, setView] = useState<"menu" | "about" | "contact" | "faq">("menu");
  const { user } = useAuth();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  if (isLoading) return <div className="p-10 text-center text-text-muted">Cargando...</div>;

  const menuItems = [
    { id: "about", label: "Quiénes Somos", desc: "Conoce a nuestro equipo de terapeutas", action: () => setView("about"), icon: "users" },
    { id: "articles", label: "Artículos y Recursos", desc: "Lee nuestro blog sobre bienestar", action: () => onOpenArticles?.(), icon: "book" },
    { id: "faq", label: "Preguntas Frecuentes", desc: "Dudas sobre la terapia online", action: () => setView("faq"), icon: "help" },
    { id: "contact", label: "Contacto y Ubicación", desc: "Dónde estamos y cómo comunicarte", action: () => setView("contact"), icon: "phone" },
  ] as const;

  return (
    <div className="flex flex-col h-full bg-app-bg pt-6 pb-4">
      {/* Header */}
      <div className="px-6 mb-6 flex items-center justify-between">
        {view !== "menu" ? (
          <button onClick={() => setView("menu")} className="w-10 h-10 flex items-center justify-center rounded-full bg-primary-light text-primary">
            <ChevronLeft size={20} />
          </button>
        ) : (
          <div className="w-10 h-10"></div>
        )}
        <h1 className="text-lg font-semibold text-text-main">
          {view === "menu" && "Descubre"}
          {view === "about" && "Quiénes Somos"}
          {view === "faq" && "Preguntas Frecuentes"}
          {view === "contact" && "Contacto"}
        </h1>
        <div className="w-10 h-10"></div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-12 no-scrollbar">
        <AnimatePresence mode="wait">
          {view === "menu" && (
            <motion.div
              key="menu"
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              className="space-y-3"
            >
               {/* Hero image for the "More" tab menu */}
              <div className="w-full h-40 rounded-2xl bg-secondary mb-6 overflow-hidden relative shadow-sm border border-border">
                 <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80&fit=crop")'}}></div>
                 <div className="absolute inset-0 bg-black/20 flex flex-col items-center justify-center text-center p-4">
                    <h3 className="font-semibold text-white text-lg drop-shadow-md">Liminal Space</h3>
                    <p className="text-xs text-white/90 drop-shadow-md mt-1">Conoce más sobre nuestro espacio y filosofía.</p>
                 </div>
              </div>

              {menuItems.map(item => (
                <button
                  key={item.id}
                  onClick={item.action}
                  className="w-full text-left bg-white p-4 rounded-xl flex justify-between items-center shadow-sm border border-border hover:bg-primary-light/50 transition-colors"
                >
                  <div>
                    <h3 className="font-medium text-sm text-text-main">{item.label}</h3>
                    <p className="text-xs text-text-muted mt-1">{item.desc}</p>
                  </div>
                  <ChevronRight size={20} className="text-primary/50" />
                </button>
              ))}
            </motion.div>
          )}

          {view === "about" && (
            <motion.div
              key="about"
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
               <p className="text-sm text-text-muted leading-relaxed">
                En Liminal Space Psychology, creemos que la salud mental es el pilar de una vida plena. Nuestro equipo está conformado por profesionales altamente capacitados, dispuestos a acompañarte en tu proceso de sanación y crecimiento.
              </p>
              <div className="space-y-4">
                {therapists.map(t => (
                   <div key={t.id} className="bg-white p-4 rounded-xl shadow-sm border border-border">
                     <div className="flex gap-4 items-center mb-3">
                        <div className="w-14 h-14 rounded-xl bg-secondary overflow-hidden shrink-0 border border-border">
                           <img src={t.imageUrl} alt={t.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-sm text-text-main">{t.name}</h3>
                          <p className="text-xs text-primary font-medium">{t.role}</p>
                        </div>
                     </div>
                     <p className="text-sm text-text-muted leading-relaxed">{t.bio}</p>
                   </div>
                ))}
              </div>
            </motion.div>
          )}

          {view === "faq" && (
            <motion.div
              key="faq"
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
              className="space-y-4"
            >
               <div className="bg-primary/5 rounded-2xl p-5 mb-6 border border-primary/10">
                  <h3 className="font-bold text-text-main text-sm mb-1 text-balance">¿Tienes dudas sobre cómo funciona la terapia online?</h3>
                  <p className="text-xs text-text-muted text-balance">Hemos recopilado las preguntas más comunes de nuestros pacientes expatriados.</p>
               </div>

               <div className="space-y-3">
                 {[
                   { q: "¿Cómo funcionan las sesiones online?", a: "Las sesiones se realizan por videollamada a través de un enlace seguro que te enviaremos antes de tu cita. Solo necesitas una buena conexión a internet y un lugar privado." },
                   { q: "¿Cuánto dura cada sesión?", a: "Las sesiones individuales tienen una duración estándar de 50 minutos. Te recomendamos conectarte 5 minutos antes para prepararte." },
                   { q: "¿Qué pasa si tengo que cancelar?", a: "Puedes cancelar o reagendar tu sesión sin costo hasta 24 horas antes de la cita. Las cancelaciones tardías pueden estar sujetas a un cargo." },
                   { q: "¿Trabajan con seguro médico?", a: "Emitimos boletas que puedes presentar a tu seguro de salud o isapre para solicitar reembolso, dependiendo de la cobertura de tu plan internacional o local." },
                   { q: "¿Qué métodos de pago aceptan?", a: "Aceptamos pagos con tarjeta de crédito/débito a través de Stripe y transferencias bancarias según tu ubicación de residencia actual." }
                 ].map((faq, index) => (
                   <div key={index} className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
                     <button
                       onClick={() => setOpenFaq(openFaq === index ? null : index)}
                       className="w-full p-4 flex justify-between items-center text-left hover:bg-gray-50 transition-colors"
                     >
                       <span className="font-semibold text-sm text-text-main pr-4">{faq.q}</span>
                       <div className="shrink-0 text-primary">
                         {openFaq === index ? <Minus size={18} /> : <Plus size={18} />}
                       </div>
                     </button>
                     <AnimatePresence>
                       {openFaq === index && (
                         <motion.div
                           initial={{ height: 0, opacity: 0 }}
                           animate={{ height: 'auto', opacity: 1 }}
                           exit={{ height: 0, opacity: 0 }}
                           className="overflow-hidden"
                         >
                           <div className="p-4 pt-0 text-sm text-text-muted leading-relaxed border-t border-gray-100 bg-gray-50/50">
                             {faq.a}
                           </div>
                         </motion.div>
                       )}
                     </AnimatePresence>
                   </div>
                 ))}
               </div>
            </motion.div>
          )}

          {view === "contact" && (
             <motion.div
              key="contact"
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
             >
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-border space-y-4">
                  <h3 className="font-bold text-lg text-text-main">Hablemos</h3>
                  <p className="text-sm text-text-muted leading-relaxed">
                    Atendemos exclusivamente de forma online a hispanohablantes en el extranjero, con foco en expatriados en Suiza, España, el resto de Europa y Australia.
                  </p>
                  
                  {/* Contact Form Mockup */}
                  <form className="space-y-3 pt-2" onSubmit={(e) => e.preventDefault()}>
                    <input 
                      type="text" 
                      placeholder="Tu nombre y apellido" 
                      className="w-full bg-app-bg border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors" 
                    />
                    <input 
                      type="email" 
                      placeholder="Correo electrónico" 
                      className="w-full bg-app-bg border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors" 
                    />
                    <textarea 
                      placeholder="¿En qué podemos ayudarte o asesorarte?" 
                      rows={4} 
                      className="w-full bg-app-bg border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary resize-none transition-colors"
                    ></textarea>
                    
                    <button className="w-full bg-primary text-white font-semibold py-3 rounded-xl mt-2 hover:bg-cta transition-colors">
                      Enviar Mensaje
                    </button>
                  </form>
                </div>

                <div className="bg-white p-5 rounded-2xl shadow-sm border border-border space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary-light rounded-xl text-primary shrink-0">
                      <Mail size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-text-main">Correo Directo</h4>
                      <p className="text-xs text-text-muted mt-1 leading-relaxed">contacto@liminalspace.cl</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary-light rounded-xl text-primary shrink-0">
                      <Phone size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-text-main">Soporte WhatsApp</h4>
                      <p className="text-xs text-text-muted mt-1">+56 9 1234 5678 (Solo mensajes)</p>
                    </div>
                  </div>
                </div>
             </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
