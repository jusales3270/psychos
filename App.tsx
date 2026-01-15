
import React, { useState, useEffect, useCallback } from 'react';
import { Screen, UserState, HistoryItem } from './types';
import { QUESTIONS, ARCHETYPES } from './constants';
import { StoicButton } from './components/StoicButton';
import { FreedomBattery } from './components/FreedomBattery';
import { LineChart, Line, ResponsiveContainer, YAxis, XAxis, Tooltip } from 'recharts';
import { Search, Book, Wind, Settings, AlertCircle, ArrowLeft, RefreshCw, ChevronRight, Lightbulb, Target, CheckCircle2 } from 'lucide-react';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('SPLASH');
  const [quizStep, setQuizStep] = useState(0);
  const [user, setUser] = useState<UserState>({
    archetype: 'liberdade',
    autonomyMonths: 50,
    survivalCost: 3500,
    comfortCost: 7000,
    hourlyRate: 85,
    freedomPathPercentage: 7,
    futureLetter: "Respire. Você construiu isso para o longo prazo. O mercado é ruído, sua paz é o sinal."
  });

  const [history] = useState<HistoryItem[]>([
    { id: '1', date: 'Hoje, 14:20', action: 'Avaliação: Novo Smartphone', impact: '140h de trabalho', outcome: 'paz' },
    { id: '2', date: 'Ontem, 09:15', action: 'Gasto: Café Especial', impact: '15min de liberdade', outcome: 'neutro' },
    { id: '3', date: '24 Out', action: 'Decisão: Cancelar Assinatura Stream', impact: '+2h/mês de liberdade', outcome: 'paz' },
    { id: '4', date: '20 Out', action: 'Avaliação: Tênis de Corrida', impact: '12h de trabalho', outcome: 'friccao' },
  ]);

  const [loading, setLoading] = useState(false);
  const [purchaseValue, setPurchaseValue] = useState<string>('');
  const [panicTimer, setPanicTimer] = useState(60);
  const [isBreathing, setIsBreathing] = useState(false);
  
  // Goals Screen State
  const [goalName, setGoalName] = useState('');
  const [goalValue, setGoalValue] = useState('');
  const [goalSaved, setGoalSaved] = useState(false);

  // Transitions
  const navigate = (screen: Screen) => {
    setLoading(true);
    setTimeout(() => {
      setCurrentScreen(screen);
      setLoading(false);
      setGoalSaved(false); // Reset goal state on navigation
    }, 400);
  };

  // Impulse Brake logic
  const handleCalculateImpact = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Intentional friction
  };

  const handleSaveGoal = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setGoalSaved(true);
      setTimeout(() => navigate('DASHBOARD'), 2000);
    }, 1500); // intentional friction to "contemplate" the goal
  };

  // Panic timer logic
  useEffect(() => {
    let interval: any;
    if (isBreathing && panicTimer > 0) {
      interval = setInterval(() => {
        setPanicTimer(t => t - 1);
      }, 1000);
    } else if (panicTimer === 0) {
      setIsBreathing(false);
    }
    return () => clearInterval(interval);
  }, [isBreathing, panicTimer]);

  // Mock Market Data for Panic Mode
  const marketData = Array.from({ length: 20 }, (_, i) => ({
    year: 2004 + i,
    value: Math.random() * 50 + 50 + i * 5
  }));

  const renderScreen = () => {
    if (loading && currentScreen !== 'IMPULSE_BRAKE') {
       return (
         <div className="flex flex-col items-center justify-center min-h-screen bg-stoic-paper transition-opacity duration-500">
           <div className="w-12 h-12 border-2 border-stoic-charcoal/20 border-t-stoic-charcoal rounded-full animate-spin mb-4"></div>
           <p className="font-serif italic text-stoic-charcoal/60">Sintonizando intenções...</p>
         </div>
       );
    }

    switch (currentScreen) {
      case 'SPLASH':
        return (
          <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center fade-in bg-stoic-paper">
            <div className="mb-12">
              <h1 className="text-4xl font-serif font-bold tracking-tighter text-stoic-charcoal mb-2">PsychOS</h1>
              <div className="w-8 h-[2px] bg-stoic-gold mx-auto"></div>
            </div>
            <p className="text-2xl font-serif italic text-stoic-charcoal mb-16 max-w-xs leading-relaxed">
              "Sua psicologia é seu principal ativo."
            </p>
            <StoicButton onClick={() => navigate('QUIZ')}>
              Iniciar Calibração
            </StoicButton>
          </div>
        );

      case 'QUIZ':
        const q = QUESTIONS[quizStep];
        return (
          <div className="min-h-screen p-8 flex flex-col justify-between bg-stoic-paper fade-in">
            <div className="pt-8">
               <p className="font-mono text-[10px] uppercase tracking-widest text-stoic-charcoal/40 mb-2">
                 {q.statusText}
               </p>
               <div className="w-full h-[1px] bg-stoic-border">
                  <div 
                    className="h-full bg-stoic-charcoal transition-all duration-700"
                    style={{ width: `${((quizStep + 1) / QUESTIONS.length) * 100}%` }}
                  ></div>
               </div>
            </div>
            
            <div className="max-w-md mx-auto w-full">
              <h2 className="text-3xl font-serif leading-tight text-stoic-charcoal mb-12">
                {q.question}
              </h2>
              <div className="space-y-4">
                {q.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      if (quizStep < QUESTIONS.length - 1) {
                        setQuizStep(s => s + 1);
                      } else {
                        navigate('RESULT');
                      }
                    }}
                    className="w-full p-6 text-left border border-stoic-border bg-white hover:border-stoic-charcoal transition-all duration-300 group"
                  >
                    <span className="text-lg font-serif group-hover:italic">{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="pb-8"></div>
          </div>
        );

      case 'RESULT':
        const profile = ARCHETYPES[user.archetype] || ARCHETYPES.default;
        return (
          <div className="min-h-screen p-8 flex flex-col items-center justify-center text-center bg-stoic-paper fade-in">
            <div className="text-6xl mb-8 opacity-80 animate-pulse">{profile.icon}</div>
            <h2 className="text-sm font-mono uppercase tracking-[0.3em] text-stoic-gold mb-4">Seu Arquétipo</h2>
            <h1 className="text-4xl font-serif font-bold text-stoic-charcoal mb-8">{profile.title}</h1>
            <p className="text-lg font-serif leading-relaxed text-stoic-charcoal/80 max-w-sm mb-16 italic">
              "{profile.description}"
            </p>
            <StoicButton onClick={() => navigate('DASHBOARD')}>
              Entrar no meu Sistema
            </StoicButton>
          </div>
        );

      case 'DASHBOARD':
        return (
          <div className="min-h-screen bg-stoic-paper flex flex-col fade-in">
            {/* Header */}
            <div className="p-8 pb-4 flex justify-between items-center">
               <div>
                  <h1 className="text-xl font-serif font-bold">PsychOS</h1>
                  <p className="text-[10px] font-mono uppercase text-stoic-charcoal/40">Status: Equilíbrio</p>
               </div>
               <button onClick={() => navigate('CALCULATOR')} className="p-2 hover:bg-stoic-border rounded-full transition-colors">
                  <Settings size={20} className="text-stoic-charcoal" />
               </button>
            </div>

            <div className="px-8 mt-8 space-y-8 flex-1">
              {/* Freedom Battery */}
              <section>
                <FreedomBattery 
                  percentage={user.freedomPathPercentage}
                  label="4 Anos e 2 Meses"
                  subLabel="Autonomia Acumulada"
                />
                <p className="text-[10px] font-mono text-stoic-charcoal/40 mt-4 uppercase tracking-widest">
                  7% do caminho para a Independência Total
                </p>
              </section>

              {/* Status Card */}
              <section className="bg-white border border-stoic-border p-8 relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-xs font-mono uppercase text-stoic-charcoal/40 mb-4 tracking-widest">Status do Sono</h3>
                  <p className="text-xl font-serif text-stoic-charcoal leading-snug">
                    Nível de Risco Atual: <span className="text-stoic-gold italic">Baixo</span>.
                    <br />
                    <span className="text-sm text-stoic-charcoal/60">Você pode dormir tranquilo hoje.</span>
                  </p>
                </div>
                <div className="absolute right-0 top-0 bottom-0 w-2 bg-stoic-gold opacity-10"></div>
              </section>

              {/* Daily Psychology Insight Widget */}
              <section className="bg-stoic-paper border border-stoic-border p-6 flex gap-4 items-start">
                <div className="p-2 bg-stoic-gold/10 rounded-sm">
                  <Lightbulb size={20} className="text-stoic-gold" />
                </div>
                <div>
                  <h3 className="text-[10px] font-mono uppercase text-stoic-charcoal/40 mb-2 tracking-widest">Insight do Dia</h3>
                  <p className="text-sm font-serif italic text-stoic-charcoal/80 leading-relaxed">
                    "Lembre-se de diferenciar necessidades de desejos. O que você compra hoje é tempo que você entrega amanhã."
                  </p>
                </div>
              </section>

              {/* View All Actions Link */}
              <div className="flex justify-center -mb-2">
                <button 
                  onClick={() => navigate('HISTORY')}
                  className="group flex items-center gap-1 text-[10px] font-mono uppercase tracking-[0.2em] text-stoic-charcoal/60 hover:text-stoic-charcoal transition-all"
                >
                  Ver Todas as Ações
                  <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 gap-4">
                <button 
                  onClick={() => navigate('IMPULSE_BRAKE')}
                  className="flex items-center justify-between p-6 border border-stoic-charcoal bg-stoic-charcoal text-stoic-paper hover:opacity-95 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <Search size={20} className="text-stoic-gold" />
                    <span className="font-serif text-lg">Avaliar um Gasto</span>
                  </div>
                </button>
                <button 
                  className="flex items-center justify-between p-6 border border-stoic-border bg-white text-stoic-charcoal hover:border-stoic-charcoal transition-all"
                >
                  <div className="flex items-center gap-4">
                    <Book size={20} className="text-stoic-charcoal/40" />
                    <span className="font-serif text-lg">Diário de Decisões</span>
                  </div>
                </button>
                <button 
                  onClick={() => navigate('GOALS')}
                  className="flex items-center justify-between p-6 border border-stoic-border bg-white text-stoic-charcoal hover:border-stoic-charcoal transition-all"
                >
                  <div className="flex items-center gap-4">
                    <Target size={20} className="text-stoic-gold" />
                    <span className="font-serif text-lg">Adicionar Meta Financeira</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Emergency Button */}
            <div className="p-8 mt-auto">
              <button 
                onClick={() => navigate('PANIC_MODE')}
                className="w-full flex items-center justify-center gap-2 py-4 text-stoic-terracotta text-xs font-mono uppercase tracking-[0.2em] hover:opacity-70 transition-opacity"
              >
                <AlertCircle size={14} />
                Estou em Pânico
              </button>
            </div>
          </div>
        );

      case 'GOALS':
        return (
          <div className="min-h-screen p-8 bg-stoic-paper fade-in flex flex-col">
             <button onClick={() => navigate('DASHBOARD')} className="mb-12 flex items-center gap-2 text-stoic-charcoal/60 hover:text-stoic-charcoal transition-colors">
                <ArrowLeft size={18} />
                <span className="font-mono text-xs uppercase tracking-widest">Voltar</span>
             </button>
             
             {goalSaved ? (
               <div className="flex-1 flex flex-col items-center justify-center text-center fade-in">
                  <CheckCircle2 size={64} className="text-stoic-gold mb-6 animate-pulse" />
                  <h2 className="text-3xl font-serif mb-4">Meta Fixada</h2>
                  <p className="text-stoic-charcoal/60 font-serif italic">Seu futuro eu agradece pela clareza.</p>
               </div>
             ) : (
               <>
                 <h2 className="text-4xl font-serif mb-12 leading-tight">Nova Meta de Liberdade</h2>
                 
                 <div className="space-y-12 flex-1">
                    <div className="space-y-4">
                      <label className="block text-xs font-mono uppercase tracking-widest text-stoic-charcoal/60">Nome da Meta</label>
                      <input 
                        type="text" 
                        value={goalName}
                        onChange={(e) => setGoalName(e.target.value)}
                        placeholder="Ex: Reserva de Emergência"
                        className="w-full bg-transparent border-b border-stoic-border py-4 text-2xl font-serif focus:outline-none focus:border-stoic-gold transition-colors placeholder:text-stoic-border" 
                      />
                    </div>

                    <div className="space-y-4">
                      <label className="block text-xs font-mono uppercase tracking-widest text-stoic-charcoal/60">Valor do Objetivo</label>
                      <input 
                        type="number" 
                        value={goalValue}
                        onChange={(e) => setGoalValue(e.target.value)}
                        placeholder="0.00"
                        className="w-full bg-transparent border-b border-stoic-border py-4 text-3xl font-mono focus:outline-none focus:border-stoic-gold transition-colors placeholder:text-stoic-border" 
                      />
                      <p className="text-xs text-stoic-charcoal/40 italic">Iremos traduzir isso em "Dias de Paz".</p>
                    </div>

                    <div className="pt-12">
                       <StoicButton 
                        className="w-full" 
                        onClick={handleSaveGoal}
                        disabled={!goalName || !goalValue}
                       >
                          Fixar Meta no Horizonte
                       </StoicButton>
                    </div>
                 </div>
               </>
             )}
          </div>
        );

      case 'HISTORY':
        return (
          <div className="min-h-screen p-8 bg-stoic-paper fade-in flex flex-col">
            <button onClick={() => navigate('DASHBOARD')} className="mb-12 flex items-center gap-2 text-stoic-charcoal/60 hover:text-stoic-charcoal transition-colors">
              <ArrowLeft size={18} />
              <span className="font-mono text-xs uppercase tracking-widest">Voltar</span>
            </button>
            
            <h2 className="text-4xl font-serif mb-12">Histórico de Decisões</h2>

            <div className="flex-1 space-y-6 overflow-y-auto">
              {history.map((item) => (
                <div key={item.id} className="p-6 bg-white border border-stoic-border flex flex-col gap-2 relative group overflow-hidden">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-mono text-stoic-charcoal/40 uppercase tracking-widest">{item.date}</span>
                    <div className={`w-2 h-2 rounded-full ${
                      item.outcome === 'paz' ? 'bg-stoic-gold' : item.outcome === 'friccao' ? 'bg-stoic-terracotta' : 'bg-stoic-border'
                    }`}></div>
                  </div>
                  <h3 className="font-serif text-lg text-stoic-charcoal">{item.action}</h3>
                  <p className="text-sm font-mono text-stoic-charcoal/60">{item.impact}</p>
                  
                  {/* Subtle accent on the left for results that brought 'Paz' */}
                  {item.outcome === 'paz' && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-stoic-gold/30"></div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-12 text-center text-[10px] font-mono uppercase tracking-widest text-stoic-charcoal/20">
              Fim das reflexões registradas
            </div>
          </div>
        );

      case 'CALCULATOR':
        return (
          <div className="min-h-screen p-8 bg-stoic-paper fade-in">
             <button onClick={() => navigate('DASHBOARD')} className="mb-12 flex items-center gap-2 text-stoic-charcoal/60 hover:text-stoic-charcoal transition-colors">
                <ArrowLeft size={18} />
                <span className="font-mono text-xs uppercase tracking-widest">Voltar</span>
             </button>
             
             <h2 className="text-4xl font-serif mb-12">Calibrar Estilo de Vida</h2>
             
             <div className="space-y-12">
                <div className="space-y-4">
                  <label className="block text-xs font-mono uppercase tracking-widest text-stoic-charcoal/60">Custo de Sobrevivência (Mensal)</label>
                  <input 
                    type="number" 
                    value={user.survivalCost}
                    onChange={(e) => setUser({...user, survivalCost: Number(e.target.value)})}
                    className="w-full bg-transparent border-b border-stoic-border py-4 text-3xl font-mono focus:outline-none focus:border-stoic-gold transition-colors" 
                  />
                  <p className="text-xs text-stoic-charcoal/40 italic">Aluguel, comida básica, saúde.</p>
                </div>

                <div className="space-y-4">
                  <label className="block text-xs font-mono uppercase tracking-widest text-stoic-charcoal/60">Custo de Conforto (Mensal)</label>
                  <input 
                    type="number" 
                    value={user.comfortCost}
                    onChange={(e) => setUser({...user, comfortCost: Number(e.target.value)})}
                    className="w-full bg-transparent border-b border-stoic-border py-4 text-3xl font-mono focus:outline-none focus:border-stoic-gold transition-colors" 
                  />
                  <p className="text-xs text-stoic-charcoal/40 italic">Viagens, hobbies, luxos.</p>
                </div>

                <div className="pt-12 border-t border-stoic-border">
                   <p className="text-xs font-mono text-stoic-charcoal/40 uppercase mb-4">Estimativa de Liberdade</p>
                   <p className="text-3xl font-serif">Outubro, 2042</p>
                </div>
                
                <StoicButton className="w-full" onClick={() => navigate('DASHBOARD')}>
                   Salvar Configurações
                </StoicButton>
             </div>
          </div>
        );

      case 'IMPULSE_BRAKE':
        const impactHours = purchaseValue ? Math.round(Number(purchaseValue) / user.hourlyRate) : 0;
        const impactWeeks = purchaseValue ? (Number(purchaseValue) / (user.survivalCost / 4)).toFixed(1) : 0;

        return (
          <div className={`min-h-screen p-8 transition-colors duration-1000 ${loading ? 'bg-stoic-terracotta/10' : 'bg-stoic-paper'} fade-in`}>
             <button onClick={() => navigate('DASHBOARD')} className="mb-12 flex items-center gap-2 text-stoic-charcoal/60">
                <ArrowLeft size={18} />
                <span className="font-mono text-xs uppercase tracking-widest">Cancelar</span>
             </button>

             {!loading && !purchaseValue && (
                <div className="fade-in">
                  <h2 className="text-4xl font-serif mb-8 leading-tight">Quanto custa este desejo?</h2>
                  <input 
                    autoFocus
                    type="number"
                    placeholder="0.00"
                    onChange={(e) => setPurchaseValue(e.target.value)}
                    className="w-full bg-transparent border-b border-stoic-border py-8 text-6xl font-mono focus:outline-none focus:border-stoic-charcoal transition-all placeholder:text-stoic-border"
                  />
                  <div className="mt-12">
                    <StoicButton variant="primary" className="w-full" onClick={handleCalculateImpact} disabled={!purchaseValue}>
                       Calcular Impacto
                    </StoicButton>
                  </div>
                </div>
             )}

             {loading && (
               <div className="flex flex-col items-center justify-center py-20 fade-in">
                  <div className="w-full bg-stoic-border h-1 mb-8">
                     <div className="h-full bg-stoic-terracotta slow-progress" style={{ width: '100%' }}></div>
                  </div>
                  <p className="font-serif italic text-stoic-charcoal/60">Respire fundo. Analisando o tempo necessário para esta troca...</p>
               </div>
             )}

             {!loading && purchaseValue && (
               <div className="fade-in space-y-12">
                  <div className="p-8 bg-white border border-stoic-terracotta/30">
                     <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-stoic-terracotta mb-8">O Custo Real</h3>
                     <div className="space-y-8">
                        <div>
                           <p className="text-5xl font-serif text-stoic-charcoal mb-2">{impactHours} Horas</p>
                           <p className="text-xs font-mono text-stoic-charcoal/40 uppercase">Do seu trabalho focado</p>
                        </div>
                        <div className="w-8 h-[1px] bg-stoic-border"></div>
                        <div>
                           <p className="text-5xl font-serif text-stoic-charcoal mb-2">{impactWeeks} Semanas</p>
                           <p className="text-xs font-mono text-stoic-charcoal/40 uppercase">Adia sua liberdade total em</p>
                        </div>
                     </div>
                  </div>

                  <div className="space-y-4">
                    <StoicButton variant="primary" className="w-full" onClick={() => { setPurchaseValue(''); navigate('DASHBOARD'); }}>
                      Não vale a pena
                    </StoicButton>
                    <button 
                       onClick={() => alert("Justificativa exigida: Por que isso é essencial agora?")}
                       className="w-full py-4 text-stoic-charcoal/40 text-xs font-mono uppercase tracking-widest hover:text-stoic-charcoal transition-colors"
                    >
                      Comprar mesmo assim
                    </button>
                  </div>
               </div>
             )}
          </div>
        );

      case 'PANIC_MODE':
        return (
          <div className="min-h-screen bg-stoic-slate p-8 text-stoic-paper fade-in flex flex-col">
            <div className="mb-12 flex justify-between items-center">
               <h2 className="text-xs font-mono uppercase tracking-[0.3em] text-stoic-gold">Protocolo de Pânico</h2>
               <button onClick={() => navigate('DASHBOARD')} className="text-stoic-paper/40 hover:text-stoic-paper">
                 <ArrowLeft size={20} />
               </button>
            </div>

            <div className="flex-1 space-y-12">
              {/* Future Letter */}
              <section className="p-8 border border-stoic-paper/10 bg-stoic-paper/5">
                <h3 className="text-[10px] font-mono uppercase tracking-widest text-stoic-gold/60 mb-6 italic">Carta do seu Eu do Passado</h3>
                <p className="text-xl font-serif italic leading-relaxed opacity-90">
                  "{user.futureLetter}"
                </p>
              </section>

              {/* Long Term Graph */}
              <section className="h-64">
                <div className="flex justify-between items-end mb-4">
                  <h3 className="text-[10px] font-mono uppercase tracking-widest opacity-40">50 Anos de Mercado</h3>
                  <span className="text-[10px] font-mono text-stoic-gold">Ruído vs. Sinal</span>
                </div>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={marketData}>
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#D4AF37" 
                      strokeWidth={1} 
                      dot={false}
                      opacity={0.6}
                    />
                    <XAxis hide />
                    <YAxis hide />
                  </LineChart>
                </ResponsiveContainer>
                <div className="mt-2 flex justify-end">
                   <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-stoic-gold rounded-full animate-ping"></div>
                      <p className="text-[10px] font-mono opacity-60">VOCÊ ESTÁ AQUI</p>
                   </div>
                </div>
              </section>

              {/* Breathing Tool */}
              <section className="flex flex-col items-center text-center">
                 {!isBreathing ? (
                   <div className="fade-in">
                     <p className="text-sm font-serif mb-8 opacity-60">Nada precisa ser decidido agora.</p>
                     <button 
                       onClick={() => setIsBreathing(true)}
                       className="w-32 h-32 rounded-full border border-stoic-gold flex items-center justify-center group hover:bg-stoic-gold/10 transition-all"
                     >
                       <Wind size={32} className="text-stoic-gold group-hover:scale-110 transition-transform" />
                     </button>
                     <p className="text-[10px] font-mono uppercase tracking-widest mt-6 text-stoic-gold">Respirar (60s)</p>
                   </div>
                 ) : (
                   <div className="fade-in flex flex-col items-center">
                      <div className="text-6xl font-mono text-stoic-gold mb-8 animate-pulse">{panicTimer}s</div>
                      <p className="text-2xl font-serif italic opacity-80 animate-bounce">Inspire... Expire...</p>
                      {panicTimer === 0 && (
                        <StoicButton variant="secondary" className="mt-12" onClick={() => navigate('DASHBOARD')}>
                           Recuperei minha Paz
                        </StoicButton>
                      )}
                   </div>
                 )}
              </section>
            </div>

            <div className="mt-12 pb-8 text-center">
               <p className="text-[10px] font-mono uppercase tracking-widest opacity-20">Saldos bloqueados por segurança psicológica</p>
            </div>
          </div>
        );

      default:
        return <div>Error</div>;
    }
  };

  return (
    <main className="max-w-md mx-auto min-h-screen relative shadow-2xl bg-stoic-paper">
      {renderScreen()}
    </main>
  );
};

export default App;
