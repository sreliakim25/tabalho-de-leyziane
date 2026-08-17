import React from 'react';

/**
 * COMPONENTE: AccessibilityBar
 * 
 * Este componente exibe uma barra de ferramentas no topo da página.
 * Ele permite que o usuário aumente/diminua o tamanho do texto e ative o modo de alto contraste.
 * Comentários explicam as técnicas de acessibilidade digital (a11y) utilizadas.
 */
export default function AccessibilityBar({ fontSize, setFontSize, altoContraste, setAltoContraste }) {
  
  // Função para aumentar o tamanho do texto (limite de 140%)
  const aumentarFonte = () => {
    if (fontSize < 140) {
      setFontSize(prev => prev + 10);
    }
  };

  // Função para diminuir o tamanho do texto (limite de 100% como base)
  const diminuirFonte = () => {
    if (fontSize > 100) {
      setFontSize(prev => prev - 10);
    }
  };

  // Alterna o modo de Alto Contraste
  const alternarContraste = () => {
    setAltoContraste(prev => !prev);
  };

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
        borderBottom: '2px solid var(--secondary)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span role="img" aria-hidden="true" style={{ fontSize: '1.2rem' }}>♿</span>
        <span style={{ fontWeight: 'bold', fontSize: '0.95rem' }}>Opções de Acessibilidade:</span>
      </div>

      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        {/* Controles de Tamanho do Texto */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '0.9rem', marginRight: '4px' }}>Tamanho da Letra:</span>
          
          <button 
            onClick={diminuirFonte} 
            className="btn-a11y"
            aria-label="Diminuir tamanho do texto"
            disabled={fontSize <= 100}
            style={{
              padding: '6px 12px',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: fontSize <= 100 ? 'not-allowed' : 'pointer',
              opacity: fontSize <= 100 ? 0.5 : 1,
              backgroundColor: '#FFFFFF',
              color: '#000000',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
          >
            A-
          </button>
          
          <span style={{ fontWeight: 'bold', minWidth: '45px', textAlign: 'center', fontSize: '0.95rem' }}>
            {fontSize}%
          </span>
          
          <button 
            onClick={aumentarFonte} 
            className="btn-a11y"
            aria-label="Aumentar tamanho do texto"
            disabled={fontSize >= 140}
            style={{
              padding: '6px 12px',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: fontSize >= 140 ? 'not-allowed' : 'pointer',
              opacity: fontSize >= 140 ? 0.5 : 1,
              backgroundColor: '#FFFFFF',
              color: '#000000',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
          >
            A+
          </button>
        </div>

        {/* Linha separadora vertical no desktop */}
        <div style={{ width: '1px', height: '20px', backgroundColor: 'rgba(255,255,255,0.3)' }} aria-hidden="true" />

        {/* Controle de Alto Contraste */}
        <button 
          onClick={alternarContraste}
          className="btn-a11y"
          aria-label={altoContraste ? "Desativar Alto Contraste" : "Ativar Alto Contraste"}
          style={{
            padding: '6px 12px',
            fontSize: '0.95rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            backgroundColor: altoContraste ? '#FFFF00' : '#FFFFFF',
            color: '#000000',
            border: '1px solid #ccc',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <span role="img" aria-hidden="true">🌗</span>
          {altoContraste ? "Contraste Normal" : "Alto Contraste"}
        </button>
      </div>
    </section>
  );
}
