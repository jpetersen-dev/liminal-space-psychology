import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar as CalendarIcon, FileText, Headphones, Video, LogOut, ChevronRight, Download, Activity, Wind, Smile } from "lucide-react";
import { Button } from "../components/ui/Button";
import { cn } from "../lib/utils";
import { useAuth } from "../contexts/AuthContext";

export function PatientPortal() {
  const { user, signInWithGoogle, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState<"citas" | "recursos" | "bienestar">("citas");
  
  // Wellness tab state
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathPhase, setBreathPhase] = useState<"inhala" | "sostén" | "exhala">("inhala");

  // Mock Data
  const upcomingAppointment = {
    therapist: "Camila Malebrán F",
    date: "Jueves, 23 abril 2026",
    time: "10:00 AM",
    service: "Psicoterapia Individual (Online)"
  };

  const resources = [
    { id: 1, title: "Guía de Regulación Emocional", type: "pdf", date: "Hace 2 días", icon: FileText },
    { id: 2, title: "Meditación: Arraigo y Ansiedad", type: "audio", date: "La semana pasada", icon: Headphones },
  ];

  useEffect(() => {
    if (!isBreathing) return;
    
    // Simple 4-7-8 breathing loop logic scaled down for demo (4s, 4s, 6s)
    let phaseTimer: any;
    const runCycle = () => {
      setBreathPhase("inhala");
      phaseTimer = setTimeout(() => {
        setBreathPhase("sostén");
        phaseTimer = setTimeout(() => {
          setBreathPhase("exhala");
          phaseTimer = setTimeout(runCycle, 6000);
        }, 4000);
      }, 4000);
    };

    runCycle();
    return () => clearTimeout(phaseTimer);
  }, [isBreathing]);

  if (!user) {
    return (
      <div className="px-6 py-12 flex flex-col h-full bg-app-bg items-center justify-center text-center min-h-[85vh]">
        <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
           <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4Z" fill="currentColor" opacity="0.3"/>
              <path d="M12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7ZM12 9C13.6569 9 15 10.3431 15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9Z" fill="currentColor"/>
           </svg>
        </div>
        <h2 className="text-2xl font-bold text-text-main mb-3">Portal del Paciente</h2>
        <p className="text-text-muted text-sm leading-relaxed mb-8 px-4 text-balance">
          Accede a tu cuenta para gestionar tus citas, unirte a tus videollamadas y descargar los recursos que tu terapeuta ha preparado para ti.
        </p>

        <div className="w-full max-w-sm space-y-3">
          {/* Mock Google Login Button */}
          <button 
            onClick={signInWithGoogle}
            className="w-full bg-white border border-border text-text-main font-semibold py-3 px-4 rounded-xl shadow-sm hover:bg-gray-50 transition-colors flex items-center justify-center gap-3 relative overflow-hidden"
          >
            <svg className="w-5 h-5 absolute left-4 border-r border-border pr-2 w-7" viewBox="0 0 24 24">
               <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
               <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
               <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
               <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span className="ml-6">Continuar con Google</span>
          </button>
          
          <button 
            onClick={signInWithGoogle}
            className="w-full bg-app-bg border border-border text-text-muted font-medium py-3 px-4 rounded-xl shadow-sm hover:bg-gray-100 transition-colors text-sm"
          >
            Ingresar con Correo
          </button>
        </div>

        <div className="mt-8 text-xs text-text-muted/70 max-w-xs text-balance">
           Crear una cuenta no es obligatorio para agendar, pero te permite mantener todo tu proceso terapéutico organizado en un solo lugar.
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-app-bg pt-8 pb-10">
      {/* Portal Header */}
      <div className="px-6 mb-8 flex justify-between items-center">
         <div className="flex items-center gap-3">
             <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center text-primary font-bold text-lg border border-primary/20 overflow-hidden">
                {user?.user_metadata?.avatar_url ? (
                  <img src={user.user_metadata.avatar_url} alt="User" className="w-full h-full object-cover" />
                ) : (
                  user?.user_metadata?.name?.charAt(0) || "P"
                )}
             </div>
             <div>
                <h1 className="text-xl font-bold text-text-main line-clamp-1">Hola, {user?.user_metadata?.name?.split(' ')[0] || "Paciente"}</h1>
                <p className="text-xs text-text-muted">Tu espacio seguro</p>
             </div>
         </div>
         <button onClick={signOut} className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-border text-text-muted hover:text-red-500 hover:bg-red-50 transition-colors shadow-sm">
            <LogOut size={18} />
         </button>
      </div>

      {/* Tabs */}
      <div className="px-6 mb-6">
        <div className="flex bg-white rounded-xl p-1 shadow-sm border border-border relative">
          {/* Animated Tab Background Indicator */}
          <div 
            className="absolute top-1 bottom-1 w-[calc(33.333%-4px)] bg-primary-light rounded-lg transition-transform duration-300 ease-in-out"
            style={{ 
              transform: activeTab === "citas" ? "translateX(0)" : 
                         activeTab === "recursos" ? "translateX(100%)" : 
                         "translateX(200%)" 
            }}
          ></div>
          
          <button 
            onClick={() => setActiveTab("citas")}
            className={cn("flex-1 py-2.5 text-xs font-semibold rounded-lg z-10 transition-colors", activeTab === "citas" ? "text-primary" : "text-text-muted")}
          >
            Mis Citas
          </button>
          <button 
            onClick={() => setActiveTab("recursos")}
            className={cn("flex-1 py-2.5 text-xs font-semibold rounded-lg z-10 transition-colors", activeTab === "recursos" ? "text-primary" : "text-text-muted")}
          >
            Recursos
          </button>
          <button 
            onClick={() => setActiveTab("bienestar")}
            className={cn("flex-1 py-2.5 text-xs font-semibold rounded-lg z-10 transition-colors", activeTab === "bienestar" ? "text-primary" : "text-text-muted")}
          >
            Bienestar
          </button>
        </div>
      </div>

      <div className="px-6 flex-1">
        <AnimatePresence mode="wait">
          {activeTab === "citas" && (
             <motion.div
               key="citas"
               initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
               className="space-y-6"
             >
                <div className="space-y-3">
                   <h2 className="text-sm font-semibold uppercase tracking-wider text-text-header">Próxima Sesión</h2>
                   
                   <div className="bg-primary text-white rounded-2xl p-5 shadow-lg relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
                      
                      <div className="flex justify-between items-start mb-4 relative z-10">
                         <div>
                            <p className="text-white/80 text-xs font-semibold uppercase tracking-wider mb-1">Videollamada</p>
                            <h3 className="font-bold text-lg">{upcomingAppointment.service}</h3>
                         </div>
                         <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center shrink-0 backdrop-blur-md">
                            <Video size={20} className="text-white" />
                         </div>
                      </div>
                      
                      <div className="bg-black/20 rounded-xl p-3 mb-4 backdrop-blur-sm border border-white/10 relative z-10 space-y-1.5">
                         <div className="flex items-center gap-2 text-sm text-white/90">
                           <CalendarIcon size={16} /> {upcomingAppointment.date}
                         </div>
                         <div className="flex items-center gap-2 text-sm text-white/90">
                           <span className="font-semibold">{upcomingAppointment.time}</span> (Tu zona horaria)
                         </div>
                      </div>

                      <p className="text-sm mb-4 text-white/90">Con <b>{upcomingAppointment.therapist}</b></p>
                      
                      <Button variant="secondary" className="w-full border-none shadow-md hover:bg-gray-100 text-primary font-bold">
                        Unirse a la llamada
                      </Button>
                   </div>
                </div>

                <div className="space-y-3 pt-2">
                   <h2 className="text-sm font-semibold uppercase tracking-wider text-text-header">Historial</h2>
                   <div className="bg-white rounded-xl shadow-sm border border-border divide-y divide-border">
                      <div className="p-4 flex justify-between items-center">
                         <div>
                            <p className="text-xs text-text-muted mb-0.5">16 Abril 2026</p>
                            <h4 className="font-semibold text-sm text-text-main line-clamp-1">Psicoterapia Individual</h4>
                         </div>
                         <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">Completada</span>
                      </div>
                      <div className="p-4 flex justify-between items-center">
                         <div>
                            <p className="text-xs text-text-muted mb-0.5">09 Abril 2026</p>
                            <h4 className="font-semibold text-sm text-text-main line-clamp-1">Psicoterapia Individual</h4>
                         </div>
                         <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">Completada</span>
                      </div>
                   </div>
                </div>
             </motion.div>
          )}

          {activeTab === "recursos" && (
             <motion.div
               key="recursos"
               initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
               className="space-y-4"
             >
                <div className="bg-primary-light/50 p-4 rounded-xl border border-primary/20 text-sm text-text-main mb-2 leading-relaxed">
                   Aquí encontrarás apuntes, ejercicios y material de apoyo que tu terapeuta comparte contigo tras las sesiones.
                </div>

                {resources.map((res) => {
                  const Icon = res.icon;
                  return (
                    <div key={res.id} className="bg-white p-4 rounded-2xl shadow-sm border border-border flex items-center justify-between group hover:border-primary transition-colors cursor-pointer">
                       <div className="flex items-center gap-4 border-r border-border/50 pr-4 flex-1">
                          <div className={cn(
                            "w-12 h-12 rounded-xl flex flex-col items-center justify-center shrink-0 shadow-inner",
                            res.type === 'pdf' ? "bg-red-50 text-red-500" : "bg-blue-50 text-blue-500"
                          )}>
                             <Icon size={20} strokeWidth={2.5} />
                             <span className="text-[8px] uppercase font-bold mt-0.5 tracking-widest">{res.type}</span>
                          </div>
                          <div>
                            <h4 className="font-bold text-sm text-text-main line-clamp-2">{res.title}</h4>
                            <p className="text-[10px] uppercase tracking-wider font-semibold text-text-muted mt-1">{res.date}</p>
                          </div>
                       </div>
                       <div className="pl-4 shrink-0 text-primary">
                          <Download size={20} />
                       </div>
                    </div>
                  );
                })}
             </motion.div>
          )}

          {activeTab === "bienestar" && (
             <motion.div
               key="bienestar"
               initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
               className="space-y-6 pb-6"
             >
                {/* Mood Tracker */}
                <div className="space-y-3">
                   <h2 className="text-sm font-semibold uppercase tracking-wider text-text-header">¿Cómo te sientes hoy?</h2>
                   <div className="bg-white p-5 rounded-2xl shadow-sm border border-border">
                      <div className="flex justify-between items-center gap-2">
                         {[
                           { id: "genial", emoji: "✨", label: "Genial" },
                           { id: "feliz", emoji: "😊", label: "Bien" },
                           { id: "neutral", emoji: "😐", label: "Regular" },
                           { id: "ansioso", emoji: "🌪️", label: "Ansioso" },
                           { id: "triste", emoji: "🌧️", label: "Mal" }
                         ].map(mood => (
                           <button 
                             key={mood.id}
                             onClick={() => setSelectedMood(mood.id)}
                             className={cn(
                               "flex flex-col items-center gap-2 p-2 rounded-xl transition-all flex-1",
                               selectedMood === mood.id ? "bg-primary/10 scale-110" : "hover:bg-gray-50 opacity-70 grayscale"
                             )}
                           >
                              <span className="text-2xl">{mood.emoji}</span>
                              <span className={cn("text-[10px] font-semibold", selectedMood === mood.id ? "text-primary" : "text-text-muted")}>
                                {mood.label}
                              </span>
                           </button>
                         ))}
                      </div>
                      <AnimatePresence>
                        {selectedMood && (
                          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="overflow-hidden">
                            <div className="mt-4 pt-4 border-t border-border">
                              <textarea 
                                placeholder="¿Quieres añadir un breve comentario sobre tu día?" 
                                className="w-full bg-gray-50 border border-border p-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none h-20"
                              />
                              <Button size="sm" className="w-full mt-2">Guardar Registro</Button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                   </div>
                </div>

                {/* Breathing Exercise */}
                <div className="space-y-3">
                   <h2 className="text-sm font-semibold uppercase tracking-wider text-text-header flex items-center justify-between">
                     <span>Tómate un respiro</span>
                     <Wind size={16} className="text-primary" />
                   </h2>
                   <div className="bg-gradient-to-br from-primary to-primary-dark p-6 rounded-2xl shadow-lg text-center overflow-hidden relative">
                      <div className="relative z-10 flex flex-col items-center justify-center min-h-[160px]">
                         {!isBreathing ? (
                           <>
                              <h3 className="text-white font-bold text-lg mb-2">Ejercicio de Coherencia</h3>
                              <p className="text-white/80 text-sm mb-6 max-w-[200px] text-balance">
                                Unos minutos de respiración ayudan a regular tu sistema nervioso.
                              </p>
                              <Button 
                                variant="secondary" 
                                className="border-none shadow-md"
                                onClick={() => setIsBreathing(true)}
                              >
                                Comenzar
                              </Button>
                           </>
                         ) : (
                           <div className="flex flex-col items-center justify-center w-full">
                              <div className="relative w-32 h-32 flex items-center justify-center mb-4">
                                <motion.div 
                                  className="absolute w-full h-full bg-white/20 rounded-full blur-md"
                                  animate={{
                                    scale: breathPhase === "inhala" ? 1.5 : breathPhase === "sostén" ? 1.5 : 1,
                                    opacity: breathPhase === "inhala" ? 0.8 : breathPhase === "sostén" ? 0.6 : 0.2
                                  }}
                                  transition={{ duration: breathPhase === "sostén" ? 4 : breathPhase === "inhala" ? 4 : 6, ease: "easeInOut" }}
                                />
                                <div className="absolute inset-0 bg-white/10 border-2 border-white/30 rounded-full" />
                                <h4 className="text-2xl font-bold text-white capitalize z-10">{breathPhase}</h4>
                              </div>
                              <button 
                                onClick={() => setIsBreathing(false)}
                                className="text-white/70 text-xs uppercase tracking-widest font-bold mt-4 hover:text-white"
                              >
                                Detener
                              </button>
                           </div>
                         )}
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
