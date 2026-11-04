/**
 * Motor do funil "Mounjaro de Chia" — portado do app original
 * (chia-journey-quiz.lovable.app), que rodava este mesmo motor vanilla
 * dentro de um componente React via useEffect.
 *
 * mountFunnel(shell, bar) monta o funil no #shell/#bar e devolve a limpeza.
 */

export function mountFunnel(shell: HTMLElement, bar: HTMLElement): () => void {
  const g = shell;
  const _ = bar;

  // ---------- registries (timers / raf / listeners) ----------
  let dead = false;
  const timeouts = new Set<number>();
  const intervals = new Set<number>();
  const rafs = new Set<number>();
  const unlisten: Array<() => void> = [];

  const a = (fn: () => void, ms: number): number => {
    const id = window.setTimeout(() => {
      timeouts.delete(id);
      if (!dead) fn();
    }, ms);
    timeouts.add(id);
    return id;
  };
  const o = (fn: () => void, ms: number): number => {
    const id = window.setInterval(() => {
      if (!dead) fn();
    }, ms);
    intervals.add(id);
    return id;
  };
  const s = (id: number) => {
    window.clearInterval(id);
    intervals.delete(id);
  };
  const c = (fn: (t: number) => void): number => {
    const id = window.requestAnimationFrame((t) => {
      rafs.delete(id);
      if (!dead) fn(t);
    });
    rafs.add(id);
    return id;
  };
  const l = (el: EventTarget, ev: string, fn: EventListener) => {
    el.addEventListener(ev, fn);
    unlisten.push(() => el.removeEventListener(ev, fn));
  };

  // ---------- config ----------
  const u: any = {
    converteAccount: `8a78927a-f5df-45c8-8e42-bda81b07c076`,
    vsl1: { player: `6a9d761f0323ec21970be8cd`, revealAt: 540 },
    vsl1B: { player: `6a9d761f0323ec21970be8cd`, revealAt: 540 },
    vslFinal: { player: `6a32cd541659071cf31f4c44`, revealAt: 260 },
    vslFinalB: { player: `6a32cd541659071cf31f4c44`, revealAt: 260 },
    ofertasA: [
      {
        image: `oferta-b-padrao.webp`,
        checkout: `https://pay.kursinha.com/c/6ac7567333d6d14088f114b9`,
        cta: `QUERO O PLANO COMPLETO — R$47`,
        alt: `Plano Completo do Mounjaro de Chia por R$47,00`,
        evento: `checkout_click_padrao`,
      },
      {
        image: `oferta-b-premium.webp`,
        checkout: `https://pay.kursinha.com/c/6ac7567333d6d14088f114b9`,
        cta: `QUERO O PLANO PREMIUM — R$97`,
        alt: `Plano Premium Completo do Mounjaro de Chia por R$97,00`,
        evento: `checkout_click_premium`,
      },
    ],
    ofertasB: [
      {
        image: `oferta-b-padrao.webp`,
        checkout: `https://pay.kursinha.com/c/6ac7567333d6d14088f114b9`,
        cta: `QUERO O PLANO COMPLETO — R$47`,
        alt: `Plano Completo do Mounjaro de Chia por R$47,00`,
        evento: `checkout_click_padrao`,
      },
      {
        image: `oferta-b-premium.webp`,
        checkout: `https://pay.kursinha.com/c/6ac7567333d6d14088f114b9`,
        cta: `QUERO O PLANO PREMIUM — R$97`,
        alt: `Plano Premium Completo do Mounjaro de Chia por R$97,00`,
        evento: `checkout_click_premium`,
      },
    ],
  };

  const d: Record<string, string> = {
    "area-f-bracos.webp": `/funnel/area-f-bracos.webp`,
    "animacao-antes-m.webp": `/funnel/animacao-antes-m.webp`,
    "animacao-depois-m.webp": `/funnel/animacao-depois-m.webp`,
    "area-f-abdomen.webp": `/funnel/area-f-abdomen.webp`,
    "animacao-depois.webp": `/funnel/animacao-depois.webp`,
    "animacao-antes.webp": `/funnel/animacao-antes.webp`,
    "area-f-flancos.webp": `/funnel/area-f-flancos.webp`,
    "area-f-peito.webp": `/funnel/area-f-peito.webp`,
    "carrossel-1.webp": `/funnel/carrossel-1.webp`,
    "carrossel-2.webp": `/funnel/carrossel-2.webp`,
    "area-m-flancos.webp": `/funnel/area-m-flancos.webp`,
    "area-m-peito.webp": `/funnel/area-m-peito.webp`,
    "area-m-bracos.webp": `/funnel/area-m-bracos.webp`,
    "carrossel-4.webp": `/funnel/carrossel-4.webp`,
    "carrossel-3.webp": `/funnel/carrossel-3.webp`,
    "area-m-abdomen.webp": `/funnel/area-m-abdomen.webp`,
    "corpo-m-flacido.webp": `/funnel/corpo-m-flacido.webp`,
    "corpo-m-regular.webp": `/funnel/corpo-m-regular.webp`,
    "corpo-m-sobrepeso.webp": `/funnel/corpo-m-sobrepeso.webp`,
    "corpo-f-regular.webp": `/funnel/corpo-f-regular.webp`,
    "genero-mulher.webp": `/funnel/genero-mulher.webp`,
    "genero-homem.webp": `/funnel/genero-homem.webp`,
    "corpo-f-flacido.webp": `/funnel/corpo-f-flacido.webp`,
    "corpo-f-sobrepeso.webp": `/funnel/corpo-f-sobrepeso.webp`,
    "intro-poster.jpg": `/funnel/intro-poster.jpg`,
    "intro.mp4": `/funnel/intro.mp4`,
    "oferta-b-premium.webp": `/funnel/oferta-b-premium.webp`,
    "oferta-b-padrao.webp": `/funnel/oferta-b-padrao.webp`,
    "oferta-exclusiva.png": `/funnel/oferta-exclusiva.png`,
    "oferta-exclusiva-5000.png": `/funnel/oferta-exclusiva-5000.png`,
    "logo-tema.webp": `/funnel/logo-tema.webp`,
    "images_2.jpeg": `/funnel/images_2.jpeg`,
    "images_3.jpeg": `/funnel/images_3.jpeg`,
    "images_4.jpeg": `/funnel/images_4.jpeg`,
    "images_5.jpeg": `/funnel/images_5.jpeg`,
    "images_7.jpeg": `/funnel/images_7.jpeg`,
  };
  const f = (name: string) => d[name] ?? ``;

  // ---------- etapas ----------
  const p: any[] = [
    {
      id: `meta-peso`,
      type: `quiz`,
      title: `Quantos quilos você deseja perder com o Mounjaro de Chia?`,
      layout: `emoji`,
      cols: 1,
      options: [
        { emoji: `🎯`, title: `Até 5Kg` },
        { emoji: `💪`, title: `6 a 10 Kg` },
        { emoji: `🔥`, title: `11 a 15 Kg` },
        { emoji: `⚡`, title: `16 a 20 Kg` },
        { emoji: `🚀`, title: `Mais de 20 Kg` },
      ],
    },
    {
      id: `genero`,
      type: `quiz`,
      title: `Qual seu gênero?`,
      subtitle: `Selecione abaixo para personalizarmos seu protocolo`,
      layout: `image`,
      cols: 2,
      options: [
        { value: `f`, title: `Mulher`, image: `genero-mulher.webp` },
        { value: `m`, title: `Homem`, image: `genero-homem.webp` },
      ],
    },
    {
      id: `idade`,
      type: `quiz`,
      title: `Qual é a sua idade?`,
      layout: `emoji`,
      cols: 1,
      optionsBy: {
        f: [
          { emoji: `👧`, title: `Menos de 25` },
          { emoji: `👩`, title: `25 a 34` },
          { emoji: `👱‍♀️`, title: `35 a 44` },
          { emoji: `🧑‍🦳`, title: `45 a 54` },
          { emoji: `👵`, title: `55+` },
        ],
        m: [
          { emoji: `👦`, title: `Menos de 25` },
          { emoji: `👨`, title: `25 a 34` },
          { emoji: `🧔`, title: `35 a 44` },
          { emoji: `👨‍🦳`, title: `45 a 54` },
          { emoji: `👴`, title: `55+` },
        ],
      },
    },
    {
      id: `tipo-corpo`,
      type: `quiz`,
      title: `Como você classificaria seu corpo hoje?`,
      layout: `thumb`,
      cols: 1,
      optionsBy: {
        f: [
          { title: `Regular`, subtitle: `Peso Normal`, image: `corpo-f-regular.webp` },
          { title: `Flácido`, subtitle: `Pouca Firmeza`, image: `corpo-f-flacido.webp` },
          { title: `Sobrepeso`, subtitle: `Gordura Visível`, image: `corpo-f-sobrepeso.webp` },
        ],
        m: [
          { title: `Regular`, subtitle: `Peso Normal`, image: `corpo-m-regular.webp` },
          { title: `Flácido`, subtitle: `Pouca Firmeza`, image: `corpo-m-flacido.webp` },
          { title: `Sobrepeso`, subtitle: `Gordura Visível`, image: `corpo-m-sobrepeso.webp` },
        ],
      },
    },
    {
      id: `area-gordura`,
      type: `quiz`,
      multi: true,
      title: `Em quais áreas você gostaria de reduzir mais gordura?`,
      subtitle: `Pode marcar mais de uma`,
      layout: `thumb-top`,
      cols: 2,
      optionsBy: {
        f: [
          { title: `Abdômen`, image: `area-f-abdomen.webp` },
          { title: `Peito`, image: `area-f-peito.webp` },
          { title: `Flancos`, image: `area-f-flancos.webp` },
          { title: `Braços`, image: `area-f-bracos.webp` },
        ],
        m: [
          { title: `Abdômen`, image: `area-m-abdomen.webp` },
          { title: `Peito`, image: `area-m-peito.webp` },
          { title: `Flancos`, image: `area-m-flancos.webp` },
          { title: `Braços`, image: `area-m-bracos.webp` },
        ],
      },
    },
    {
      id: `analise-1`,
      type: `loading`,
      seconds: 6,
      title: `Analisando suas respostas...`,
      subtitleBy: {
        f: `Comparando seu perfil com o de mulheres {{faixa}} que também queriam reduzir {{area}}.`,
        m: `Comparando seu perfil com o de homens {{faixa}} que também queriam reduzir {{area}}.`,
      },
      checks: [
        `Mapeando seu perfil: {{corpo}}, foco em {{area}}`,
        `Comparando com quem perdeu {{delta}} kg no protocolo`,
        `Ajustando o cálculo para quem está {{faixa}}`,
      ],
    },
    {
      id: `vsl-1`,
      type: `vsl`,
      video: `vsl1`,
      hintBy: {
        by: `meta-peso`,
        "Até 5Kg": `Assista até o final para receber a receita ajustada para eliminar os últimos {{delta}} kg e definir {{area}}...`,
        default: `Assista até o final para receber a receita ajustada para perder {{delta}} kg e reduzir {{area}}...`,
      },
      cta: `PERSONALIZAR MINHA RECEITA`,
    },
    {
      id: `peso-atual`,
      type: `measure`,
      title: `Qual é o seu peso atual?`,
      kind: `weight`,
      min: 50,
      max: 250,
      initial: 80,
      step: 1,
      hint: `Baseado nisso, ajustaremos a dosagem ideal para os melhores resultados!`,
      drag: `Arraste para ajustar o seu peso`,
      cta: `CONTINUAR`,
    },
    {
      id: `altura`,
      type: `measure`,
      title: `Qual é a sua altura?`,
      kind: `height`,
      min: 100,
      max: 250,
      initial: 160,
      step: 1,
      hint: `Usaremos sua altura para calcular seu IMC e personalizar o protocolo.`,
      drag: `Arraste para ajustar`,
      cta: `CONTINUAR`,
    },
    {
      id: `peso-objetivo`,
      type: `measure`,
      title: `Qual é o seu objetivo de peso?`,
      kind: `weight`,
      min: 50,
      max: 250,
      initial: 65,
      step: 1,
      hint: `Baseado nisso, ajustaremos a dosagem ideal para os melhores resultados!`,
      drag: `Arraste para ajustar o seu peso`,
      cta: `CONTINUAR`,
    },
    {
      id: `impacto`,
      type: `quiz`,
      title: `Como o seu peso impacta sua vida hoje?`,
      layout: `emoji`,
      cols: 1,
      optionsBy: {
        f: [
          { emoji: `📷`, title: `Evito tirar fotos por vergonha` },
          { emoji: `💔`, title: `Meu parceiro não me olha mais com desejo` },
          { emoji: `😞`, title: `Me sinto menos confiante` },
          { emoji: `🏠`, title: `Evito encontros ou situações sociais` },
          { emoji: `😴`, title: `Afeta minha energia e disposição` },
          { emoji: `✋`, title: `Nenhuma dessas` },
        ],
        m: [
          { emoji: `📷`, title: `Evito tirar fotos por vergonha` },
          { emoji: `💔`, title: `Minha parceira não me olha mais com desejo` },
          { emoji: `😞`, title: `Me sinto menos confiante` },
          { emoji: `🏠`, title: `Evito encontros ou situações sociais` },
          { emoji: `😴`, title: `Afeta minha energia e disposição` },
          { emoji: `✋`, title: `Nenhuma dessas` },
        ],
      },
    },
    {
      id: `satisfacao`,
      type: `quiz`,
      titleBy: {
        f: `Você está realmente satisfeita com sua aparência?`,
        m: `Você está realmente satisfeito com sua aparência?`,
      },
      layout: `emoji`,
      cols: 1,
      options: [
        { emoji: `😔`, title: `Não, me sinto acima do peso` },
        { emoji: `🤔`, title: `Mais ou menos, sei que posso melhorar` },
        { emoji: `💪`, title: `Não, quero mudar meu corpo e minha confiança` },
      ],
    },
    {
      id: `barreira`,
      type: `quiz`,
      title: `O que mais te impede de emagrecer hoje?`,
      layout: `emoji`,
      cols: 1,
      options: [
        { emoji: `⏰`, title: `Falta de tempo / rotina corrida` },
        { emoji: `🍕`, title: `Falta de autocontrole` },
        { emoji: `😤`, title: `Já tentei de tudo e nada funciona` },
        { emoji: `💸`, title: `Alimentação cara ou difícil` },
      ],
    },
    {
      id: `agua`,
      type: `quiz`,
      title: `Quantos litros de água você costuma beber por dia?`,
      layout: `emoji`,
      cols: 1,
      options: [
        { emoji: `☕`, title: `Bebo só café / pouca água` },
        { emoji: `💧`, title: `Até 2 litros` },
        { emoji: `💦`, title: `Entre 2 e 3 litros` },
        { emoji: `🌊`, title: `Mais de 3 litros` },
      ],
    },
    {
      id: `sono`,
      type: `quiz`,
      title: `Quantas horas de sono você tem por noite?`,
      layout: `emoji`,
      cols: 1,
      options: [
        { emoji: `😵`, title: `Menos de 5 horas` },
        { emoji: `😐`, title: `Entre 5 e 7 horas` },
        { emoji: `😊`, title: `Entre 7 e 9 horas` },
        { emoji: `😴`, title: `Mais de 9 horas` },
      ],
    },
    {
      id: `rotina`,
      type: `quiz`,
      title: `Como é a sua rotina hoje?`,
      layout: `emoji`,
      cols: 1,
      options: [
        { emoji: `🏃`, title: `Trabalho fora e tenho uma rotina corrida` },
        { emoji: `🪑`, title: `Trabalho sentado a maior parte do dia` },
        { emoji: `😰`, title: `Minha rotina é estressante e irregular` },
        { emoji: `🔄`, title: `Minha rotina mudou muito nos últimos anos` },
      ],
    },
    {
      id: `corpo-alvo`,
      type: `quiz`,
      title: `Qual é o corpo que você quer atingir?`,
      layout: `emoji`,
      cols: 1,
      options: [
        { emoji: `💪`, title: `Em forma`, subtitle: `Corpo atlético e saudável` },
        { emoji: `🏋️`, title: `Tonificado`, subtitle: `Corpo firme com definição` },
      ],
    },
    {
      id: `nome`,
      type: `form`,
      title: `Qual seu nome?`,
      subtitle: `Vamos usar seu nome para montar seu protocolo personalizado do Mounjaro de Chia. 🧪`,
      placeholder: `Digite seu nome...`,
      cta: `Continuar`,
    },
    {
      id: `analise-2`,
      type: `loading`,
      seconds: 8,
      title: `Montando seu protocolo...`,
      subtitle: `🧪 O sistema está analisando o seu perfil, {{nome}}...`,
      carousel: [`carrossel-1.webp`, `carrossel-2.webp`, `carrossel-3.webp`, `carrossel-4.webp`],
      checks: [
        `Seu IMC é {{imc}}`,
        `Ajustando a dosagem para {{pesoAtual}} kg`,
        `Montando seu plano para perder {{delta}} kg`,
        `Finalizando a fórmula de {{nome}}`,
      ],
    },
    {
      id: `projecao`,
      type: `projection`,
      title: `{{nome}}, é isso que te espera em 30 dias`,
      subtitle: `De <strong>{{pesoAtual}} kg</strong> para <strong>{{peso30}} kg</strong> — <span class="accent-u">{{perda30}} quilos a menos</span> no primeiro mês.`,
      antesLabel: `Hoje`,
      depoisLabel: `Em 30 dias`,
      images: { antes: `animacao-antes.webp`, depois: `animacao-depois.webp` },
      imagesBy: {
        m: { antes: `animacao-antes-m.webp`, depois: `animacao-depois-m.webp` },
      },
      nota: `Projeções estimadas com base nas suas respostas`,
      cta: `Sim, eu quero ter esse resultado agora mesmo`,
      ctaSub: `Protocolo personalizado de {{delta}} kg`,
      ctaAlt: `Não sei ainda, mas posso tentar`,
      ctaAltSub: `Ver o plano mesmo assim`,
    },
    {
      id: `oferta`,
      type: `offer`,
      note: `Análise concluída com sucesso!`,
      title: `Parabéns! A sua combinação foi identificada e o seu protocolo personalizado do Monjaro de Chia já foi liberado.`,
      destaque: `O seu caso é um dos melhores que existem pra quem quer emagrecer, o seu padrão hormonal, quando recebem a combinação certa, costumam eliminar entre 22 e 33 quilos em menos de noventa dias.`,
      oferta: {
        image: `oferta-exclusiva-5000.png`,
        cta: `QUERO O PLANO COMPLETO - 5.000 KZ`,
        alt: `Plano Completo do Mounjaro de Chia por 5.000 KZ`,
        evento: `checkout_click_padrao`,
      },
    },
  ];

  const m = p
    .filter((e: any) => [`quiz`, `measure`, `form`].includes(e.type))
    .map((e: any) => e.id);

  const h: any = {
    step: 0,
    genero: `f`,
    nome: ``,
    answers: {},
    units: { weight: `kg`, height: `cm` },
  };

  // ---------- actionbar ----------
  function v(e: string | null) {
    if (e) {
      _.innerHTML = `<div class="actionbar__inner">${e}</div>`;
      _.hidden = false;
      document.body.classList.add(`has-bar`);
      c(() => {
        document.body.style.setProperty(`--bar-h`, _.offsetHeight + `px`);
      });
      return _.firstElementChild!.firstElementChild as HTMLElement;
    }
    _.hidden = true;
    _.innerHTML = ``;
    document.body.classList.remove(`has-bar`);
    return null;
  }

  if (window.visualViewport) {
    const vv = window.visualViewport;
    const fix = () => {
      const t = Math.max(0, window.innerHeight - vv.height - vv.offsetTop);
      _.style.transform = t ? `translateY(${-t}px)` : ``;
    };
    l(vv, `resize`, fix);
    l(vv, `scroll`, fix);
  }

  // ---------- utm / variant ----------
  const y = [
    `utm_source`,
    `utm_medium`,
    `utm_campaign`,
    `utm_content`,
    `utm_term`,
    `fbclid`,
    `gclid`,
    `src`,
    `sck`,
  ];
  const b: Record<string, string> = (() => {
    const q = new URLSearchParams(location.search);
    const t: Record<string, string> = {};
    for (const n of y) {
      const r = q.get(n);
      if (r) t[n] = r;
    }
    return t;
  })();

  const x: any = {
    variant: new URLSearchParams(location.search).get(`ab`) === `B` ? `B` : `A`,
    etapa() {},
    evento() {},
  };

  // ---------- jornada (sessionStorage) ----------
  const S = (() => {
    const key = `mchia_journey`;
    let t: any[] = [];
    try {
      t = JSON.parse(sessionStorage.getItem(key) || `[]`) || [];
    } catch {}
    const save = () => {
      try {
        sessionStorage.setItem(key, JSON.stringify(t));
      } catch {}
    };
    const secondsOn = (id: string) => {
      const i = t.findIndex((e: any) => e.id === id);
      if (i < 0) return 0;
      const next = t[i + 1]?.t ?? Date.now();
      return Math.round((next - t[i].t) / 1000);
    };
    return {
      enter(id: string) {
        if (t[t.length - 1]?.id !== id) {
          t.push({ id, t: Date.now() });
          save();
        }
      },
      revealed() {
        const e = t[t.length - 1];
        if (e) {
          e.rv = 1;
          save();
        }
      },
      secondsOn,
      all: () => t.map((e: any) => ({ ...e, segundos: secondsOn(e.id) })),
      total: () => (t.length ? Math.round((Date.now() - t[0].t) / 1000) : 0),
    };
  })();

  function C() {
    return {
      qz_meta: O(`meta-peso`),
      qz_idade: O(`idade`),
      qz_corpo: O(`tipo-corpo`),
      qz_area: O(`area-gordura`),
      qz_imc: j(),
      qz_vsl1: S.secondsOn(`vsl-1`),
      qz_t: S.total(),
    };
  }

  function w(e: string) {
    const t = new URL(e);
    for (const [k, val] of Object.entries(b)) t.searchParams.set(k, val);
    if (h.nome) t.searchParams.set(`name`, h.nome);
    for (const [k, val] of Object.entries(C()))
      if (val !== `` && val != null) t.searchParams.set(k, String(val));
    return t.toString();
  }

  const T = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>`;

  const E: Record<string, number> = {
    "Até 5Kg": 5,
    "6 a 10 Kg": 10,
    "11 a 15 Kg": 15,
    "16 a 20 Kg": 20,
    "Mais de 20 Kg": 25,
  };

  const D = (e: any): any[] => (Array.isArray(e) ? [...e] : e ? [e] : []);
  const O = (e: string) => D(h.answers[e]).join(`, `);

  function k(e: string[]): string {
    return e.length < 2 ? e[0] || `` : e.slice(0, -1).join(`, `) + ` e ` + e[e.length - 1];
  }

  function A(): number {
    const atual = h.answers[`peso-atual`];
    const objetivo = h.answers[`peso-objetivo`];
    if (atual && objetivo && atual > objetivo) return Math.round(atual - objetivo);
    return E[O(`meta-peso`)] || 10;
  }

  function j(): string {
    const peso = h.answers[`peso-atual`];
    const altura = h.answers.altura;
    if (!peso || !altura) return ``;
    return (peso / (altura / 100) ** 2).toFixed(1).replace(`.`, `,`);
  }

  const M: Record<string, string> = {
    "Menos de 25": `com menos de 25 anos`,
    "25 a 34": `entre 25 e 34 anos`,
    "35 a 44": `entre 35 e 44 anos`,
    "45 a 54": `entre 45 e 54 anos`,
    "55+": `com mais de 55 anos`,
  };

  const N = () => Math.max(2, Math.ceil(A() / 0.75));
  const P = () => Math.min(A(), Math.max(1, Math.round(A() * 1)));

  function F(): number {
    const peso = h.answers[`peso-atual`];
    return peso ? peso - P() : 0;
  }

  function ee(): string {
    const e = new Date();
    e.setDate(e.getDate() + N() * 7);
    return e.toLocaleDateString(`pt-BR`, { day: `numeric`, month: `long` });
  }

  function te(): string {
    const e = (h.nome || ``).trim().split(/\s+/)[0] || ``;
    return e ? e.charAt(0).toUpperCase() + e.slice(1).toLowerCase() : ``;
  }

  const I: Record<string, () => any> = {
    nome: () => te(),
    meta: () => O(`meta-peso`),
    metaKg: () => E[O(`meta-peso`)] || ``,
    delta: () => A(),
    pesoAtual: () => h.answers[`peso-atual`] || `—`,
    objetivo: () => h.answers[`peso-objetivo`] || `—`,
    altura: () => h.answers.altura || `—`,
    imc: () => j() || `—`,
    idade: () => O(`idade`),
    faixa: () => M[O(`idade`)] || ``,
    area: () => k(D(h.answers[`area-gordura`])).toLowerCase(),
    corpo: () => (O(`tipo-corpo`) || ``).toLowerCase(),
    barreira: () => (O(`barreira`) || ``).toLowerCase(),
    prazo: () => N(),
    dataAlvo: () => ee(),
    perda30: () => P(),
    peso30: () => F() || `—`,
  };

  const L = (e: string) =>
    (e || ``).replace(/\{\{(\w+)\}\}/g, (match: string, t: string) => (I[t] ? I[t]() : match));

  function R(e: any, t: any): any {
    if (!e) return t;
    if (e.by) return e[h.answers[e.by]] ?? e.default ?? t;
    return e[h.genero] ?? t;
  }

  const z = (e: any) => R(e.optionsBy, e.options || []);
  const B = (e: any) => L(R(e.titleBy, e.title || ``));
  const V = (e: any) => L(R(e.hintBy, e.hint || ``));
  const H = (e: any) => L(R(e.subtitleBy, e.subtitle || ``));

  function U(e: any): string {
    const back = h.step > 0;
    return `
    <div class="header${e.type === `intro` ? ` header--intro` : ``}">
      ${
        back
          ? `<button class="header__back" type="button" data-back aria-label="Voltar"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg></button>`
          : `<span class="header__spacer"></span>`
      }
      <img class="header__logo" src="${f(`logo-tema.webp`)}" alt="Mounjaro de Chia" width="40" height="40">
      <span class="header__spacer"></span>
    </div>`;
  }

  function W(e: any): string {
    const i = m.indexOf(e.id);
    if (i < 0) return ``;
    return `
    <div class="progress" data-pct="${((i + 1) / m.length) * 100}">
      <div class="progress__meta">
        <span>Etapa ${i + 1} de ${m.length}</span>
        <b data-progress-num>0%</b>
      </div>
      <div class="progress__track"><div class="progress__bar" data-progress></div></div>
    </div>`;
  }

  function G() {
    const e = g.querySelector(`[data-pct]`);
    if (!e) return;
    const t = +(e as HTMLElement).dataset["pct"]!;
    const n = e.querySelector(`[data-progress]`) as HTMLElement;
    const r = e.querySelector(`[data-progress-num]`) as HTMLElement;
    c(() => {
      n.style.width = t + `%`;
    });
    const i = performance.now();
    (function tick(now: number) {
      const prog = Math.min(1, (now - i) / 550);
      const ease = 1 - (1 - prog) ** 3;
      r.textContent = Math.round(t * ease) + `%`;
      if (prog < 1) c(tick);
    })(i);
  }

  function K(e: any) {
    g.innerHTML = `
    ${U(e)}
    ${W(e)}
    <h1 class="title intro__title">${e.headline}</h1>
    <div class="intro__media">
      <video class="intro__video" src="${f(e.video)}" poster="${f(e.poster)}"
             width="540" height="720" autoplay muted loop playsinline preload="auto"></video>
    </div>
    <p class="intro__body">${e.body}</p>
    <p class="intro__cue">${e.cue}</p>
    <div class="intro__hands" aria-hidden="true">👇🏽👇🏽👇🏽</div>
    <button class="cta intro__cta" type="button" data-next>${e.cta}</button>
    <p class="intro__aviso">${e.aviso}</p>`;
    G();
  }

  function ne(e: any) {
    const t = z(e);
    const n = e.layout;
    const r: any[] = D(h.answers[e.id]);
    g.innerHTML = `
    ${U(e)}
    ${W(e)}
    <h1 class="title">${B(e)}</h1>
    ${H(e) ? `<p class="subtitle">${H(e)}</p>` : ``}
    <div class="options options--${e.cols}${e.multi ? ` options--multi` : ``}">${t
      .map((op: any, i: number) => {
        const sel = r.includes(op.title) ? ` is-selected` : ``;
        if (n === `image`)
          return `<button class="option option--image${sel}" type="button" data-pick="${i}" aria-label="${op.title}">
                <img src="${f(op.image)}" alt="${op.title}" width="400" height="400">
              </button>`;
        const aEl =
          n === `emoji`
            ? `<span class="option__emoji">${op.emoji}</span>`
            : `<img class="option__thumb" src="${f(op.image)}" alt="" width="150" height="150">`;
        return `
      <button class="${n === `thumb-top` ? `option option--top` : `option`}${sel}" type="button" data-pick="${i}">
        ${aEl}
        <span class="option__body">
          <span class="option__title">${op.title}</span>
          ${op.subtitle ? `<span class="option__sub">${op.subtitle}</span>` : ``}
        </span>
        <span class="option__check">${T}</span>
      </button>`;
      })
      .join(``)}</div>`;
    G();

    const syncBar = () => {
      const count = D(h.answers[e.id]).length;
      v(count ? `<button class="cta" type="button" data-next>${e.cta || `CONTINUAR`}</button>` : null);
      for (const el of _.querySelectorAll(`[data-next]`))
        el.addEventListener(`click`, Z);
    };

    if (e.multi) syncBar();

    g.querySelectorAll(`[data-pick]`).forEach((btn) => {
      btn.addEventListener(`click`, () => {
        const op = t[+(btn as HTMLElement).dataset["pick"]!];
        if (e.multi) {
          const cur: any[] = D(h.answers[e.id]);
          const idx = cur.indexOf(op.title);
          if (idx >= 0) cur.splice(idx, 1);
          else cur.push(op.title);
          (btn as HTMLElement).classList.toggle(`is-selected`, idx < 0);
          h.answers[e.id] = cur;
          syncBar();
          return;
        }
        g.querySelectorAll(`.option`).forEach((el) => el.classList.remove(`is-selected`));
        (btn as HTMLElement).classList.add(`is-selected`);
        h.answers[e.id] = op.title;
        if (e.id === `genero`) h.genero = op.value;
        a(Z, 260);
      });
    });
  }

  function re(e: any) {
    const t = e.kind;
    const alt = t === `weight` ? `lb` : `pol`;
    const base = t === `weight` ? `kg` : `cm`;
    let i: number = h.answers[e.id] ?? e.initial;

    g.innerHTML = `
    ${U(e)}
    ${W(e)}
    <h1 class="title">${B(e)}</h1>
    <div class="measure">
      <div class="units">
        <button type="button" data-unit="${base}">${base}</button>
        <button type="button" data-unit="${alt}">${alt}</button>
      </div>
      <p class="measure__value"><b data-value></b><span data-unit-label></span></p>
      <div class="ruler" data-ruler>
        <div class="ruler__track" data-track></div>
        <div class="ruler__needle"></div>
      </div>
      <p class="measure__drag">${e.drag}</p>
      <p class="hint">${V(e)}</p>
    </div>`;
    v(`<button class="cta" type="button" data-next>${e.cta}</button>`);
    G();
    h.answers[e.id] = i;

    const aEl = g.querySelector(`[data-ruler]`) as HTMLElement;
    const oEl = g.querySelector(`[data-track]`) as HTMLElement;
    const sEl = g.querySelector(`[data-value]`) as HTMLElement;
    const lEl = g.querySelector(`[data-unit-label]`) as HTMLElement;
    const ticks: string[] = [];

    for (let v2 = e.min; v2 <= e.max; v2++) {
      const major = v2 % 10 === 0;
      ticks.push(
        `<span class="ruler__tick${major ? ` ruler__tick--major` : ``}" style="left:${(v2 - e.min) * 12}px;height:${major ? 30 : 15}px"></span>`,
      );
      if (major)
        ticks.push(`<span class="ruler__label" style="left:${(v2 - e.min) * 12}px">${v2}</span>`);
    }
    oEl.innerHTML = ticks.join(``);
    oEl.style.width = (e.max - e.min) * 12 + `px`;

    const conv = (val: number) =>
      h.units[t] === base ? val : Math.round(t === `weight` ? val * 2.20462 : val / 2.54);

    function draw() {
      const off = aEl.offsetWidth / 2 - (i - e.min) * 12;
      oEl.style.transform = `translateX(${off}px)`;
      sEl.textContent = String(conv(i));
      lEl.textContent = h.units[t];
    }
    function set(val: number) {
      i = Math.min(e.max, Math.max(e.min, Math.round(val)));
      h.answers[e.id] = i;
      draw();
    }

    let dragging = false;
    let startX = 0;
    let startVal = 0;
    aEl.addEventListener(`pointerdown`, (ev) => {
      dragging = true;
      startX = ev.clientX;
      startVal = i;
      aEl.setPointerCapture(ev.pointerId);
    });
    aEl.addEventListener(`pointermove`, (ev) => {
      if (dragging) set(startVal - (ev.clientX - startX) / 12);
    });
    const stop = () => {
      dragging = false;
    };
    aEl.addEventListener(`pointerup`, stop);
    aEl.addEventListener(`pointercancel`, stop);

    g.querySelectorAll(`[data-unit]`).forEach((btn) => {
      (btn as HTMLElement).classList.toggle(`is-active`, (btn as HTMLElement).dataset["unit"] === h.units[t]);
      btn.addEventListener(`click`, () => {
        h.units[t] = (btn as HTMLElement).dataset["unit"]!;
        g.querySelectorAll(`[data-unit]`).forEach((el) =>
          (el as HTMLElement).classList.toggle(`is-active`, (el as HTMLElement).dataset["unit"] === h.units[t]),
        );
        draw();
      });
    });

    set(i);
    c(draw);
  }

  function ie(e: any) {
    g.innerHTML = `
    ${U(e)}
    ${W(e)}
    <h1 class="title">${B(e)}</h1>
    <p class="subtitle">${H(e)}</p>
    <div class="field">
      <input type="text" data-input placeholder="${e.placeholder}"
             autocomplete="given-name" enterkeyhint="go" maxlength="40">
    </div>`;
    v(`<button class="cta" type="button" data-submit disabled>${e.cta}</button>`);
    G();

    const input = g.querySelector(`[data-input]`) as HTMLInputElement;
    const submit = _.querySelector(`[data-submit]`) as HTMLButtonElement;
    input.addEventListener(`input`, () => {
      submit.disabled = input.value.trim().length < 2;
    });
    input.addEventListener(`keydown`, (ev) => {
      if ((ev as KeyboardEvent).key === `Enter` && !submit.disabled) submit.click();
    });
    submit.addEventListener(`click`, () => {
      const val = input.value.trim().replace(/\s+/g, ` `);
      h.nome = val.charAt(0).toUpperCase() + val.slice(1);
      Z();
    });
    a(() => input.focus(), 140);
  }

  function ae(e: any) {
    const circ = 2 * Math.PI * 74;
    g.innerHTML = `
    <div class="loading">
      ${
        e.carousel
          ? `<div class="carousel">${e.carousel
              .map(
                (img: string, i: number) =>
                  `<img src="${f(img)}" alt="" class="${i === 0 ? `is-active` : ``}" width="300" height="300" loading="${i === 0 ? `eager` : `lazy`}">`,
              )
              .join(``)}</div>`
          : `
      <div class="ring">
        <svg viewBox="0 0 168 168" aria-hidden="true">
          <circle class="ring__bg" cx="84" cy="84" r="74"></circle>
          <circle class="ring__fg" cx="84" cy="84" r="74"
                  stroke-dasharray="${circ}" stroke-dashoffset="${circ}" data-ring></circle>
        </svg>
        <div class="ring__pct" data-pct>0%</div>
      </div>`
      }
      <h1 class="loading__title">${B(e)}</h1>
      <p class="loading__sub">${H(e)}</p>
      ${e.checks ? `<ul class="checks">${e.checks.map((chk: string) => `<li><span class="checks__mark">${T}</span>${L(chk)}</li>`).join(``)}</ul>` : ``}
    </div>`;

    const ring = g.querySelector(`[data-ring]`) as HTMLElement | null;
    const pct = g.querySelector(`[data-pct]`) as HTMLElement | null;
    const items = [...g.querySelectorAll(`.checks li`)] as HTMLElement[];
    const total = e.seconds * 1000;
    const start = performance.now();
    let carouselId: number | undefined;

    if (e.carousel) {
      const imgs = [...g.querySelectorAll(`.carousel img`)] as HTMLElement[];
      let idx = 0;
      carouselId = o(() => {
        imgs[idx].classList.remove(`is-active`);
        idx = (idx + 1) % imgs.length;
        imgs[idx].classList.add(`is-active`);
      }, total / imgs.length);
    }

    function tick(now: number) {
      const prog = Math.min(100, ((now - start) / total) * 100);
      if (ring) ring.style.strokeDashoffset = String(circ * (1 - prog / 100));
      if (pct) pct.textContent = Math.round(prog) + `%`;
      items.forEach((el, i) => {
        if (prog >= ((i + 1) / items.length) * 92) el.classList.add(`is-done`);
      });
      if (prog < 100) c(tick);
      else {
        if (carouselId !== undefined) s(carouselId);
        Z();
      }
    }
    c(tick);
  }

  let q: (() => void) | null = null;

  function oe(e: any) {
    const testimonials = [
      {
        img: `images_7.jpeg`,
        texto: `Essa era eu há quatro meses. Olha como está minha barriga agora. Sabe o que mais me impressionou? Era simples demais pra acreditar. Todo dia de manhã eu tomava isso aqui, parecia que não ia funcionar, mas eu perdi vinte e oito quilos desde que comecei.`,
      },
      {
        img: `images_5.jpeg`,
        texto: `Eu preenchi o questionário do doutor e quando vi o resultado, levei um susto. Dizia que meu corpo estava no modo de preservação hormonal e fez todo sentido. A fome que não passava, o peso que não caía, o cansaço constante, tudo era o meu corpo em modo de alerta.`,
      },
      {
        img: `images_4.jpeg`,
        texto: `Eu quase não quis testar. Achei que era mais uma coisa de internet que promete e não entrega nada, mas eu estava desesperada. Engordei vinte e cinco quilos depois dos quarenta, quando tive meu segundo filho. Tentei tudo e nada funcionava. Resolvi testar o monjaro de chia sem acreditar muito e funcionou.`,
      },
      {
        img: `images_3.jpeg`,
        texto: `Quando comecei a tomar todas as manhãs, em três dias a fome tinha desaparecido. Em duas semanas, ela já tinha eliminado sete quilos e o peso não voltou.`,
      },
      {
        img: `images_2.jpeg`,
        texto: `Eu comecei o Monjaro de Chia e em três meses eliminou vinte e oito quilos. Mas o que realmente mudou foi outra coisa. Eu voltei a querer sair, a aproveitar a vida. Antes, eu me escondia, recusava convite, evitava foto.`,
      },
    ]
      .map(
        (t, i) => `
    <figure class="recipe-testimonial">
      <img class="recipe-testimonial__img" src="${f(t.img)}" alt="Antes e depois da história ${i + 1}" width="600" height="450" loading="lazy">
      <figcaption class="recipe-testimonial__text">${t.texto}</figcaption>
    </figure>`,
      )
      .join(``);

    g.innerHTML = `
    ${U(e)}
    <h1 class="title recipe-intro__title">Em segundos, você vai receber sua combinação personalizada do Monjaro de Chia.</h1>
    <div class="recipe-intro__card recipe-intro__card--center recipe-intro__card--gap">
      <p>Talvez o que mais te incomode não seja apenas o número que aparece na balança, mas olhar para o espelho e sentir que já não tens o corpo em que te sentias bonita e confiante. Talvez já tenhas tentado várias dietas, reduzido a quantidade de comida e feito esforços para emagrecer, mas, mesmo assim, continuas sem alcançar o resultado que tanto desejas.</p>
      <p>Pelo que eu analisei nas suas respostas, o seu corpo está preso no que eu chamo de modo de preservação hormonal. E é exatamente isso que está impedindo você de emagrecer.</p>
      <p>Mas não se preocupe: a receita da chia que eu vou te mostrar quebra esse bloqueio, cria um gel poderoso no seu estômago e faz o seu corpo voltar a queimar gordura naturalmente, podendo eliminar até 10 quilos no primeiro mês e 25 quilos em noventa dias.</p>
    </div>
    <h2 class="title--lg recipe-testimonials__headline">Até mulheres que acreditavam ter um corpo difícil de emagrecer a conquistar esses resultados.</h2>
    ${testimonials}
    <button class="cta recipe-cta-inline" type="button" data-next>${e.cta}</button>`;
    q = null;
    v(null);
    g.querySelector(`[data-next]`)?.addEventListener(`click`, () => x.evento(`cta_vsl1`));
  }

  const se = () => Math.max(0.5, P() * 0.12);

  function J(dec: number, pow: number) {
    const start = h.answers[`peso-atual`] || 0;
    return Array.from({ length: 17 }, (_, i) => {
      const t = i / 16;
      return { t, peso: start - dec * (1 - (1 - t) ** pow) };
    });
  }

  function ce(): string {
    const dim = { w: 340, h: 174, L: 54, R: 14, T: 28, B: 28 };
    const plotW = dim.w - dim.L - dim.R;
    const plotH = dim.h - dim.T - dim.B;
    const hasPeso = !!h.answers[`peso-atual`];
    const peso = h.answers[`peso-atual`] || 0;
    const alvo = F() || 0;
    const range = Math.max(1, peso - alvo);
    const sx = (n: number) => dim.L + n * plotW;
    const sy = (pesoVal: number) => dim.T + ((peso - pesoVal) / range) * plotH;
    const path = (pts: any[]) =>
      pts
        .map((pt, i) => `${i ? `L` : `M`}${sx(pt.t).toFixed(1)} ${sy(pt.peso).toFixed(1)}`)
        .join(` `);
    const comM = J(P(), 2.2);
    const semM = J(se(), 1.3);
    const dCom = path(comM);
    const dSem = path(semM);
    const fimCom = comM[comM.length - 1];
    const fimSem = semM[semM.length - 1];
    const decimals = range >= 3 ? 0 : 1;
    const fmt = (n: number) => n.toFixed(decimals).replace(`.`, `,`);
    const grid = [0, 1, 2, 3].map((i) => {
      const y = dim.T + (i / 3) * plotH;
      const pesoY = peso - (i / 3) * range;
      return { y, peso: pesoY };
    });

    const pill = (label: string, x: number, y: number, cls: string, fill: string) => {
      const w = label.length * 5.4 + 18;
      return `
      <g class="chart__pill ${cls}">
        <rect x="${(x - w / 2).toFixed(1)}" y="${(y - 9).toFixed(1)}" width="${w.toFixed(1)}" height="18" rx="9" fill="${fill}"/>
        <text x="${x.toFixed(1)}" y="${(y + 3.6).toFixed(1)}" text-anchor="middle" fill="#fff" font-size="9.5" font-weight="700">${label}</text>
      </g>`;
    };

    const dot = (x: number, y: number, cls: string, fill: string) => `
    <circle class="chart__halo ${cls}" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="9" fill="${fill}" opacity=".18"/>
    <circle class="chart__dot ${cls}"  cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4.5" fill="${fill}" stroke="#fff" stroke-width="2.5"/>`;

    return `
    <div class="chart">
      <svg viewBox="0 0 ${dim.w} ${dim.h}" role="img"
           aria-label="Projeção de peso em 30 dias, com e sem o método">
        <defs>
          <linearGradient id="gTraco" gradientUnits="userSpaceOnUse" x1="${dim.L}" y1="0" x2="${dim.L + plotW}" y2="0">
            <stop offset="0%"   stop-color="var(--danger)"/>
            <stop offset="45%"  stop-color="var(--warn)"/>
            <stop offset="100%" stop-color="var(--accent)"/>
          </linearGradient>
          <linearGradient id="gArea" gradientUnits="userSpaceOnUse" x1="0" y1="${dim.T}" x2="0" y2="${dim.T + plotH}">
            <stop offset="0%"   stop-color="var(--warn)"   stop-opacity=".22"/>
            <stop offset="100%" stop-color="var(--accent)" stop-opacity="0"/>
          </linearGradient>
        </defs>

        ${grid
          .map(
            (pt) => `
          <line class="chart__grid" x1="${dim.L}" y1="${pt.y.toFixed(1)}" x2="${dim.L + plotW}" y2="${pt.y.toFixed(1)}" stroke="#E4EAE7" stroke-dasharray="2 4"/>
          ${
            hasPeso
              ? `<text class="chart__ytick" x="${dim.L - 9}" y="${(pt.y + 3.4).toFixed(1)}" text-anchor="end">${fmt(pt.peso)}<tspan class="chart__yunit"> kg</tspan></text>`
              : ``
          }`,
          )
          .join(``)}

        <path class="chart__area" d="${dCom} L${sx(1).toFixed(1)} ${(dim.T + plotH).toFixed(1)} L${sx(0).toFixed(1)} ${(dim.T + plotH).toFixed(1)} Z" fill="url(#gArea)" stroke="none"/>

        <path class="chart__line chart__line--sem" d="${dSem}" pathLength="1" fill="none" stroke="#C4CFCA" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>

        <path class="chart__line chart__line--com" d="${dCom}" pathLength="1" fill="none" stroke="url(#gTraco)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>

        ${dot(sx(0), sy(peso), `chart__dot--ini`, `#F04438`)}
        ${dot(sx(1), sy(fimSem.peso), `chart__dot--sem`, `#C4CFCA`)}
        ${dot(sx(1), sy(fimCom.peso), `chart__dot--com`, `#12B76A`)}

        ${pill(`Sem o método`, sx(0.38), sy(semM[6].peso) - 15, `chart__pill--sem`, `#9AA8A3`)}

        ${pill(`Com o Mounjaro de Chia`, sx(0.7), (sy(semM[11].peso) + sy(comM[11].peso)) / 2, `chart__pill--com`, `#12B76A`)}

        ${[`Hoje`, `15 dias`, `30 dias`]
          .map(
            (label, i) => `
          <text class="chart__eixo" x="${sx(i / 2).toFixed(1)}" y="${dim.h - 9}" text-anchor="${i === 0 ? `start` : i === 2 ? `end` : `middle`}">${label}</text>`,
          )
          .join(``)}
      </svg>
    </div>`;
  }

  function le(e: any) {
    const imgs = R(e.imagesBy, e.images || { antes: ``, depois: `` });
    const figure = (img: string, label: string) => `
    <figure class="ba__item">
      <div class="ba__frame">
        ${img ? `<img src="${f(img)}" alt="" loading="eager" onerror="this.remove()">` : ``}
      </div>
      <figcaption class="ba__label">${label}</figcaption>
    </figure>`;

    g.innerHTML = `
    ${U(e)}
    <h1 class="title">${B(e)}</h1>
    <p class="subtitle">${H(e)}</p>
    <div class="ba">
      ${figure(imgs.antes, e.antesLabel)}
      <div class="ba__seta" aria-hidden="true">→</div>
      ${figure(imgs.depois, e.depoisLabel)}
    </div>
    ${ce()}
    ${e.nota ? `<p class="chart__nota">${L(e.nota)}</p>` : ``}`;

    const pickHtml = (icon: string, title: string, sub: string, cls: string) => `
    <button class="pick ${cls}" type="button" data-next>
      <span class="pick__icon">${icon}</span>
      <span class="pick__body">
        <span class="pick__title">${L(title)}</span>
        ${sub ? `<span class="pick__sub">${L(sub)}</span>` : ``}
      </span>
    </button>`;

    v(
      pickHtml(
        `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8 0 5.5-4.8 10-10 10Z"/><path d="M2 21c0-3 1.9-5.4 5.1-6C9.5 14.5 12 13 13 12"/></svg>`,
        e.cta,
        e.ctaSub,
        `pick--sim`,
      ) +
        pickHtml(
          `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>`,
          e.ctaAlt,
          e.ctaAltSub,
          `pick--nao`,
        ),
    );

    _.querySelector(`.pick--sim`)?.addEventListener(`click`, () => x.evento(`cta_projecao`));
    _.querySelector(`.pick--nao`)?.addEventListener(`click`, () => x.evento(`cta_projecao_alt`));
  }

  function ue(e: any) {
    const t = e.video + `B`;
    return x.variant === `B` && u[t] ? t : e.video;
  }

  function de(e: any) {
    const t = x.variant === `B` ? `checkout_b` : `checkout`;
    const n = (x.variant === `B` ? u.ofertasB : u.ofertasA)[0].checkout;
    const r = e.oferta;
    g.innerHTML = `
    <div class="note">${T}${e.note}</div>
    <h1 class="title title--lg">${B(e)}</h1>
    <div class="recipe-intro__card recipe-intro__card--center">
      <p>${L(e.destaque)}</p>
    </div>
    <div class="oferta">
      <img class="offer-img" src="${f(r.image)}" alt="${r.alt}" width="600" height="901" loading="lazy">
      <a class="cta ${t}" data-checkout="${r.evento}" href="${w(n)}" rel="noopener">${r.cta}</a>
    </div>`;

    for (const el of document.querySelectorAll(`[data-checkout]`)) {
      el.addEventListener(`click`, () => {
        const btn = el as HTMLElement;
        if (btn.dataset["checkout"] !== `checkout_click`) x.evento(btn.dataset["checkout"]!);
        x.evento(`checkout_click`);
      });
    }
  }

  const fe: Record<string, (e: any) => void> = {
    intro: K,
    quiz: ne,
    measure: re,
    form: ie,
    loading: ae,
    vsl: oe,
    projection: le,
    offer: de,
  };

  function pe(stepIdx: number) {
    const t = p[stepIdx];
    if (!t) return;
    const list: string[] = [];
    if (t.type === `offer`) list.push(t.oferta.image);
    else if (t.image) list.push(t.image);
    if (t.carousel) list.push(...t.carousel);
    if (t.images || t.imagesBy)
      list.push(...Object.values(R(t.imagesBy, t.images || {})));
    for (const op of z(t) || []) if (op.image) list.push(op.image);
    for (const img of list) {
      const el = new Image();
      el.src = f(img);
    }
  }

  function Y() {
    const e = p[h.step];
    if (!e) return;
    v(null);
    S.enter(e.id);
    x.etapa(e.id);
    fe[e.type](e);
    g.classList.remove(`step-in`);
    void g.offsetWidth;
    g.classList.add(`step-in`);
    window.scrollTo(0, 0);
    for (const container of [g, _]) {
      container
        .querySelectorAll(`[data-back]`)
        .forEach((el) => el.addEventListener(`click`, me as EventListener));
      container
        .querySelectorAll(`[data-next]`)
        .forEach((el) => el.addEventListener(`click`, Z as EventListener));
    }
    pe(h.step + 1);
  }

  function X(e: number, push = true) {
    h.step = Math.min(p.length - 1, Math.max(0, e));
    if (push)
      history.pushState({ ...history.state, step: h.step }, ``, `#/` + p[h.step].id);
    Y();
  }

  const Z = () => X(h.step + 1);
  const me = () => history.back();

  l(window, `popstate`, (ev: any) => {
    const t = ev.state?.step;
    if (typeof t === `number`) {
      h.step = p[t]?.type === `loading` ? Math.max(0, t - 1) : t;
      Y();
    }
  });

  const Q: Record<string, any> = {
    "meta-peso": `11 a 15 Kg`,
    genero: `Mulher`,
    idade: `35 a 44`,
    "tipo-corpo": `Sobrepeso`,
    "area-gordura": [`Abdômen`, `Flancos`],
    "peso-atual": 82,
    altura: 165,
    "peso-objetivo": 68,
  };

  function preencher() {
    Object.assign(h.answers, Q);
    h.genero = `f`;
    h.nome = `Ana`;
    return Q;
  }

  function he() {
    const q = new URLSearchParams(location.search);
    if (
      !q.has(`debug`) ||
      (![`localhost`, `127.0.0.1`].includes(location.hostname) &&
        q.get(`debug`) !== `chia-rev-0826`)
    )
      return;

    const reveal = q.has(`reveal`) ? Math.max(0, +q.get(`reveal`)! || 0) : 3;
    u.vsl1.revealAt = reveal;
    u.vsl1B.revealAt = reveal;
    u.vslFinal.revealAt = reveal;
    u.vslFinalB.revealAt = reveal;

    (window as any).__funnel = {
      state: h,
      config: u,
      steps: () => p.map((e: any, i: number) => `${i}. ${e.id} (${e.type})`),
      go(e: any) {
        const i = typeof e === `number` ? e : p.findIndex((s: any) => s.id === e);
        if (i < 0) return `etapa não encontrada`;
        X(i);
        return p[i].id;
      },
      setGenero(e: string) {
        h.genero = e;
        return e;
      },
      preencher() {
        const ans = preencher();
        Y();
        return ans;
      },
      journey: () => ({
        etapas: S.all(),
        params: C(),
        url: w((x.variant === `B` ? u.ofertasB : u.ofertasA)[0].checkout),
      }),
      lead: () => ({ session_id: x.sid, variante: x.variant }),
      setNome(e: string) {
        h.nome = e;
        return e;
      },
      reveal() {
        return q ? (q(), `ok`) : `nada aguardando reveal nesta etapa`;
      },
      seek(e = 5) {
        const player = g.querySelector(`vturb-smartplayer`);
        const step = p[h.step];
        if (!player || !step.video) return `não é uma etapa de vídeo`;
        const at = Math.max(0, u[ue(step)].revealAt - e);
        (player as any).seek(at);
        return `pulou para ${at}s`;
      },
    };

    console.log(
      `[funil] preview ativo — reveal das VSLs em ${reveal}s (use &reveal=0 para instantâneo). __funnel.steps() lista as etapas.`,
    );
    console.log(
      `[funil] variante ${x.variant} — troque com ?ab=A ou ?ab=B na URL.`,
    );

    const stepParam = q.get(`step`);
    if (stepParam) {
      const idx = /^\d+$/.test(stepParam) ? +stepParam : p.findIndex((s: any) => s.id === stepParam);
      if (idx >= 0 && idx < p.length) {
        preencher();
        h.step = idx;
        console.log(`[funil] abrindo direto em "${p[idx].id}", com respostas de exemplo.`);
      } else {
        console.warn(`[funil] etapa "${stepParam}" não existe — __funnel.steps() lista as válidas.`);
      }
    }
  }

  he();
  history.replaceState({ ...history.state, step: h.step }, ``, `#/` + p[h.step].id);
  Y();

  return () => {
    dead = true;
    timeouts.forEach((id) => window.clearTimeout(id));
    intervals.forEach((id) => window.clearInterval(id));
    rafs.forEach((id) => window.cancelAnimationFrame(id));
    unlisten.forEach((fn) => fn());
    document.body.classList.remove(`has-bar`);
    document.body.style.removeProperty(`--bar-h`);
    delete (window as any).__funnel;
  };
}
