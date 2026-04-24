import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { format, addDays, startOfToday } from "date-fns";
import { es } from "date-fns/locale";
import { ChevronLeft, CheckCircle2, Info, CreditCard, Loader2 } from "lucide-react";
import { useData } from "../contexts/DataContext";
import { Button } from "../components/ui/Button";
import { cn } from "../lib/utils";
import { useAuth } from "../contexts/AuthContext";

export function Booking() {
  const { therapists, services, isLoading } = useData();
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [selectedTherapistId, setSelectedTherapistId] = useState<string | null>(null);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState("");

  const today = startOfToday();
  const weekDays = Array.from({ length: 14 }).map((_, i) => addDays(today, i));
  const timeSlots = ["09:00 AM", "10:00 AM", "11:30 AM", "03:00 PM", "04:00 PM", "05:30 PM"];

  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => setStep(s => s - 1);

  const currentTherapist = therapists.find(t => t.id === selectedTherapistId);
  const currentService = services.find(s => s.id === selectedServiceId);

  if (isLoading) return <div className="p-10 text-center text-text-muted">Cargando...</div>;

  return (
    <div className="px-6 pt-6 pb-4 flex flex-col h-full bg-app-bg">
      <div className="flex justify-between items-center mb-6">
        {step > 1 && step < 6 ? (
           <button 
             onClick={step === 5 ? () => {
               setStep(1);
               setSelectedTherapistId(null);
               setSelectedServiceId(null);
               setSelectedDate(null);
               setSelectedTime(null);
             } : handleBack} 
             className="w-10 h-10 flex items-center justify-center rounded-full bg-primary-light text-primary hover:bg-primary hover:text-white transition-colors"
           >
            <ChevronLeft size={20} />
          </button>
        ) : (
           <div className="w-10 h-10"></div>
        )}
        <h1 className="text-lg font-semibold text-text-main">
          {step === 1 && "Elegir Profesional"}
          {step === 2 && "Elegir Servicio"}
          {step === 3 && "Fecha y Hora"}
          {step === 4 && "Finalizar Reserva"}
          {step === 5 && "Confirmación"}
        </h1>
        <div className="w-10 h-10"></div>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div 
            key="step1"
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            className="flex-1 space-y-4"
          >
            {/* Guidelines box */}
            <div className="bg-primary-light/50 p-4 rounded-xl border border-primary/20 flex gap-3 text-sm text-text-main">
               <Info className="shrink-0 text-primary mt-0.5" size={18} />
               <p className="leading-relaxed">
                  Para agendar tu sesión online, primero selecciona con quién te gustaría atenderte para ver sus especialidades y horarios disponibles.
               </p>
            </div>

            {therapists.map(t => (
              <button
                key={t.id}
                onClick={() => setSelectedTherapistId(t.id)}
                className={cn(
                  "w-full text-left p-4 rounded-xl flex gap-4 items-center transition-all border",
                  selectedTherapistId === t.id ? "border-primary bg-primary-light" : "bg-white border-border shadow-sm hover:bg-primary-light/50"
                )}
              >
                 <div className="w-14 h-14 rounded-xl bg-secondary overflow-hidden flex items-center justify-center text-secondary-text font-bold text-xl shrink-0">
                    <img src={t.imageUrl} alt={t.name} className="w-full h-full object-cover" />
                 </div>
                <div>
                  <h3 className="font-semibold text-sm text-text-main">{t.name}</h3>
                  <p className="text-xs text-text-muted mt-1">{t.role}</p>
                </div>
              </button>
            ))}
          </motion.div>
        )}

        {step === 2 && (
          <motion.div 
            key="step2"
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            className="flex-1 space-y-4"
          >
            {services.map(s => (
              <button
                key={s.id}
                onClick={() => setSelectedServiceId(s.id)}
                className={cn(
                  "w-full text-left p-4 rounded-xl transition-all border",
                  selectedServiceId === s.id ? "border-2 border-primary bg-surface-active" : "bg-white border-border shadow-sm hover:bg-primary-light/50"
                )}
              >
                <div className="flex justify-between items-center mb-1">
                   <div className="flex items-center gap-3">
                     {selectedServiceId === s.id && <div className="w-2 h-2 rounded-full bg-primary shrink-0"></div>}
                     <h3 className="font-semibold text-sm text-text-main">{s.title}</h3>
                   </div>
                   <span className="font-bold text-sm text-primary">{s.price}</span>
                </div>
                <p className="text-xs text-text-muted mb-2 line-clamp-2 mt-2">{s.description}</p>
                <span className="text-[10px] font-medium text-text-muted uppercase tracking-wider bg-border px-2 py-1 rounded">
                  {s.duration} min
                </span>
              </button>
            ))}
          </motion.div>
        )}

        {step === 3 && (
          <motion.div 
            key="step3"
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            className="flex-1"
          >
             {/* Selected Therapist Summary */}
             <div className="flex items-center gap-4 bg-white p-3 rounded-2xl shadow-sm border border-border mb-6">
               <div className="w-14 h-14 rounded-xl bg-secondary overflow-hidden shrink-0">
                  <img src={currentTherapist?.imageUrl} alt={currentTherapist?.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h2 className="font-semibold text-sm text-text-main">{currentTherapist?.name}</h2>
                  <p className="text-xs text-text-muted">{currentTherapist?.role}</p>
                </div>
             </div>

            <section className="mb-6">
                <div className="flex justify-between items-center mb-3">
                   <h3 className="text-sm font-semibold uppercase tracking-wider text-text-header">
                     {selectedDate ? format(selectedDate, "LLLL yyyy", { locale: es }) : "Calendario"}
                   </h3>
                </div>
                
                <div className="flex justify-between gap-2 overflow-x-auto pb-2 no-scrollbar snap-x">
                  {weekDays.slice(0, 14).map(d => {
                    const isSelected = selectedDate?.toDateString() === d.toDateString();
                    return (
                      <button
                        key={d.toISOString()}
                        onClick={() => setSelectedDate(d)}
                        className={cn(
                          "shrink-0 snap-start flex-1 min-w-[3.5rem] flex flex-col items-center p-3 rounded-xl border transition-colors",
                          isSelected ? "bg-primary text-white shadow-md border-primary" : "bg-white text-text-main border-border hover:bg-primary-light/50"
                        )}
                      >
                        <span className={cn("text-[10px] uppercase font-semibold", isSelected ? "text-white/80" : "text-text-muted")}>
                          {format(d, 'eee', { locale: es }).substring(0,3)}
                        </span>
                        <span className="text-xl font-bold my-1">{format(d, 'dd')}</span>
                        <span className={cn("text-[10px] uppercase font-semibold", isSelected ? "text-white/80" : "text-text-muted")}>
                          {format(d, 'MMM', { locale: es })}
                        </span>
                      </button>
                    )
                  })}
                </div>
            </section>

            <section className="mb-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-text-header mb-3">Turnos Disponibles</h3>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((time, i) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    disabled={!selectedDate}
                    className={cn(
                      "py-3 rounded-xl border text-xs font-medium transition-all",
                      !selectedDate ? "opacity-40 bg-white border-border pointer-events-none" :
                      selectedTime === time ? "bg-secondary border-secondary-border text-xs font-bold text-text-main" : "bg-white border-border hover:bg-primary-light text-text-main"
                    )}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </section>
            
            <section className="mt-6">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-text-header mb-3">Servicio Seleccionado</h3>
                <div className="p-4 rounded-xl border-2 border-primary bg-surface-active flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary shrink-0"></div>
                        <span className="text-sm font-medium text-text-main">{currentService?.title}</span>
                    </div>
                    <span className="text-sm font-bold text-primary shrink-0">{currentService?.price}</span>
                </div>
            </section>

          </motion.div>
        )}

        {step === 4 && (
          <motion.div 
            key="step4"
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            className="flex-1 space-y-6"
          >
             {/* Beautiful Header Image */}
             <div className="w-full h-32 rounded-2xl overflow-hidden relative shadow-sm border border-border">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=600&q=80&fit=crop")'}}></div>
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                   <h2 className="text-white font-bold text-lg drop-shadow-md tracking-wider">Confirmar y Pagar</h2>
                </div>
             </div>

             {/* Booking Summary */}
             <div className="bg-white p-5 rounded-2xl shadow-sm border border-border space-y-4">
               <h3 className="text-sm font-semibold text-text-main">Resumen de tu reserva</h3>
               <div className="flex items-center gap-4 pb-3 border-b border-border">
                  <div className="w-12 h-12 rounded-xl bg-secondary overflow-hidden shrink-0">
                    <img src={currentTherapist?.imageUrl} alt={currentTherapist?.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-text-main">{currentTherapist?.name}</p>
                    <p className="text-xs text-text-muted">{currentTherapist?.role}</p>
                  </div>
               </div>
               <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-text-muted">Servicio</span><span className="font-medium text-text-main">{currentService?.title}</span></div>
                  <div className="flex justify-between"><span className="text-text-muted">Fecha</span><span className="font-medium text-text-main">{selectedDate && format(selectedDate, 'EEEE d MMM, yyyy', { locale: es })}</span></div>
                  <div className="flex justify-between"><span className="text-text-muted">Hora</span><span className="font-medium text-text-main">{selectedTime}</span></div>
                  <div className="flex justify-between"><span className="text-text-muted">Duración</span><span className="font-medium text-text-main">{currentService?.duration} min</span></div>
               </div>
               <div className="flex justify-between items-center pt-3 border-t border-border font-bold text-text-main">
                  <span>Total a pagar:</span>
                  <span className="text-primary text-lg">{currentService?.price}</span>
               </div>
             </div>

             {/* Stripe CTA */}
             <div className="bg-white p-5 rounded-2xl shadow-sm border border-border space-y-3">
                <div className="flex items-center gap-2 mb-1">
                  <CreditCard size={18} className="text-text-muted" />
                  <h3 className="text-sm font-semibold text-text-main">Pago Seguro con Stripe</h3>
                </div>
                <p className="text-xs text-text-muted leading-relaxed">
                  Al hacer clic serás redirigido a la pasarela segura de Stripe para completar el pago con tarjeta de crédito o débito. No almacenamos datos de tu tarjeta.
                </p>

                {paymentError && (
                  <div className="text-sm text-red-500 bg-red-50 p-3 rounded-lg">{paymentError}</div>
                )}

                <Button 
                  size="lg" 
                  className="w-full"
                  disabled={isProcessing}
                  onClick={async () => {
                    setIsProcessing(true);
                    setPaymentError("");
                    try {
                      const res = await fetch('/api/create-checkout', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          serviceId: selectedServiceId,
                          therapistName: currentTherapist?.name,
                          date: selectedDate ? format(selectedDate, 'EEEE d MMMM yyyy', { locale: es }) : '',
                          time: selectedTime,
                          customerName: user?.user_metadata?.name || '',
                          customerEmail: user?.email || '',
                        }),
                      });
                      const data = await res.json();
                      if (data.url) {
                        window.location.href = data.url;
                      } else {
                        setPaymentError(data.error || 'Error al crear la sesión de pago');
                        setIsProcessing(false);
                      }
                    } catch (err) {
                      setPaymentError('Error de conexión. Intenta de nuevo.');
                      setIsProcessing(false);
                    }
                  }}
                >
                  {isProcessing ? (
                    <span className="flex items-center gap-2"><Loader2 size={18} className="animate-spin" /> Procesando...</span>
                  ) : (
                    `Pagar ${currentService?.price} con Stripe`
                  )}
                </Button>
             </div>

          </motion.div>
        )}

        {step === 5 && (
          <motion.div 
            key="step5"
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex flex-col items-center justify-center text-center -mt-8"
          >
            {/* Success Abstract Image background */}
            <div className="fixed inset-0 z-0 opacity-10 bg-cover bg-center pointer-events-none" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80&fit=crop")' }}></div>

            <div className="relative z-10 w-full flex flex-col items-center mt-12">
              <div className="w-20 h-20 bg-primary/20 text-primary rounded-full flex items-center justify-center mb-6 backdrop-blur-sm border border-primary/30">
                <CheckCircle2 size={40} />
              </div>
              <h2 className="text-2xl font-bold text-text-main mb-2">¡Completado!</h2>
              <p className="text-text-muted text-sm px-8 mb-8 text-balance">
                Tu primera sesión con {currentTherapist?.name.split(' ')[0]} ha sido garantizada. Revisaremos los detalles y enviaremos el link de acceso a tu correo muy pronto.
              </p>
              
              <div className="w-full bg-white p-6 rounded-2xl text-left shadow-sm border border-border mt-2 space-y-5 relative">
                  {/* Decorative tape/receipt effect at top */}
                  <div className="absolute -top-1 left-0 right-0 h-2 flex justify-around opacity-20">
                     {[...Array(20)].map((_, i) => (
                        <div key={i} className="w-2 h-2 rounded-full bg-border"></div>
                     ))}
                  </div>

                  <div className="flex items-center gap-4 border-b border-border pb-5 pt-2">
                      <div className="w-14 h-14 rounded-xl bg-secondary overflow-hidden shrink-0 border border-border">
                        <img src={currentTherapist?.imageUrl} alt={currentTherapist?.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-bold text-sm text-text-main">{currentTherapist?.name}</p>
                        <p className="text-xs font-semibold text-primary mt-1.5 capitalize">{selectedDate && format(selectedDate, 'EEEE, d MMMM yyyy', { locale: es })} • {selectedTime}</p>
                      </div>
                  </div>
                  
                  <div className="space-y-3">
                      <div>
                          <p className="text-[10px] uppercase font-semibold text-text-muted tracking-wider mb-1">Servicio Confirmado</p>
                          <p className="font-semibold text-sm text-text-main">{currentService?.title}</p>
                      </div>
                      
                      {/* Invoice Details */}
                      <div className="bg-app-bg rounded-xl p-4 mt-4 border border-border space-y-2">
                         <div className="flex justify-between items-center text-xs">
                             <span className="text-text-muted">Subtotal</span>
                             <span className="font-medium text-text-main">{currentService?.price}</span>
                         </div>
                         <div className="flex justify-between items-center text-xs">
                             <span className="text-text-muted">Impuestos</span>
                             <span className="font-medium text-text-main">$0.00</span>
                         </div>
                         <div className="flex justify-between items-center pt-2 border-t border-border/50 mt-1">
                             <span className="text-xs uppercase font-bold text-text-muted">Total Pagado</span>
                             <span className="font-bold text-primary">{currentService?.price}</span>
                         </div>
                         <div className="text-[9px] text-text-muted mt-3 pt-2 text-center uppercase tracking-wider font-mono">
                            Ref: #{Math.random().toString(36).substr(2, 9).toUpperCase()}
                         </div>
                      </div>
                  </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Show the Next buttons globally ONLY on steps 1 2 3 or step 5 back to home. At step 4, the form handles it. */}
      {step < 4 ? (
        <div className="mt-8">
          {(step === 1 && selectedTherapistId) || (step === 2 && selectedServiceId) || (step === 3 && selectedDate && selectedTime) ? (
            <Button onClick={handleNext} size="lg">
              {step === 3 ? "Continuar al pago" : "Confirmar y Continuar"}
            </Button>
          ) : (
            <Button disabled size="lg" className="opacity-50">Selecciona para continuar</Button>
          )}
        </div>
      ) : step === 5 ? (
        <div className="mt-12 relative z-10">
            <Button onClick={() => {
                setStep(1);
                setSelectedTherapistId(null);
                setSelectedServiceId(null);
                setSelectedDate(null);
                setSelectedTime(null);
            }} variant="outline" size="lg">Volver al inicio</Button>
        </div>
      ) : null}
    </div>
  );
}
