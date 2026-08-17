import React, { useState, useEffect, useRef } from 'react';

/**
 * COMPONENTE: AccessibilityBar
 *
 * Barra de ferramentas de acessibilidade exibida no topo de todas as páginas.
 * Oferece três recursos:
 *
 * 1. Ajuste do tamanho do texto (A- / A+)
 * 2. Modo Alto Contraste (preto e amarelo)
 * 3. Leitura em Voz Alta (TTS — Text-to-Speech)
 *    - Usa a Web Speech API nativa do navegador (sem dependências externas).
 *    - Sintetiza a descrição da página atual em português.
 *    - Ideal para usuários com baixa visão ou dificuldade de leitura.
 *    - Permite pausar e retomar a leitura.
 */

// Mapeamento de páginas para textos de áudio-descrição em português
const DESCRICOES_PAGINA = {
  home: `
    Você está na Página Inicial da plataforma Primeiros Passos Tech.
    Esta plataforma foi criada para ajudar pessoas a aprenderem tecnologia do zero, de forma simples e tranquila.
    Aqui você encontra o botão "Começar Agora" e o botão "Ver Cursos".
    Logo abaixo, existe a seção chamada "Comece Aqui", onde você pode escolher o seu nível de conhecimento
    e receber uma recomendação personalizada de por onde começar a estudar.
  `,
  cursos: `
    Você está na página de Trilhas de Aprendizado.
    Aqui estão listados os quatro níveis de curso disponíveis na plataforma:
    Nível Um: Primeiros Passos — para quem nunca usou um computador.
    Nível Dois: Aprendendo Windows — para quem quer entender a tela do computador.
    Nível Três: Internet sem Medo — para aprender a navegar na internet com segurança.
    Nível Quatro: Sites e Serviços do Dia a Dia — para usar Gmail, WhatsApp, YouTube e muito mais.
    Existe também um botão de destaque chamado: Eu realmente não sei usar computador.
    Clique nele para começar pela aula mais básica de todas.
  `,
  aula: `
    Você está dentro de uma Aula.
    As aulas são divididas em passos simples. Cada passo explica uma coisa de cada vez.
    Ao terminar de ler um passo, clique no botão "Entendi — Próximo Passo" para avançar.
    Ao final da aula, você responderá uma pergunta de revisão para confirmar o aprendizado.
    Se acertar, a aula será marcada como concluída e seu progresso será atualizado.
  `,
  glossario: `
    Você está no Dicionário de Tecnologia, chamado Tecnologia sem Complicação.
    Aqui você pode digitar qualquer palavra tecnológica que não conhece, como: Wi-Fi, PDF, Download, Nuvem, Login.
    O sistema vai explicar o significado em linguagem simples, com exemplos do dia a dia.
    Use a caixa de texto no topo da página para pesquisar.
  `,
  ajuda: `
    Você está na página Preciso de Ajuda.
    Aqui você pode escrever com suas próprias palavras o que precisa fazer no computador.
    Por exemplo: "Quero criar um e-mail", ou "Como eu mando uma foto pelo WhatsApp?".
    O sistema vai entender sua dúvida e indicar a aula certa para você.
    Você também pode clicar nos botões de perguntas frequentes que aparecem na tela.
  `,
  seguranca: `
    Você está na Trilha de Segurança Digital.
    Esta página apresenta situações reais da internet para você aprender a identificar golpes e mensagens perigosas.
    Para cada situação descrita, você deve escolher uma classificação:
    "Pode Confiar", "Cuidado" ou "Provavelmente é Golpe".
    Depois de responder, o sistema explica se você acertou e por quê.
    Ao concluir todas as situações corretamente, você ganha a conquista "Seguro na Internet".
  `,
  perfil: `
    Você está na página Meu Aprendizado.
    Aqui você pode ver quantas aulas já concluiu e qual é o seu percentual de progresso geral.
    Existe uma barra colorida mostrando o seu avanço.
    Também são exibidas as suas conquistas, como medalhas e troféus que você desbloqueou ao completar atividades.
    Na parte inferior, você pode ver a lista de aulas já concluídas e revisá-las quando quiser.
  `,
};

export default function AccessibilityBar({
  fontSize,
  setFontSize,
  altoContraste,
  setAltoContraste,
  currentPage,
}) {
  // Estado de controle do TTS: 'parado', 'lendo' ou 'pausado'
  const [statusTTS, setStatusTTS] = useState('parado');

  // Referência para o objeto de síntese de voz
  const utteranceRef = useRef(null);

  // Cancela qualquer leitura em andamento quando a página muda
  useEffect(() => {
    pararLeitura();
  }, [currentPage]);

  // Cancela leitura ao desmontar o componente
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // --- Controles de Fonte ---
  const aumentarFonte = () => {
    if (fontSize < 140) setFontSize(prev => prev + 10);
  };

  const diminuirFonte = () => {
    if (fontSize > 100) setFontSize(prev => prev - 10);
  };

  // --- Controle de Contraste ---
  const alternarContraste = () => {
    setAltoContraste(prev => !prev);
  };

  // --- Funções do TTS ---

  /**
   * Inicia a leitura em voz alta da descrição da página atual.
   * Usa a Web Speech API (SpeechSynthesis), disponível nativamente em:
   * Google Chrome, Microsoft Edge, Firefox e Safari modernos.
   */
  const iniciarLeitura = () => {
    if (!window.speechSynthesis) {
      alert('Seu navegador não suporta a leitura em voz alta. Tente usar o Google Chrome ou Microsoft Edge.');
      return;
    }

    // Para qualquer leitura anterior antes de começar uma nova
    window.speechSynthesis.cancel();

    // Obtém o texto descritivo da página atual (com fallback genérico)
    const texto =
      DESCRICOES_PAGINA[currentPage] ||
      'Você está navegando na plataforma Primeiros Passos Tech. Explore os menus para acessar os cursos, o dicionário de tecnologia e a trilha de segurança digital.';

    // Cria um novo objeto de fala
    const utterance = new SpeechSynthesisUtterance(texto);

    // Configura o idioma como português do Brasil
    utterance.lang = 'pt-BR';

    // Velocidade da fala (0.8 = um pouco mais lenta para melhor compreensão)
    utterance.rate = 0.85;

    // Tom de voz neutro
    utterance.pitch = 1;

    // Tenta selecionar uma voz em português, se disponível no sistema
    const vozes = window.speechSynthesis.getVoices();
    const vozPT = vozes.find(v =>
      v.lang.startsWith('pt') || v.lang.startsWith('pt-BR')
    );
    if (vozPT) utterance.voice = vozPT;

    // Callbacks de ciclo de vida da leitura
    utterance.onstart = () => setStatusTTS('lendo');
    utterance.onend = () => setStatusTTS('parado');
    utterance.onerror = () => setStatusTTS('parado');
    utterance.onpause = () => setStatusTTS('pausado');
    utterance.onresume = () => setStatusTTS('lendo');

    utteranceRef.current = utterance;

    // Inicia a leitura
    window.speechSynthesis.speak(utterance);
    setStatusTTS('lendo');
  };

  /**
   * Pausa a leitura atual sem cancelá-la.
   */
  const pausarLeitura = () => {
    if (window.speechSynthesis && window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
      setStatusTTS('pausado');
    }
  };

  /**
   * Retoma a leitura de onde foi pausada.
   */
  const retomarLeitura = () => {
    if (window.speechSynthesis && window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setStatusTTS('lendo');
    }
  };

  /**
   * Para a leitura completamente e reinicia o estado.
   */
  const pararLeitura = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setStatusTTS('parado');
  };

  // Define os estilos e rótulos dinâmicos do botão de TTS
  const ttsConfig = {
    parado: {
      label: 'Ouvir Página',
      emoji: '🔊',
      ariaLabel: 'Ativar leitura em voz alta da página atual',
      bg: '#FFFFFF',
      onClick: iniciarLeitura,
    },
    lendo: {
      label: 'Pausar Leitura',
      emoji: '⏸️',
      ariaLabel: 'Pausar a leitura em voz alta',
      bg: '#FFFACD',
      onClick: pausarLeitura,
    },
    pausado: {
      label: 'Retomar Leitura',
      emoji: '▶️',
      ariaLabel: 'Retomar a leitura em voz alta',
      bg: '#E0FFE0',
      onClick: retomarLeitura,
    },
  };

  const tts = ttsConfig[statusTTS];

  return (
    <section
      className="accessibility-bar"
      aria-label="Ferramentas de Acessibilidade"
      style={{
        backgroundColor: 'var(--primary)',
        color: '#FFFFFF',
        padding: '8px 16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px',
        borderBottom: '2px solid var(--secondary)',
      }}
    >
      {/* Rótulo da Barra */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span role="img" aria-hidden="true" style={{ fontSize: '1.2rem' }}>♿</span>
        <span style={{ fontWeight: 'bold', fontSize: '0.95rem' }}>
          Opções de Acessibilidade:
        </span>
      </div>

      {/* Grupo de Controles */}
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>

        {/* ── Tamanho da Letra ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '0.88rem', marginRight: '2px' }}>Letra:</span>

          <button
            onClick={diminuirFonte}
            aria-label="Diminuir tamanho do texto"
            disabled={fontSize <= 100}
            style={{
              padding: '5px 11px',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: fontSize <= 100 ? 'not-allowed' : 'pointer',
              opacity: fontSize <= 100 ? 0.5 : 1,
              backgroundColor: '#FFFFFF',
              color: '#000000',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          >
            A-
          </button>

          <span style={{ fontWeight: 'bold', minWidth: '42px', textAlign: 'center', fontSize: '0.92rem' }}>
            {fontSize}%
          </span>

          <button
            onClick={aumentarFonte}
            aria-label="Aumentar tamanho do texto"
            disabled={fontSize >= 140}
            style={{
              padding: '5px 11px',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: fontSize >= 140 ? 'not-allowed' : 'pointer',
              opacity: fontSize >= 140 ? 0.5 : 1,
              backgroundColor: '#FFFFFF',
              color: '#000000',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          >
            A+
          </button>
        </div>

        {/* Divisor */}
        <div style={{ width: '1px', height: '20px', backgroundColor: 'rgba(255,255,255,0.3)' }} aria-hidden="true" />

        {/* ── Alto Contraste ── */}
        <button
          onClick={alternarContraste}
          aria-label={altoContraste ? 'Desativar Alto Contraste' : 'Ativar Alto Contraste'}
          style={{
            padding: '5px 11px',
            fontSize: '0.92rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            backgroundColor: altoContraste ? '#FFFF00' : '#FFFFFF',
            color: '#000000',
            border: '1px solid #ccc',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
          }}
        >
          <span role="img" aria-hidden="true">🌗</span>
          {altoContraste ? 'Contraste Normal' : 'Alto Contraste'}
        </button>

        {/* Divisor */}
        <div style={{ width: '1px', height: '20px', backgroundColor: 'rgba(255,255,255,0.3)' }} aria-hidden="true" />

        {/* ── TTS: Leitura em Voz Alta ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>

          {/* Botão principal (Ouvir / Pausar / Retomar) */}
          <button
            onClick={tts.onClick}
            aria-label={tts.ariaLabel}
            style={{
              padding: '5px 11px',
              fontSize: '0.92rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              backgroundColor: tts.bg,
              color: '#000000',
              border: statusTTS === 'lendo'
                ? '2px solid #F0A500'
                : '1px solid #ccc',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              /* Pequena animação de pulso enquanto está lendo */
              animation: statusTTS === 'lendo' ? 'tts-pulse 1.4s ease-in-out infinite' : 'none',
            }}
          >
            <span role="img" aria-hidden="true">{tts.emoji}</span>
            {tts.label}
          </button>

          {/* Botão Parar — visível apenas quando está lendo ou pausado */}
          {statusTTS !== 'parado' && (
            <button
              onClick={pararLeitura}
              aria-label="Parar leitura em voz alta completamente"
              style={{
                padding: '5px 10px',
                fontSize: '0.88rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                backgroundColor: '#FFE5E5',
                color: '#8B0000',
                border: '1px solid #FFAAAA',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <span role="img" aria-hidden="true">⏹️</span>
              Parar
            </button>
          )}
        </div>

      </div>

      {/* Animação de pulso para o botão de leitura ativa */}
      <style>{`
        @keyframes tts-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(240, 165, 0, 0.5); }
          50%       { box-shadow: 0 0 0 6px rgba(240, 165, 0, 0); }
        }
      `}</style>
    </section>
  );
}
