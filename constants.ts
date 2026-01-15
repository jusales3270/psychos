
import { QuizQuestion } from './types';

export const QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "Como você se sente quando o mercado financeiro cai 10% em um dia?",
    statusText: "Entendendo seu passado...",
    options: [
      { label: "Sinto uma pontada no peito e quero vender tudo.", value: "ansioso" },
      { label: "Fico desconfortável, mas tento não olhar o saldo.", value: "prudente" },
      { label: "Vejo como uma oportunidade de comprar mais barato.", value: "arrojado" },
      { label: "Nem fico sabendo, raramente acompanho as notícias.", value: "estoico" }
    ]
  },
  {
    id: 2,
    question: "Qual sua principal motivação para acumular dinheiro?",
    statusText: "Analisando seus medos...",
    options: [
      { label: "Ter o status e o poder que o dinheiro proporciona.", value: "conquistador" },
      { label: "Nunca mais precisar passar por privações.", value: "seguranca" },
      { label: "Comprar tempo para fazer o que eu realmente amo.", value: "liberdade" },
      { label: "Deixar um legado sólido para minha família.", value: "patriarca" }
    ]
  },
  {
    id: 3,
    question: "Ao ver uma promoção de algo que você deseja, você...",
    statusText: "Observando impulsos...",
    options: [
      { label: "Compra imediatamente antes que acabe.", value: "impulsivo" },
      { label: "Pesquisa se o preço realmente está bom.", value: "calculista" },
      { label: "Espera 24 horas para ver se ainda quer.", value: "consciente" },
      { label: "Ignora, a menos que fosse uma necessidade planejada.", value: "frugal" }
    ]
  }
];

export const ARCHETYPES: Record<string, { title: string; description: string; icon: string }> = {
  ansioso: {
    title: "Guardião Ansioso",
    description: "Você vê o dinheiro como um escudo que nunca parece forte o suficiente. Sua mente tende a focar na escassez futura, o que gera paralisia ou decisões precipitadas em momentos de crise.",
    icon: "🛡️"
  },
  estoico: {
    title: "Sábio Tranquilo",
    description: "Para você, o dinheiro é uma ferramenta neutra. Você entende que não pode controlar o mercado, apenas sua reação a ele. Seu foco está no que é essencial.",
    icon: "🏛️"
  },
  liberdade: {
    title: "Arquiteto da Liberdade",
    description: "Seu maior ativo não é sua conta bancária, é seu tempo. Você traduz cada centavo em horas de vida e liberdade de escolha.",
    icon: "🕊️"
  },
  // Default fallback
  default: {
    title: "Investidor Consciente",
    description: "Você busca o equilíbrio entre o prazer presente e a segurança futura, entendendo que a psicologia é a base de toda riqueza real.",
    icon: "⚖️"
  }
};
