import React, { useState, useRef } from 'react';

/**
 * PÁGINA: Home
 * 
 * Página inicial da plataforma Primeiros Passos Tech.
 * Contém a apresentação do produto, uma ilustração amigável e acolhedora,
 * e a seção de Onboarding "Comece Aqui" que recomenda a trilha de aprendizado perfeita
 * com base na escolha do usuário.
 */
export default function Home({ setCurrentPage, setSelectedCursoId }) {
  // Estado para armazenar qual opção de perfil o usuário escolheu
  const [perfilSelecionado, setPerfilSelecionado] = useState(null);
  
  // Referência para rolar a tela suavemente até a seção de recomendação
  const comeceAquiRef = useRef(null);

  // Lista das 5 opções de perfil do usuário (Conforme item 5 do prompt)
  const perfis = [
    {
      id: 1,
      texto: "Eu nunca usei um computador.",
      recomendacao: {
        titulo: "Recomendamos: Nível 1 — Primeiros Passos",
        desc: "Essa trilha foi feita especialmente para quem está tocando em um computador pela primeira vez. Vamos aprender a usar o mouse, o teclado e criar nossas primeiras pastas com muita calma.",
        cursoTarget: "nivel-1",
        labelBotao: "Iniciar Nível 1"
      }
    },
    {
      id: 2,
      texto: "Sei o básico, mas tenho dificuldade em organizar minhas coisas.",
      recomendacao: {
        titulo: "Recomendamos: Nível 2 — Aprendendo Windows",
        desc: "Ideal para quem já sabe segurar o mouse, mas quer entender como funciona a Área de Trabalho, como baixar arquivos, usar pendrives e configurar som e Wi-Fi.",
        cursoTarget: "nivel-2",
        labelBotao: "Iniciar Nível 2"
      }
    },
    {
      id: 3,
      texto: "Sei usar o computador, mas tenho dificuldade em navegar na internet.",
      recomendacao: {
        titulo: "Recomendamos: Nível 3 — Internet sem Medo",
        desc: "Vamos desmistificar a internet! Aprenda a usar os navegadores (Chrome, Edge), pesquisar no Google com segurança, criar contas e cadastrar senhas sem medo.",
        cursoTarget: "nivel-3",
        labelBotao: "Iniciar Nível 3"
      }
    },
    {
      id: 4,
      texto: "Quero aprender a usar sites e serviços do dia a dia (Gmail, WhatsApp, etc.).",
      recomendacao: {
        titulo: "Recomendamos: Nível 4 — Sites e Serviços do Dia a Dia",
        desc: "Aulas super práticas mostrando passo a passo onde clicar para enviar e-mails pelo Gmail, conectar o WhatsApp Web no computador e assistir vídeos no YouTube.",
        cursoTarget: "nivel-4",
        labelBotao: "Iniciar Nível 4"
      }
    },
    {
      id: 5,
      texto: "Quero aprender a me proteger de golpes e vírus na internet.",
      recomendacao: {
        titulo: "Recomendamos: Trilha de Segurança Digital",
        desc: "Aprenda a identificar mensagens falsas no WhatsApp, golpes por SMS/E-mail, como criar senhas ultra-seguras e navegar de forma 100% protegida.",
        pageTarget: "seguranca",
        labelBotao: "Ir para Segurança Digital"
      }
    }
  ];

  // Função para rolar suavemente até a seção "Comece Aqui"
  const rolarParaComeceAqui = () => {
    comeceAquiRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Função para lidar com o clique na recomendação
  const handleRecomendacaoClick = (rec) => {
    if (rec.cursoTarget) {
      setSelectedCursoId(rec.cursoTarget);
      setCurrentPage('cursos');
    } else if (rec.pageTarget) {
      setCurrentPage(rec.pageTarget);
    }
  };

  return (
    <div style={{ animation: 'fadeIn 0.5s ease' }}>
      {/* SEÇÃO HERO */}
      <section style={{
        padding: '60px 0',
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid var(--border-color)',
      }}>
        <div className="container" style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap-reverse',
          gap: '40px'
        }}>
          {/* Texto de Apresentação */}
          <div style={{ flex: '1 1 500px' }}>
            <span style={{
              backgroundColor: 'rgba(232, 160, 32, 0.15)',
              color: 'var(--primary)',
              padding: '6px 12px',
              borderRadius: '20px',
              fontSize: '0.95rem',
              fontWeight: 'bold',
              display: 'inline-block',
              marginBottom: '16px',
              border: '1px solid var(--secondary)'
            }}>
              100% Gratuito, Seguro e Acessível
            </span>
            <h1 style={{ fontSize: '2.8rem', marginBottom: '20px', lineHeight: 1.15 }}>
              Aprenda tecnologia do zero, no seu ritmo.
            </h1>
            <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', marginBottom: '32px', maxWidth: '600px', lineHeight: 1.6 }}>
              Aprenda a usar o computador, Windows, internet e os principais serviços digitais do seu dia a dia de forma simples, segura e sem complicações.
            </p>
            
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <button 
                onClick={rolarParaComeceAqui} 
                className="btn btn-primary"
                style={{ fontSize: '1.25rem', padding: '18px 36px' }}
              >
                COMEÇAR AGORA
              </button>
              
              <button 
                onClick={() => setCurrentPage('cursos')} 
                className="btn btn-secondary"
                style={{ fontSize: '1.25rem', padding: '18px 36px' }}
              >
                VER CURSOS
              </button>
            </div>
          </div>

          {/* Ilustração Principal */}
          <div style={{ flex: '1 1 400px', textAlign: 'center' }}>
            <img 
              src="/home_illustration.jpg" 
              alt="Ilustração calorosa de um rapaz jovem ensinando pacientemente uma senhora simpática a mexer no notebook." 
              style={{
                width: '100%',
                maxWidth: '520px',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow)',
                border: '4px solid var(--border-color)',
                display: 'block',
                margin: '0 auto'
              }}
            />
          </div>
        </div>
      </section>

      {/* SEÇÃO "COMECE AQUI" (ONBOARDING) */}
      <section 
        ref={comeceAquiRef} 
        style={{ padding: '80px 0', backgroundColor: 'var(--bg-color)' }}
        aria-labelledby="comece-aqui-titulo"
      >
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 id="comece-aqui-titulo" style={{ fontSize: '2.4rem', marginBottom: '16px' }}>
              Comece Aqui
            </h2>
            <p style={{ fontSize: '1.3rem', color: 'var(--text-muted)' }}>
              Responda à pergunta abaixo para encontrarmos o melhor ponto de partida para você!
            </p>
          </div>

          <div className="card" style={{ padding: '40px', backgroundColor: '#FFFFFF' }}>
            <h3 style={{ 
              fontSize: '1.4rem', 
              color: 'var(--text-color)', 
              marginBottom: '24px', 
              fontFamily: 'var(--font-body)',
              fontWeight: 'bold',
              textAlign: 'center'
            }}>
              Qual destas opções melhor descreve você hoje?
            </h3>

            {/* Lista de Opções de Perfil com Botões Grandes */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {perfis.map(perf => (
                <button
                  key={perf.id}
                  onClick={() => setPerfilSelecionado(perf.id)}
                  aria-pressed={perfilSelecionado === perf.id}
                  style={{
                    padding: '20px 24px',
                    fontSize: '1.15rem',
                    fontFamily: 'var(--font-body)',
                    textAlign: 'left',
                    backgroundColor: perfilSelecionado === perf.id ? 'var(--primary)' : '#FFFFFF',
                    color: perfilSelecionado === perf.id ? '#FFFFFF' : 'var(--text-color)',
                    border: perfilSelecionado === perf.id ? '2px solid var(--primary)' : '2px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer',
                    transition: 'var(--transition)',
                    boxShadow: perfilSelecionado === perf.id ? 'var(--shadow-hover)' : 'none',
                    fontWeight: perfilSelecionado === perf.id ? 'bold' : 'normal',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px'
                  }}
                  className="perfil-option-btn"
                >
                  <span style={{
                    minWidth: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: perfilSelecionado === perf.id ? 'var(--secondary)' : 'var(--bg-color)',
                    color: 'var(--text-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    fontSize: '1rem'
                  }}>
                    {perf.id}
                  </span>
                  <span style={{ flex: 1 }}>{perf.texto}</span>
                </button>
              ))}
            </div>

            {/* Exibição da Recomendação com Base na Escolha */}
            {perfilSelecionado && (() => {
              const perfil = perfis.find(p => p.id === perfilSelecionado);
              return (
                <div style={{
                  marginTop: '40px',
                  padding: '32px',
                  backgroundColor: 'var(--bg-color)',
                  border: '2px solid var(--secondary)',
                  borderRadius: 'var(--radius-md)',
                  textAlign: 'center',
                  animation: 'slideUp 0.4s ease'
                }}>
                  <span style={{ fontSize: '2.5rem' }} role="img" aria-hidden="true">💡</span>
                  <h4 style={{ fontSize: '1.5rem', color: 'var(--primary)', margin: '12px 0' }}>
                    {perfil.recomendacao.titulo}
                  </h4>
                  <p style={{ fontSize: '1.15rem', color: 'var(--text-color)', marginBottom: '24px', lineHeight: 1.5 }}>
                    {perfil.recomendacao.desc}
                  </p>
                  <button
                    onClick={() => handleRecomendacaoClick(perfil.recomendacao)}
                    className="btn btn-primary"
                    style={{ fontSize: '1.2rem', padding: '14px 28px' }}
                  >
                    {perfil.recomendacao.labelBotao}
                  </button>
                </div>
              );
            })()}
          </div>
        </div>
      </section>
    </div>
  );
}
