import React, { useState } from 'react';

/**
 * PÁGINA: Preciso de Ajuda (Busca em Linguagem Natural)
 * 
 * Permite que o usuário digite suas dúvidas em linguagem simples do cotidiano.
 * O sistema analisa os termos comuns e recomenda a aula ou seção mais adequada,
 * reduzindo a barreira de navegação para usuários iniciantes.
 */
export default function Ajuda({ setCurrentPage, setSelectedCursoId, onSelectAula }) {
  const [pergunta, setPergunta] = useState('');
  const [resultado, setResultado] = useState(null);
  const [pesquisou, setPesquisou] = useState(false);

  // Mapeamento local de sinônimos e termos coloquiais para aulas e seções (Conforme item 7 do prompt)
  const bancoAjuda = [
    {
      frases: ["criar email", "criar e-mail", "fazer email", "mandar email", "enviar email", "gmail", "receber email", "escrever email", "correio"],
      aulaId: "aula-4-1",
      cursoId: "nivel-4",
      titulo: "Como criar e usar um e-mail (Gmail)",
      desc: "Nós temos uma aula prática que ensina a criar sua conta de correio eletrônico e mandar mensagens digitais sem complicação."
    },
    {
      frases: ["whatsapp", "computador whatsapp", "zap zap", "mandar mensagem celular", "whatsapp web", "conectar celular"],
      aulaId: "aula-4-1",
      cursoId: "nivel-4",
      titulo: "Usar o WhatsApp no Computador",
      desc: "Veja como conectar o WhatsApp do seu celular no computador para conversar com letras maiores e teclado físico."
    },
    {
      frases: ["criar pasta", "nova pasta", "organizar arquivos", "guardar fotos", "pasta amarela", "pasta", "salvar arquivo"],
      aulaId: "aula-1-5",
      cursoId: "nivel-1",
      titulo: "Criando e Organizando Pastas",
      desc: "Aprenda o passo a passo de como clicar com o botão direito na tela, criar uma pasta amarela e dar o nome que desejar."
    },
    {
      frases: ["mouse", "clique", "duplo clique", "botão direito", "apontar", "mão do mouse", "setinha", "clicar", "arrastar"],
      aulaId: "aula-1-3",
      cursoId: "nivel-1",
      titulo: "Como Utilizar o Mouse",
      desc: "Aprenda a segurar o mouse corretamente, a diferença entre o clique simples e duplo, e para que serve o botão direito."
    },
    {
      frases: ["teclado", "escrever", "digitar", "apagar", "letras", "corrigir", "backspace", "dar espaço", "mudar linha"],
      aulaId: "aula-1-4",
      cursoId: "nivel-1",
      titulo: "Aprendendo a usar o Teclado",
      desc: "Saiba onde ficam as letras, como colocar espaços entre as palavras e como apagar letras escritas incorretamente."
    },
    {
      frases: ["senha", "esqueci senha", "senha segura", "mudar senha", "proteger", "segurança", "golpe", "fake", "roubo", "mensagem suspeita"],
      pageTarget: "seguranca",
      titulo: "Segurança Digital e Senhas Seguras",
      desc: "Temos uma trilha inteira ensinando a se proteger de golpes no WhatsApp, identificar mensagens falsas e criar senhas fortes."
    },
    {
      frases: ["ligar computador", "desligar", "tela", "ligar notebook", "gabinete", "monitor", "peças computador"],
      aulaId: "aula-1-1",
      cursoId: "nivel-1",
      titulo: "Entendendo o Computador do Zero",
      desc: "Aprenda a identificar as partes principais do computador, onde ligar e como desligar a máquina com segurança."
    }
  ];

  // Atalhos rápidos para dúvidas comuns
  const duvidasComuns = [
    { label: "Quero criar um e-mail", termo: "criar email" },
    { label: "Quero usar o WhatsApp no computador", termo: "whatsapp" },
    { label: "Como criar uma pasta?", termo: "criar pasta" },
    { label: "Como usar o mouse?", termo: "mouse" },
    { label: "Esqueci minha senha / Segurança", termo: "senha" }
  ];

  // Processa a busca
  const buscarDuvida = (termoBusca) => {
    const termoFormatado = (termoBusca || pergunta).toLowerCase().trim();
    if (!termoFormatado) return;

    setPesquisou(true);

    // Procura por correspondências das frases mapeadas no banco de ajuda
    const correspondencia = bancoAjuda.find(item => 
      item.frases.some(frase => termoFormatado.includes(frase) || frase.includes(termoFormatado))
    );

    if (correspondencia) {
      setResultado(correspondencia);
    } else {
      // Caso não ache uma frase exata, recomenda a Aula 1 de introdução como padrão
      setResultado({
        titulo: "Comece pelo Básico do Computador",
        desc: "Não encontramos uma resposta exata para sua dúvida. Recomendamos iniciar pela aula inicial que ensina o funcionamento geral do computador.",
        aulaId: "aula-1-1",
        cursoId: "nivel-1"
      });
    }
  };

  // Função para direcionar o usuário para o resultado encontrado
  const irParaResultado = () => {
    if (!resultado) return;

    if (resultado.aulaId) {
      if (resultado.cursoId) {
        setSelectedCursoId(resultado.cursoId);
      }
      onSelectAula(resultado.aulaId);
    } else if (resultado.pageTarget) {
      setCurrentPage(resultado.pageTarget);
    }
  };

  return (
    <div className="container" style={{ maxWidth: '800px', animation: 'fadeIn 0.4s ease' }}>
      
      {/* Cabeçalho */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '2.4rem', marginBottom: '12px' }}>
          Preciso de Ajuda 🔍
        </h2>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>
          Escreva qual é a sua dúvida com suas próprias palavras ou escolha um dos temas mais pesquisados.
        </p>
      </div>

      {/* Caixa de Busca Principal */}
      <div className="card" style={{ padding: '40px', backgroundColor: '#FFFFFF', marginBottom: '32px' }}>
        <div style={{ marginBottom: '24px' }}>
          <label 
            htmlFor="input-ajuda" 
            style={{ display: 'block', fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '12px', color: 'var(--primary)' }}
          >
            Escreva o que você gostaria de fazer no computador:
          </label>
          
          <input
            id="input-ajuda"
            type="text"
            placeholder="Ex: Como eu crio uma pasta amarela?"
            value={pergunta}
            onChange={(e) => setPergunta(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && buscarDuvida()}
            style={{
              width: '100%',
              padding: '18px 24px',
              fontSize: '1.2rem',
              border: '2px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              fontFamily: 'var(--font-body)',
              outline: 'none'
            }}
          />
        </div>

        <button
          onClick={() => buscarDuvida()}
          className="btn btn-primary"
          style={{ width: '100%', padding: '16px', fontSize: '1.2rem' }}
        >
          Procurar Solução
        </button>
      </div>

      {/* Atalhos Rápidos */}
      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '16px', color: 'var(--text-color)' }}>
          Perguntas Frequentes:
        </h3>
        
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {duvidasComuns.map((duvida, idx) => (
            <button
              key={idx}
              onClick={() => {
                setPergunta(duvida.label);
                buscarDuvida(duvida.termo);
              }}
              style={{
                padding: '12px 20px',
                fontSize: '1.05rem',
                backgroundColor: 'var(--bg-color)',
                border: '1px solid var(--border-color)',
                borderRadius: '20px',
                cursor: 'pointer',
                fontFamily: 'var(--font-body)',
                color: 'var(--text-color)',
                transition: 'var(--transition)'
              }}
              className="quick-help-btn"
            >
              💬 {duvida.label}
            </button>
          ))}
        </div>
      </div>

      {/* Exibição dos Resultados */}
      {pesquisou && resultado && (
        <div style={{
          padding: '32px',
          backgroundColor: '#FFFFFF',
          border: '3px solid var(--secondary)',
          borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--shadow-hover)',
          marginBottom: '60px',
          animation: 'slideUp 0.4s ease'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <span style={{ fontSize: '2.5rem' }} role="img" aria-hidden="true">🎯</span>
            <h3 style={{ fontSize: '1.6rem', color: 'var(--primary)', margin: 0 }}>
              Solução Encontrada!
            </h3>
          </div>
          
          <h4 style={{ fontSize: '1.3rem', marginBottom: '8px', color: 'var(--text-color)' }}>
            {resultado.titulo}
          </h4>
          
          <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', marginBottom: '24px', lineHeight: 1.5 }}>
            {resultado.desc}
          </p>
          
          <button
            onClick={irParaResultado}
            className="btn btn-primary"
            style={{ fontSize: '1.15rem', padding: '12px 24px' }}
          >
            Acessar Aula/Página Agora
          </button>
        </div>
      )}

    </div>
  );
}
