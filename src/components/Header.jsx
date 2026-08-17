import React from 'react';

/**
 * COMPONENTE: Header
 * 
 * Cabeçalho da aplicação contendo o logotipo e os links de navegação principais.
 * O menu de navegação é plano e simplificado para evitar confusões ou menus suspensos.
 */
export default function Header({ currentPage, setCurrentPage, progressoPercent }) {
  
  // Lista de itens do menu para renderização dinâmica
  const menuItems = [
    { id: 'home', label: 'Início', icone: '🏠' },
    { id: 'cursos', label: 'Cursos', icone: '📚' },
    { id: 'seguranca', label: 'Segurança Digital', icone: '🛡️' },
    { id: 'glossario', label: 'Dicionário Tech', icone: '📖' },
    { id: 'ajuda', label: 'Preciso de Ajuda', icone: '🔍' },
    { id: 'perfil', label: 'Meu Aprendizado', icone: '🎓' }
  ];

  return (
    <header style={{
      backgroundColor: '#FFFFFF',
      borderBottom: '1px solid var(--border-color)',
      boxShadow: 'var(--shadow)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 24px',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        {/* Logotipo / Botão Home */}
        <button 
          onClick={() => setCurrentPage('home')}
          aria-label="Página Inicial Primeiros Passos Tech"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            textAlign: 'left'
          }}
        >
          <img 
            src="/logo.jpg" 
            alt="" 
            style={{ width: '48px', height: '48px', borderRadius: '8px' }} 
            aria-hidden="true" 
          />
          <div>
            <span style={{ 
              fontFamily: 'var(--font-title)', 
              fontSize: '1.4rem', 
              fontWeight: 'bold', 
              color: 'var(--primary)',
              display: 'block',
              lineHeight: 1.1
            }}>
              Primeiros Passos
            </span>
            <span style={{ 
              fontSize: '0.85rem', 
              letterSpacing: '1px', 
              textTransform: 'uppercase', 
              color: 'var(--secondary)',
              fontWeight: 'bold'
            }}>
              Tech
            </span>
          </div>
        </button>

        {/* Menu de Navegação Simplificado */}
        <nav aria-label="Menu Principal">
          <ul style={{
            listStyle: 'none',
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap',
            margin: 0,
            padding: 0
          }}>
            {menuItems.map(item => {
              const isActive = currentPage === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => setCurrentPage(item.id)}
                    aria-current={isActive ? 'page' : undefined}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '12px 18px',
                      fontSize: '1.05rem',
                      fontFamily: 'var(--font-body)',
                      fontWeight: isActive ? 'bold' : 'normal',
                      backgroundColor: isActive ? 'var(--primary)' : 'transparent',
                      color: isActive ? '#FFFFFF' : 'var(--text-color)',
                      border: isActive ? 'none' : '1px solid transparent',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'var(--transition)'
                    }}
                    className="menu-button"
                  >
                    <span role="img" aria-hidden="true">{item.icone}</span>
                    {item.label}
                    {item.id === 'perfil' && progressoPercent > 0 && (
                      <span style={{
                        backgroundColor: isActive ? 'var(--secondary)' : 'var(--primary)',
                        color: isActive ? 'var(--text-color)' : '#FFFFFF',
                        fontSize: '0.8rem',
                        fontWeight: 'bold',
                        padding: '2px 8px',
                        borderRadius: '12px',
                        marginLeft: '4px'
                      }}>
                        {progressoPercent}%
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
