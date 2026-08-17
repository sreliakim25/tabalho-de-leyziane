import React, { useState } from 'react';
import { mockData } from '../mockData';

/**
 * PÁGINA: Segurança Digital
 * 
 * Uma trilha interativa onde o usuário analisa situações comuns da internet e
 * as classifica em: "PODE CONFIAR", "CUIDADO" ou "PROVAVELMENTE É GOLPE".
 * Ao classificar corretamente todos os casos, o progresso é computado e
 * a conquista de segurança digital é desbloqueada.
 */
export default function Seguranca({ desbloquearConquista }) {
  // Estado para armazenar as respostas dadas para cada situação
  // Chave: id da situação, Valor: { selecionada: string, correta: boolean }
  const [respostas, setRespostas] = useState({});
  const [concluiuTudo, setConcluiuTudo] = useState(false);

  // Mapeamento das classificações para comparar com o banco de dados
  const classes = {
    CONFIAR: { label: "Pode Confiar", cor: "var(--color-success)", emoji: "🟢" },
    CUIDADO: { label: "Cuidado / Atenção", cor: "var(--color-warning)", emoji: "🟡" },
    GOLPE: { label: "Provavelmente é Golpe", cor: "var(--color-danger)", emoji: "🔴" }
  };

  // Trata o clique de classificação do usuário
  const classificarCaso = (casoId, opcaoChave, respostaCorretaChave) => {
    const isCorreta = opcaoChave === respostaCorretaChave;
    
    setRespostas(prev => {
      const novasRespostas = {
        ...prev,
        [casoId]: {
          selecionada: opcaoChave,
          correta: isCorreta
        }
      };

      // Verifica se todas as situações do banco de segurança foram respondidas corretamente
      const todosCasos = mockData.seguranca;
      const todasCorretas = todosCasos.every(caso => 
        novasRespostas[caso.id] && novasRespostas[caso.id].correta
      );

      if (todasCorretas) {
        setConcluiuTudo(true);
        desbloquearConquista("seguro-internet");
      }

      return novasRespostas;
    });
  };

  return (
    <div className="container" style={{ maxWidth: '850px', animation: 'fadeIn 0.4s ease' }}>
      
      {/* Cabeçalho da Trilha */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <span style={{ fontSize: '3rem' }} role="img" aria-hidden="true">🛡️</span>
        <h2 style={{ fontSize: '2.4rem', margin: '16px 0 12px 0' }}>
          Trilha de Segurança Digital
        </h2>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '650px', margin: '0 auto' }}>
          A internet é maravilhosa, mas precisamos saber identificar perigos. 
          Analise os casos reais abaixo e nos diga se podemos confiar ou se é golpe!
        </p>
      </div>

      {/* Caixa de Sucesso quando conclui a trilha */}
      {concluiuTudo && (
        <div style={{
          backgroundColor: 'rgba(46, 125, 50, 0.15)',
          border: '3px solid var(--color-success)',
          borderRadius: 'var(--radius-md)',
          padding: '32px',
          textAlign: 'center',
          marginBottom: '40px',
          animation: 'slideUp 0.4s ease'
        }}>
          <span style={{ fontSize: '3.5rem' }} role="img" aria-hidden="true">🏆</span>
          <h3 style={{ color: 'var(--color-success)', fontSize: '1.6rem', marginTop: '12px' }}>
            Parabéns! Você é um Navegador Seguro!
          </h3>
          <p style={{ fontSize: '1.15rem', color: 'var(--text-color)', margin: '8px 0 0 0' }}>
            Você respondeu todas as situações corretamente e ganhou a conquista **"Seguro na Internet"**!
          </p>
        </div>
      )}

      {/* Listagem de Situações Reais */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', marginBottom: '60px' }}>
        {mockData.seguranca.map((caso, index) => {
          const resp = respostas[caso.id];
          const jaRespondido = !!resp;

          return (
            <article 
              key={caso.id} 
              className="card" 
              style={{
                backgroundColor: '#FFFFFF',
                border: jaRespondido 
                  ? (resp.correta ? '2px solid var(--color-success)' : '2px solid var(--color-danger)') 
                  : '1px solid var(--border-color)',
                boxShadow: 'var(--shadow)',
                padding: '32px'
              }}
            >
              <span style={{
                color: 'var(--primary)',
                fontSize: '1rem',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                display: 'block',
                marginBottom: '8px'
              }}>
                Situação {index + 1}
              </span>

              <h3 style={{ fontSize: '1.5rem', marginBottom: '14px', color: 'var(--text-color)' }}>
                {caso.titulo}
              </h3>

              <p style={{
                fontSize: '1.2rem',
                lineHeight: 1.6,
                backgroundColor: 'var(--bg-color)',
                padding: '24px',
                borderRadius: 'var(--radius-md)',
                color: 'var(--text-color)',
                marginBottom: '24px',
                border: '1px solid var(--border-color)'
              }}>
                "{caso.descricao}"
              </p>

              {/* Botões de Decisão (Escondidos se já respondeu com sucesso) */}
              {!jaRespondido ? (
                <div>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '12px', color: 'var(--text-muted)' }}>
                    O que você faria? Classifique esta mensagem:
                  </h4>
                  
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    {Object.keys(classes).map(key => (
                      <button
                        key={key}
                        onClick={() => classificarCaso(caso.id, key, caso.classificacao)}
                        className="btn"
                        style={{
                          flex: '1 1 200px',
                          padding: '14px',
                          fontSize: '1.05rem',
                          backgroundColor: '#FFFFFF',
                          color: 'var(--text-color)',
                          border: `2px solid ${classes[key].cor}`,
                          borderRadius: 'var(--radius-md)',
                          cursor: 'pointer',
                          transition: 'var(--transition)'
                        }}
                      >
                        <span role="img" aria-hidden="true" style={{ marginRight: '6px' }}>
                          {classes[key].emoji}
                        </span>
                        {classes[key].label}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                /* Detalhe após responder */
                <div style={{ animation: 'fadeIn 0.3s ease' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    marginBottom: '16px',
                    color: resp.correta ? 'var(--color-success)' : 'var(--color-danger)'
                  }}>
                    <span style={{ fontSize: '1.8rem' }} role="img" aria-hidden="true">
                      {resp.correta ? '✅' : '❌'}
                    </span>
                    <strong style={{ fontSize: '1.25rem' }}>
                      {resp.correta 
                        ? 'Você acertou a classificação!' 
                        : `Oops! Você escolheu "${classes[resp.selecionada].label}", mas a resposta ideal é diferente.`
                      }
                    </strong>
                  </div>

                  {/* Dica didática explicativa */}
                  <div style={{
                    padding: '20px',
                    borderRadius: '8px',
                    backgroundColor: 'var(--bg-color)',
                    borderLeft: `5px solid ${classes[caso.classificacao].cor}`
                  }}>
                    <strong style={{ 
                      display: 'block', 
                      fontSize: '1.05rem', 
                      color: classes[caso.classificacao].cor,
                      marginBottom: '6px',
                      textTransform: 'uppercase'
                    }}>
                      💡 Classificação correta: {classes[caso.classificacao].label}
                    </strong>
                    <p style={{ fontSize: '1.1rem', margin: 0, lineHeight: 1.5, color: 'var(--text-color)' }}>
                      {caso.dica}
                    </p>
                  </div>

                  {/* Permite refazer se errou */}
                  {!resp.correta && (
                    <button
                      onClick={() => setRespostas(prev => {
                        const r = { ...prev };
                        delete r[caso.id];
                        return r;
                      })}
                      className="btn btn-secondary"
                      style={{ marginTop: '16px', padding: '8px 16px', fontSize: '0.95rem' }}
                    >
                      🔄 Tentar Classificar Novamente
                    </button>
                  )}
                </div>
              )}
            </article>
          );
        })}
      </div>

    </div>
  );
}
