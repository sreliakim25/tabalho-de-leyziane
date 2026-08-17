import React from 'react';
import { mockData } from '../mockData';

/**
 * PÁGINA: Meu Aprendizado (Painel do Usuário / Gamificação)
 * 
 * Exibe o progresso geral do usuário na plataforma através de uma barra percentual,
 * mensagens motivacionais personalizadas e um quadro de conquistas gamificadas desbloqueáveis.
 * Contém também um botão para resetar o progresso, útil para testes e re-aprendizado.
 */
export default function MeuAprendizado({ 
  progresso, 
  conquistas, 
  onResetProgresso, 
  onSelectAula 
}) {
  
  // Total de aulas cadastradas na plataforma
  const totalAulas = mockData.aulas.length;
  // Aulas concluídas pelo usuário
  const aulasConcluidasCount = progresso.length;
  // Percentual de progresso
  const percentual = totalAulas > 0 ? Math.round((aulasConcluidasCount / totalAulas) * 100) : 0;

  // Define mensagens motivacionais com base no progresso (Conforme item 12 do prompt)
  let mensagemMotivadora = "Dê o seu primeiro passo escolhendo uma aula!";
  let subMensagem = "Toda grande jornada começa com uma pequena ação.";

  if (percentual > 0 && percentual < 35) {
    mensagemMotivadora = "Você está indo muito bem! 🌱";
    subMensagem = `Você já começou a sua caminhada e aprendeu ${aulasConcluidasCount} coisas novas! Continue assim.`;
  } else if (percentual >= 35 && percentual < 70) {
    mensagemMotivadora = "Mais de um terço concluído! 🚀";
    subMensagem = `Impressionante! Você já concluiu ${aulasConcluidasCount} aulas. A tecnologia está se tornando sua amiga.`;
  } else if (percentual >= 70 && percentual < 100) {
    mensagemMotivadora = "Quase lá! Falta muito pouco! 🎓";
    subMensagem = `Você já domina a maior parte do conteúdo. Só mais algumas aulas e você será totalmente independente!`;
  } else if (percentual === 100) {
    mensagemMotivadora = "Parabéns! Você completou tudo! 🏆";
    subMensagem = "Você superou todos os desafios e concluiu a plataforma Primeiros Passos Tech. Agora você consegue fazer sozinho!";
  }

  // Lista de aulas que o usuário concluiu para exibição em uma lista rápida
  const aulasConcluidas = mockData.aulas.filter(a => progresso.includes(a.id));

  return (
    <div className="container" style={{ maxWidth: '900px', animation: 'fadeIn 0.4s ease' }}>
      
      {/* Cabeçalho do Aluno */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '2.4rem', marginBottom: '12px' }}>
          Meu Aprendizado 🎓
        </h2>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>
          Acompanhe seu avanço, veja suas medalhas e reveja as aulas concluídas.
        </p>
      </div>

      {/* Box de Progresso Geral */}
      <section className="card" style={{
        backgroundColor: '#FFFFFF',
        padding: '40px',
        textAlign: 'center',
        marginBottom: '40px',
        border: '2px solid var(--border-color)',
        boxShadow: 'var(--shadow)'
      }}>
        <h3 style={{ fontSize: '1.8rem', color: 'var(--primary)', marginBottom: '12px' }}>
          {mensagemMotivadora}
        </h3>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '28px', lineHeight: 1.5 }}>
          {subMensagem}
        </p>

        {/* Barra de Progresso Visual */}
        <div style={{ marginBottom: '16px' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            marginBottom: '8px'
          }}>
            <span>Seu Progresso Geral</span>
            <span style={{ color: 'var(--primary)' }}>{percentual}%</span>
          </div>
          
          <div style={{
            width: '100%',
            height: '24px',
            backgroundColor: 'var(--bg-color)',
            borderRadius: '12px',
            overflow: 'hidden',
            border: '1px solid var(--border-color)'
          }}
          role="progressbar"
          aria-valuenow={percentual}
          aria-valuemin="0"
          aria-valuemax="100"
          >
            <div style={{
              width: `${percentual}%`,
              height: '100%',
              backgroundColor: 'var(--primary)',
              backgroundImage: 'linear-gradient(45deg, var(--primary) 25%, var(--secondary) 50%, var(--primary) 75%)',
              backgroundSize: '40px 40px',
              transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
              borderRadius: '12px'
            }} />
          </div>
        </div>

        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', margin: 0 }}>
          Você completou <strong>{aulasConcluidasCount}</strong> de um total de <strong>{totalAulas}</strong> aulas na plataforma.
        </p>
      </section>

      {/* Grid de Seções: Conquistas e Aulas Concluídas */}
      <div className="grid grid-2" style={{ marginBottom: '60px', alignItems: 'start' }}>
        
        {/* Seção de Conquistas (Gamificação) */}
        <section className="card" style={{ backgroundColor: '#FFFFFF', padding: '32px' }}>
          <h3 style={{ fontSize: '1.4rem', marginBottom: '20px', borderBottom: '2px solid var(--bg-color)', paddingBottom: '10px' }}>
            🏅 Suas Conquistas
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {mockData.conquistas.map(conq => {
              const possuiConquista = conquistas.includes(conq.id);
              return (
                <div 
                  key={conq.id} 
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    opacity: possuiConquista ? 1 : 0.4,
                    filter: possuiConquista ? 'none' : 'grayscale(100%)',
                    transition: 'var(--transition)'
                  }}
                >
                  <div style={{
                    fontSize: '2.5rem',
                    width: '60px',
                    height: '60px',
                    backgroundColor: possuiConquista ? 'var(--bg-color)' : '#E0E0E0',
                    border: possuiConquista ? '2px solid var(--secondary)' : '1px solid #CCC',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {conq.icone}
                  </div>
                  
                  <div>
                    <h4 style={{ 
                      fontSize: '1.15rem', 
                      margin: '0 0 4px 0', 
                      color: possuiConquista ? 'var(--primary)' : 'var(--text-color)',
                      fontWeight: 'bold'
                    }}>
                      {conq.titulo}
                    </h4>
                    <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', margin: 0 }}>
                      {conq.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Seção de Histórico de Aulas Concluídas */}
        <section className="card" style={{ backgroundColor: '#FFFFFF', padding: '32px' }}>
          <h3 style={{ fontSize: '1.4rem', marginBottom: '20px', borderBottom: '2px solid var(--bg-color)', paddingBottom: '10px' }}>
            ✅ Aulas Concluídas
          </h3>

          {aulasConcluidas.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {aulasConcluidas.map(aula => (
                <button
                  key={aula.id}
                  onClick={() => onSelectAula(aula.id)}
                  style={{
                    padding: '16px',
                    backgroundColor: 'var(--bg-color)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-body)',
                    fontSize: '1.1rem',
                    color: 'var(--text-color)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transition: 'var(--transition)'
                  }}
                  className="aula-historico-btn"
                >
                  <span>{aula.titulo}</span>
                  <span style={{ fontSize: '0.9rem', color: 'var(--primary)', fontWeight: 'bold' }}>
                    Rever Aula 🔄
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '24px', color: 'var(--text-muted)' }}>
              <span style={{ fontSize: '2rem' }} role="img" aria-hidden="true">📝</span>
              <p style={{ fontSize: '1.1rem', marginTop: '12px', margin: 0 }}>
                Nenhuma aula concluída ainda.
              </p>
            </div>
          )}

          {/* Botão de Reset (Mais abaixo no card) */}
          <div style={{ marginTop: '40px', borderTop: '1px solid var(--border-color)', paddingTop: '24px' }}>
            <button
              onClick={onResetProgresso}
              className="btn btn-secondary"
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '1.05rem',
                borderColor: 'var(--color-danger)',
                color: 'var(--color-danger)'
              }}
            >
              ⚠️ Reiniciar Todo o Meu Progresso
            </button>
          </div>
        </section>

      </div>

    </div>
  );
}
