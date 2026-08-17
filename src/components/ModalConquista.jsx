import React from 'react';

/**
 * COMPONENTE: ModalConquista (Feedback Visual Gamificado)
 * 
 * Exibe um alerta popup com animação suave e cores douradas quando o usuário
 * desbloqueia uma conquista. Traz o efeito "UAU" e reforça a motivação de aprendizado.
 */
export default function ModalConquista({ conquista, onClose }) {
  if (!conquista) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(47, 38, 37, 0.75)', // Escurece o fundo
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px',
      animation: 'fadeIn 0.3s ease'
    }}
    role="dialog"
    aria-modal="true"
    aria-labelledby="conquista-titulo"
    >
      <div style={{
        backgroundColor: 'var(--bg-color)', // Creme
        border: '4px solid var(--secondary)', // Dourado
        borderRadius: 'var(--radius-lg)',
        padding: '40px',
        maxWidth: '480px',
        width: '100%',
        textAlign: 'center',
        boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
        animation: 'scaleUp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      }}>
        {/* Emojis festivos simulando confete */}
        <div style={{ fontSize: '2.5rem', marginBottom: '10px' }} role="img" aria-label="Festa">
          ✨ 🎉 ✨
        </div>

        <span style={{
          fontSize: '0.95rem',
          fontWeight: 'bold',
          color: 'var(--primary)',
          letterSpacing: '1px',
          textTransform: 'uppercase',
          display: 'block',
          marginBottom: '16px'
        }}>
          Nova Conquista Desbloqueada!
        </span>

        {/* Círculo do Ícone */}
        <div style={{
          width: '100px',
          height: '100px',
          backgroundColor: '#FFFFFF',
          border: '3px solid var(--secondary)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '4.5rem',
          margin: '0 auto 24px auto',
          boxShadow: 'var(--shadow)'
        }} role="img" aria-label={conquista.titulo}>
          {conquista.icone}
        </div>

        <h3 id="conquista-titulo" style={{ fontSize: '2rem', marginBottom: '12px', fontFamily: 'var(--font-title)' }}>
          {conquista.titulo}
        </h3>

        <p style={{ fontSize: '1.25rem', color: 'var(--text-color)', marginBottom: '32px', lineHeight: 1.5 }}>
          {conquista.desc}
        </p>

        <button
          onClick={onClose}
          className="btn btn-primary"
          style={{ width: '100%', padding: '16px', fontSize: '1.2rem' }}
        >
          Excelente! Vamos Continuar 🚀
        </button>
      </div>
    </div>
  );
}
