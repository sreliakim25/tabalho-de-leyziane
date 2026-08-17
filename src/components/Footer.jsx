import React from 'react';

/**
 * COMPONENTE: Footer
 * 
 * Rodapé da plataforma com informações de acessibilidade, direitos autorais
 * e mensagens didáticas motivacionais.
 */
export default function Footer({ setCurrentPage }) {
  return (
    <footer style={{
      backgroundColor: 'var(--text-color)',
      color: '#FFFFFF',
      padding: '48px 0',
      marginTop: 'auto',
      borderTop: '4px solid var(--secondary)'
    }}>
      <div className="container">
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '32px'
        }}>
          {/* Coluna 1: Apresentação */}
          <div style={{ flex: '1 1 300px' }}>
            <h3 style={{ color: 'var(--secondary)', marginBottom: '16px', fontFamily: 'var(--font-title)' }}>
              Primeiros Passos Tech
            </h3>
            <p style={{ fontSize: '1.05rem', color: '#E0E0E0', maxWidth: '400px' }}>
              Uma plataforma simples, visual e paciente criada para ajudar qualquer pessoa a dominar a tecnologia e se tornar independente no computador.
            </p>
          </div>

          {/* Coluna 2: Navegação rápida */}
          <div style={{ flex: '1 1 200px' }}>
            <h4 style={{ color: '#FFFFFF', marginBottom: '16px', fontSize: '1.2rem' }}>Links Rápidos</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li>
                <button 
                  onClick={() => setCurrentPage('home')}
                  style={{ background: 'none', border: 'none', color: '#E0E0E0', textDecoration: 'underline', cursor: 'pointer', fontSize: '1.05rem', padding: 0 }}
                >
                  Página Inicial
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentPage('cursos')}
                  style={{ background: 'none', border: 'none', color: '#E0E0E0', textDecoration: 'underline', cursor: 'pointer', fontSize: '1.05rem', padding: 0 }}
                >
                  Trilhas de Aprendizado
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentPage('seguranca')}
                  style={{ background: 'none', border: 'none', color: '#E0E0E0', textDecoration: 'underline', cursor: 'pointer', fontSize: '1.05rem', padding: 0 }}
                >
                  Segurança Digital
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentPage('glossario')}
                  style={{ background: 'none', border: 'none', color: '#E0E0E0', textDecoration: 'underline', cursor: 'pointer', fontSize: '1.05rem', padding: 0 }}
                >
                  Dicionário de Tecnologia
                </button>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Mensagem Motivacional e Acessibilidade */}
          <div style={{ flex: '1 1 250px' }}>
            <h4 style={{ color: '#FFFFFF', marginBottom: '16px', fontSize: '1.2rem' }}>Nosso Compromisso</h4>
            <p style={{ fontSize: '1.05rem', color: '#E0E0E0', fontStyle: 'italic' }}>
              "Nunca é tarde para dar o primeiro passo no mundo digital. Vamos fazer isso juntos, passo a passo."
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '16px', color: 'var(--secondary)' }}>
              <span role="img" aria-label="Acessibilidade Visual" style={{ fontSize: '1.5rem' }}>👁️</span>
              <span style={{ fontSize: '0.95rem', fontWeight: 'bold' }}>
                Desenvolvido com foco em acessibilidade e facilidade de leitura.
              </span>
            </div>
          </div>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.1)', margin: '32px 0' }} />

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          color: '#B0B0B0',
          fontSize: '0.95rem'
        }}>
          <p style={{ margin: 0 }}>
            &copy; {new Date().getFullYear()} Primeiros Passos Tech. Conteúdo gratuito e educativo.
          </p>
          <p style={{ margin: 0 }}>
            Criado com carinho para alunos e futuros navegadores da internet.
          </p>
        </div>

        {/* Créditos Acadêmicos — Código sem Fronteiras */}
        <div style={{
          marginTop: '24px',
          paddingTop: '20px',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          textAlign: 'center'
        }}>
          <p style={{
            margin: 0,
            fontSize: '0.9rem',
            color: 'rgba(255,255,255,0.45)',
            fontStyle: 'italic',
            lineHeight: 1.7
          }}>
            📚 Material desenvolvido no <strong style={{ color: 'rgba(255,255,255,0.65)', fontStyle: 'normal' }}>Código sem Fronteiras: Desenvolvimento Web com IA</strong>
            <br />
            <span style={{ fontSize: '0.85rem' }}>
              Instrutor: <strong style={{ color: 'rgba(255,255,255,0.6)', fontStyle: 'normal' }}>Eliakim Rocha</strong>
              &nbsp;·&nbsp;
              Data: <strong style={{ color: 'rgba(255,255,255,0.6)', fontStyle: 'normal' }}>15/08/2026</strong>
            </span>
          </p>
        </div>
      </div>
    </footer>
  );

}
