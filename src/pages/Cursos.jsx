import React from 'react';
import { mockData } from '../mockData';

/**
 * PÁGINA: Cursos (Trilhas de Aprendizado)
 * 
 * Exibe todas as trilhas disponíveis na plataforma (Níveis 1 a 4).
 * Inclui o botão de destaque "Eu realmente não sei usar computador" para direcionar
 * imediatamente o usuário para a primeira aula básica.
 * Lista as aulas de cada curso e indica o status de conclusão (concluído/pendente).
 */
export default function Cursos({ 
  setCurrentPage, 
  setSelectedCursoId, 
  selectedCursoId, 
  progresso, 
  onSelectAula 
}) {
  
  // Função para abrir o modo básico "Eu realmente não sei usar computador"
  const iniciarDoZeroAbsoluto = () => {
    // Direciona imediatamente para a primeira aula do Nível 1
    onSelectAula("aula-1-1");
  };

  // Se um curso específico estiver selecionado, exibe os detalhes dele e sua lista de aulas
  if (selectedCursoId) {
    const curso = mockData.cursos.find(c => c.id === selectedCursoId);
    const aulasDoCurso = mockData.aulas.filter(a => a.cursoId === selectedCursoId);

    return (
      <div className="container" style={{ animation: 'fadeIn 0.4s ease' }}>
        {/* Botão de Voltar */}
        <button
          onClick={() => setSelectedCursoId(null)}
          className="btn btn-secondary"
          style={{
            marginBottom: '32px',
            padding: '10px 20px',
            fontSize: '1.05rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <span role="img" aria-hidden="true">⬅️</span> Voltar para Cursos
        </button>

        {/* Cabeçalho do Curso */}
        <div style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          padding: '40px',
          boxShadow: 'var(--shadow)',
          marginBottom: '40px',
          display: 'flex',
          gap: '24px',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          <span style={{ fontSize: '4.5rem', lineHeight: 1 }} role="img" aria-hidden="true">
            {curso.imagem}
          </span>
          <div style={{ flex: 1, minWidth: '280px' }}>
            <span style={{
              backgroundColor: 'var(--secondary)',
              color: 'var(--text-color)',
              padding: '4px 12px',
              borderRadius: '12px',
              fontSize: '0.9rem',
              fontWeight: 'bold',
              display: 'inline-block',
              marginBottom: '12px'
            }}>
              Trilha: {curso.nivel}
            </span>
            <h2 style={{ fontSize: '2.2rem', marginBottom: '12px' }}>{curso.titulo}</h2>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>
              {curso.desc}
            </p>
          </div>
        </div>

        {/* Listagem de Aulas */}
        <h3 style={{ fontSize: '1.6rem', marginBottom: '24px', fontFamily: 'var(--font-title)' }}>
          Aulas Disponíveis nesta Trilha
        </h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '60px' }}>
          {aulasDoCurso.map((aula, index) => {
            const isConcluida = progresso.includes(aula.id);
            return (
              <button
                key={aula.id}
                onClick={() => onSelectAula(aula.id)}
                aria-label={`Aula ${index + 1}: ${aula.titulo}. ${isConcluida ? 'Concluída' : 'Não concluída'}`}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '24px 32px',
                  backgroundColor: '#FFFFFF',
                  border: isConcluida ? '2px solid var(--secondary)' : '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  boxShadow: 'var(--shadow)',
                  transition: 'var(--transition)',
                  flexWrap: 'wrap',
                  gap: '16px',
                  width: '100%'
                }}
                className="aula-list-item"
              >
                <div style={{ flex: 1, minWidth: '250px' }}>
                  <h4 style={{ 
                    fontSize: '1.25rem', 
                    color: 'var(--primary)', 
                    margin: '0 0 6px 0',
                    fontFamily: 'var(--font-body)',
                    fontWeight: 'bold'
                  }}>
                    {aula.titulo}
                  </h4>
                  <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', margin: 0 }}>
                    {aula.desc}
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <span style={{ 
                    fontSize: '1rem', 
                    color: 'var(--text-muted)',
                    backgroundColor: 'var(--bg-color)',
                    padding: '4px 10px',
                    borderRadius: '8px',
                    fontWeight: 'bold'
                  }}>
                    ⏱️ {aula.duracao}
                  </span>
                  
                  {isConcluida ? (
                    <span style={{
                      backgroundColor: 'rgba(46, 125, 50, 0.15)',
                      color: 'var(--color-success)',
                      padding: '8px 16px',
                      borderRadius: '20px',
                      fontWeight: 'bold',
                      fontSize: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      ✅ Concluída
                    </span>
                  ) : (
                    <span style={{
                      backgroundColor: 'var(--bg-color)',
                      color: 'var(--text-color)',
                      padding: '8px 16px',
                      borderRadius: '20px',
                      fontWeight: 'bold',
                      fontSize: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      border: '1px solid var(--border-color)'
                    }}>
                      ➡️ Começar
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Visualização principal de todos os cursos (Listagem)
  return (
    <div className="container" style={{ animation: 'fadeIn 0.4s ease' }}>
      {/* Botão de destaque "Modo Não Sei Nada" (Conforme item 11 do prompt) */}
      <section style={{
        backgroundColor: 'var(--primary)',
        color: '#FFFFFF',
        borderRadius: 'var(--radius-lg)',
        padding: '40px',
        marginBottom: '48px',
        border: '3px solid var(--secondary)',
        boxShadow: 'var(--shadow-hover)',
        textAlign: 'center'
      }}>
        <span style={{ fontSize: '3.5rem' }} role="img" aria-hidden="true">💡</span>
        <h2 style={{ color: 'var(--secondary)', fontSize: '2.2rem', margin: '16px 0 12px 0' }}>
          Eu realmente não sei usar computador
        </h2>
        <p style={{ fontSize: '1.25rem', maxWidth: '650px', margin: '0 auto 28px auto', color: '#F5F5F5', lineHeight: 1.5 }}>
          Se você tem medo ou nunca mexeu em um computador antes, clique no botão abaixo. Nós vamos te guiar passo a passo com paciência desde o básico absoluto.
        </p>
        <button
          onClick={iniciarDoZeroAbsoluto}
          className="btn"
          style={{
            backgroundColor: 'var(--secondary)',
            color: 'var(--text-color)',
            fontSize: '1.3rem',
            padding: '18px 36px',
            border: 'none'
          }}
        >
          Clique aqui para começar do início
        </button>
      </section>

      {/* Grid de Trilhas normais */}
      <h3 style={{ fontSize: '1.8rem', marginBottom: '24px', fontFamily: 'var(--font-title)' }}>
        Nossas Trilhas de Aprendizado
      </h3>
      
      <div className="grid grid-2" style={{ marginBottom: '60px' }}>
        {mockData.cursos.map(curso => (
          <div key={curso.id} className="card" style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '24px'
          }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <span style={{ fontSize: '3rem', lineHeight: 1 }} role="img" aria-hidden="true">
                  {curso.imagem}
                </span>
                <span style={{
                  backgroundColor: 'var(--bg-color)',
                  color: 'var(--primary)',
                  padding: '4px 10px',
                  borderRadius: '8px',
                  fontSize: '0.85rem',
                  fontWeight: 'bold',
                  border: '1px solid var(--border-color)'
                }}>
                  {curso.nivel}
                </span>
              </div>
              
              <h4 style={{ fontSize: '1.4rem', marginBottom: '10px' }}>{curso.titulo}</h4>
              <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
                {curso.desc}
              </p>
            </div>

            <button
              onClick={() => setSelectedCursoId(curso.id)}
              className="btn btn-primary"
              style={{ width: '100%', fontSize: '1.1rem', padding: '12px 24px' }}
            >
              Ver Aulas desta Trilha
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
