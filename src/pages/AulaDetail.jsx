import React, { useState, useEffect } from 'react';
import { mockData } from '../mockData';

/**
 * PÁGINA: Detalhe da Aula
 * 
 * Exibe o conteúdo de uma lição passo a passo interativo (Passo 1, Passo 2...)
 * seguindo a estrutura exigida pelo prompt:
 * 1. Introdução ("O que você vai aprender")
 * 2. Passos explicativos simples e visuais
 * 3. Exercício de fixação interativo com explicação da resposta
 * 4. Botão de conclusão que computa progresso e desbloqueia conquistas
 * 5. Botão "Ir para a próxima aula" para navegação contínua
 */
export default function AulaDetail({ 
  aulaId, 
  onBack, 
  onConcluirAula, 
  progresso, 
  desbloquearConquista 
}) {
  // Encontra a aula ativa
  const aula = mockData.aulas.find(a => a.id === aulaId);
  const curso = mockData.cursos.find(c => c.id === aula.cursoId);

  // Estados locais para controle de fluxo da aula
  const [passoAtivo, setPassoAtivo] = useState(0);
  const [mostrarExercicio, setMostrarExercicio] = useState(false);
  const [respostaSelecionada, setRespostaSelecionada] = useState(null);
  const [exercicioRespondido, setExercicioRespondido] = useState(false);
  const [respostaCorreta, setRespostaCorreta] = useState(false);

  // Reinicia os estados toda vez que mudamos de aula
  useEffect(() => {
    setPassoAtivo(0);
    setMostrarExercicio(false);
    setRespostaSelecionada(null);
    setExercicioRespondido(false);
    setRespostaCorreta(false);
  }, [aulaId]);

  // Se a aula não for encontrada
  if (!aula) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '40px' }}>
        <h2>Aula não encontrada.</h2>
        <button onClick={onBack} className="btn btn-primary">Voltar para Cursos</button>
      </div>
    );
  }

  // Identifica se existe uma próxima aula na trilha
  const aulasDaTrilha = mockData.aulas.filter(a => a.cursoId === aula.cursoId);
  const indexAtual = aulasDaTrilha.findIndex(a => a.id === aula.id);
  const proximaAula = indexAtual < aulasDaTrilha.length - 1 ? aulasDaTrilha[indexAtual + 1] : null;

  // Lida com o avanço dos passos
  const proximoPasso = () => {
    if (passoAtivo < aula.passos.length - 1) {
      setPassoAtivo(prev => prev + 1);
    } else {
      // Se era o último passo, avança para o Exercício Prático
      setMostrarExercicio(true);
    }
  };

  // Lida com a resposta do Exercício
  const confirmarResposta = () => {
    if (respostaSelecionada === null) return;
    
    const correta = respostaSelecionada === aula.exercicio.respostaCorreta;
    setRespostaCorreta(correta);
    setExercicioRespondido(true);
    
    if (correta) {
      // Salva a aula como concluída e verifica se desbloqueia conquistas
      onConcluirAula(aula.id);
      
      // Regras de Conquistas da Gamificação:
      // Conquista: Primeiro Passo (qualquer aula concluída)
      if (progresso.length === 0) {
        desbloquearConquista("primeiro-passo");
      }
      
      // Conquista: Explorador (concluir a aula-1-5 de criar pastas)
      if (aula.id === "aula-1-5") {
        desbloquearConquista("explorador");
      }

      // Conquista: Independente (concluir a trilha 1 inteira)
      const aulasTrilha1 = mockData.aulas.filter(a => a.cursoId === "nivel-1").map(a => a.id);
      const concluidasTrilha1 = aulasTrilha1.filter(id => id === aula.id || progresso.includes(id));
      if (concluidasTrilha1.length === aulasTrilha1.length) {
        desbloquearConquista("independente");
      }
    }
  };

  return (
    <div className="container" style={{ maxWidth: '800px', animation: 'fadeIn 0.4s ease' }}>
      
      {/* Barra superior de status e botão voltar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <button
          onClick={onBack}
          className="btn btn-secondary"
          style={{ padding: '8px 16px', fontSize: '1rem' }}
        >
          ⬅️ Sair da Aula
        </button>
        <span style={{ fontSize: '1rem', fontWeight: 'bold', color: 'var(--text-muted)' }}>
          Trilha: {curso.titulo}
        </span>
      </div>

      {/* Conteúdo Principal */}
      <article className="card" style={{ padding: '40px', backgroundColor: '#FFFFFF' }}>
        
        {/* FASE 1: Apresentação e Passos Explicativos */}
        {!mostrarExercicio ? (
          <div>
            {/* O que vamos aprender (apenas no primeiro passo) */}
            {passoAtivo === 0 && (
              <div style={{
                backgroundColor: 'var(--bg-color)',
                padding: '24px',
                borderRadius: 'var(--radius-md)',
                marginBottom: '32px',
                borderLeft: '4px solid var(--primary)'
              }}>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--primary)', margin: '0 0 8px 0' }}>
                  🎯 O que você vai aprender hoje:
                </h3>
                <p style={{ fontSize: '1.1rem', margin: 0, color: 'var(--text-color)' }}>
                  {aula.desc}
                </p>
              </div>
            )}

            {/* Passo Explicativo Ativo */}
            <div style={{ animation: 'fadeIn 0.3s ease' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{
                  fontSize: '0.9rem',
                  fontWeight: 'bold',
                  color: 'var(--secondary)',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  Passo {passoAtivo + 1} de {aula.passos.length}
                </span>
                
                {/* Indicador visual de progresso na aula */}
                <div style={{
                  display: 'flex',
                  gap: '4px'
                }}>
                  {aula.passos.map((_, idx) => (
                    <div key={idx} style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      backgroundColor: idx <= passoAtivo ? 'var(--primary)' : 'var(--border-color)',
                      transition: 'background-color 0.3s'
                    }} />
                  ))}
                </div>
              </div>

              <h2 style={{ fontSize: '1.8rem', marginBottom: '20px' }}>
                {aula.passos[passoAtivo].titulo}
              </h2>

              {/* Box de Demonstração Visual */}
              <div style={{
                backgroundColor: 'var(--bg-color)',
                borderRadius: 'var(--radius-md)',
                padding: '40px 20px',
                textAlign: 'center',
                marginBottom: '28px',
                border: '1px solid var(--border-color)',
                fontSize: '4.5rem',
                lineHeight: 1
              }} role="img" aria-label="Ilustração representativa do passo">
                {aula.passos[passoAtivo].imagem}
              </div>

              <p style={{
                fontSize: '1.25rem',
                lineHeight: 1.6,
                color: 'var(--text-color)',
                marginBottom: '32px',
                whiteSpace: 'pre-line' // Mantém quebras de linha se existirem
              }}>
                {aula.passos[passoAtivo].conteudo}
              </p>

              {/* Botão de Avanço */}
              <button
                onClick={proximoPasso}
                className="btn btn-primary"
                style={{ width: '100%', padding: '18px 36px', fontSize: '1.25rem' }}
              >
                ENTENDI — PRÓXIMO PASSO ➡️
              </button>
            </div>
          </div>
        ) : (
          /* FASE 2: Exercício Prático de Fixação */
          <div style={{ animation: 'slideUp 0.4s ease' }}>
            <span style={{
              backgroundColor: 'var(--secondary)',
              color: 'var(--text-color)',
              padding: '6px 14px',
              borderRadius: '20px',
              fontSize: '0.9rem',
              fontWeight: 'bold',
              display: 'inline-block',
              marginBottom: '16px'
            }}>
              ✏️ Desafio Prático
            </span>

            <h2 style={{ fontSize: '1.8rem', marginBottom: '24px' }}>
              Vamos testar o que você aprendeu?
            </h2>

            <p style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '20px' }}>
              {aula.exercicio.pergunta}
            </p>

            {/* Alternativas */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px' }}>
              {aula.exercicio.opcoes.map((opcao, idx) => {
                let btnStyle = {
                  padding: '16px 24px',
                  fontSize: '1.15rem',
                  fontFamily: 'var(--font-body)',
                  textAlign: 'left',
                  borderRadius: 'var(--radius-md)',
                  cursor: exercicioRespondido ? 'not-allowed' : 'pointer',
                  transition: 'var(--transition)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  width: '100%'
                };

                // Lógica de cores baseada no estado de resposta
                if (!exercicioRespondido) {
                  btnStyle.backgroundColor = respostaSelecionada === idx ? 'var(--primary)' : '#FFFFFF';
                  btnStyle.color = respostaSelecionada === idx ? '#FFFFFF' : 'var(--text-color)';
                  btnStyle.border = respostaSelecionada === idx ? '2px solid var(--primary)' : '2px solid var(--border-color)';
                } else {
                  if (idx === aula.exercicio.respostaCorreta) {
                    // Resposta correta (sempre destaca em verde)
                    btnStyle.backgroundColor = 'rgba(46, 125, 50, 0.15)';
                    btnStyle.color = 'var(--color-success)';
                    btnStyle.border = '2px solid var(--color-success)';
                    btnStyle.fontWeight = 'bold';
                  } else if (respostaSelecionada === idx) {
                    // Resposta errada selecionada pelo usuário (destaca em vermelho)
                    btnStyle.backgroundColor = 'rgba(198, 40, 40, 0.15)';
                    btnStyle.color = 'var(--color-danger)';
                    btnStyle.border = '2px solid var(--color-danger)';
                  } else {
                    // Outras opções incorretas neutras
                    btnStyle.backgroundColor = '#FFFFFF';
                    btnStyle.color = 'var(--text-muted)';
                    btnStyle.border = '1px solid var(--border-color)';
                    btnStyle.opacity = 0.5;
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={exercicioRespondido}
                    onClick={() => setRespostaSelecionada(idx)}
                    style={btnStyle}
                  >
                    <span style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      backgroundColor: respostaSelecionada === idx ? 'var(--secondary)' : 'var(--bg-color)',
                      color: 'var(--text-color)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.9rem',
                      fontWeight: 'bold'
                    }}>
                      {String.fromCharCode(65 + idx)} {/* Converte 0, 1, 2 para A, B, C */}
                    </span>
                    <span>{opcao}</span>
                  </button>
                );
              })}
            </div>

            {/* Resultado e Explicação */}
            {!exercicioRespondido ? (
              <button
                onClick={confirmarResposta}
                disabled={respostaSelecionada === null}
                className="btn btn-primary"
                style={{
                  width: '100%',
                  padding: '16px',
                  fontSize: '1.2rem',
                  opacity: respostaSelecionada === null ? 0.5 : 1,
                  cursor: respostaSelecionada === null ? 'not-allowed' : 'pointer'
                }}
              >
                Confirmar Resposta
              </button>
            ) : (
              <div style={{
                padding: '24px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: respostaCorreta ? 'rgba(46, 125, 50, 0.1)' : 'rgba(198, 40, 40, 0.1)',
                border: respostaCorreta ? '2px solid var(--color-success)' : '2px solid var(--color-danger)',
                marginBottom: '32px',
                animation: 'fadeIn 0.3s ease'
              }}>
                <h4 style={{
                  color: respostaCorreta ? 'var(--color-success)' : 'var(--color-danger)',
                  fontSize: '1.3rem',
                  margin: '0 0 10px 0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  {respostaCorreta ? '🎉 Resposta Correta! Muito bem!' : '❌ Ops! Resposta incorreta.'}
                </h4>
                <p style={{ fontSize: '1.1rem', margin: '0 0 16px 0', color: 'var(--text-color)' }}>
                  {aula.exercicio.explicacao}
                </p>

                {/* Se errou, permite tentar novamente */}
                {!respostaCorreta && (
                  <button
                    onClick={() => {
                      setRespostaSelecionada(null);
                      setExercicioRespondido(false);
                    }}
                    className="btn btn-secondary"
                    style={{ padding: '10px 20px', fontSize: '1rem', width: '100%' }}
                  >
                    🔄 Tentar Novamente
                  </button>
                )}
              </div>
            )}

            {/* Ações de Conclusão / Avanço (Apenas quando acertou) */}
            {exercicioRespondido && respostaCorreta && (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                animation: 'slideUp 0.3s ease'
              }}>
                <div style={{
                  backgroundColor: 'rgba(232, 160, 32, 0.15)',
                  padding: '16px',
                  borderRadius: '8px',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  color: 'var(--primary)',
                  fontSize: '1.05rem',
                  border: '1px solid var(--secondary)'
                }}>
                  🏆 Parabéns! Você concluiu: "{aula.titulo}"!
                </div>

                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                  {proximaAula ? (
                    <button
                      onClick={() => onSelectAula(proximaAula.id)}
                      className="btn btn-primary"
                      style={{ flex: 1, minWidth: '200px', fontSize: '1.15rem' }}
                    >
                      Ir para a Próxima Aula ➡️
                    </button>
                  ) : (
                    <button
                      onClick={onBack}
                      className="btn btn-primary"
                      style={{ flex: 1, minWidth: '200px', fontSize: '1.15rem' }}
                    >
                      🎓 Trilha Concluída! Voltar
                    </button>
                  )}
                  
                  <button
                    onClick={onBack}
                    className="btn btn-secondary"
                    style={{ flex: 1, minWidth: '200px', fontSize: '1.15rem' }}
                  >
                    Voltar para a Lista de Aulas
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </article>
    </div>
  );
}
