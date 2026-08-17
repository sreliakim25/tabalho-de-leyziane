import React, { useState, useEffect } from 'react';
import { mockData } from './mockData';

// Importando Componentes Globais
import AccessibilityBar from './components/AccessibilityBar';
import Header from './components/Header';
import Footer from './components/Footer';
import ModalConquista from './components/ModalConquista';

// Importando Páginas
import Home from './pages/Home';
import Cursos from './pages/Cursos';
import AulaDetail from './pages/AulaDetail';
import Glossario from './pages/Glossario';
import Ajuda from './pages/Ajuda';
import Seguranca from './pages/Seguranca';
import MeuAprendizado from './pages/MeuAprendizado';

/**
 * COMPONENTE PRINCIPAL: App
 * 
 * Este é o ponto de entrada da aplicação React.
 * Ele gerencia o estado global (navegação, preferências de acessibilidade,
 * progresso de aulas concluídas e conquistas desbloqueadas).
 * 
 * Comentários didáticos foram inseridos para facilitar a leitura dos alunos.
 */
function App() {
  // --- ESTADOS DE NAVEGAÇÃO ---
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCursoId, setSelectedCursoId] = useState(null);
  const [activeAulaId, setActiveAulaId] = useState(null);

  // --- ESTADOS DE ACESSIBILIDADE ---
  const [fontSize, setFontSize] = useState(() => {
    const salvo = localStorage.getItem('passostech_fontsize');
    return salvo ? parseInt(salvo, 10) : 100; // Padrão 100%
  });
  
  const [altoContraste, setAltoContraste] = useState(() => {
    const salvo = localStorage.getItem('passostech_contraste');
    return salvo === 'true'; // Padrão falso (desativado)
  });

  // --- ESTADOS DE PROGRESSO E GAMIFICAÇÃO ---
  const [progresso, setProgresso] = useState(() => {
    const salvo = localStorage.getItem('passostech_progresso');
    return salvo ? JSON.parse(salvo) : [];
  });

  const [conquistas, setConquistas] = useState(() => {
    const salvo = localStorage.getItem('passostech_conquistas');
    return salvo ? JSON.parse(salvo) : [];
  });

  // Estado para armazenar a conquista que acabou de ser desbloqueada (exibe o modal festivo)
  const [conquistaDesbloqueadaRecente, setConquistaDesbloqueadaRecente] = useState(null);

  // --- EFEITOS (EFEITOS COLATERAIS DE ACESSIBILIDADE) ---
  
  // Efeito para persistir e aplicar a escala de fonte global no elemento HTML
  useEffect(() => {
    localStorage.setItem('passostech_fontsize', fontSize);
    // Alterando o tamanho da fonte do elemento html principal escala todas as unidades rem do site
    document.documentElement.style.fontSize = `${fontSize}%`;
  }, [fontSize]);

  // Efeito para persistir e aplicar o tema de alto contraste
  useEffect(() => {
    localStorage.setItem('passostech_contraste', altoContraste);
    // Adiciona ou remove a classe .high-contrast do HTML
    if (altoContraste) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  }, [altoContraste]);

  // --- FUNÇÕES E ACÕES ---

  // Função para marcar uma aula como concluída no banco de dados local (localStorage)
  const concluirAula = (aulaId) => {
    if (!progresso.includes(aulaId)) {
      const novoProgresso = [...progresso, aulaId];
      setProgresso(novoProgresso);
      localStorage.setItem('passostech_progresso', JSON.stringify(novoProgresso));
    }
  };

  // Função para desbloquear uma conquista gamificada
  const desbloquearConquista = (conquistaId) => {
    if (!conquistas.includes(conquistaId)) {
      const novasConquistas = [...conquistas, conquistaId];
      setConquistas(novasConquistas);
      localStorage.setItem('passostech_conquistas', JSON.stringify(novasConquistas));
      
      // Encontra os detalhes da conquista para mostrar o Modal popup
      const detalhesConquista = mockData.conquistas.find(c => c.id === conquistaId);
      if (detalhesConquista) {
        setConquistaDesbloqueadaRecente(detalhesConquista);
      }
    }
  };

  // Função para reiniciar todo o progresso (Reset)
  const resetarProgresso = () => {
    const confirmar = window.confirm(
      "Você tem certeza que deseja apagar todas as aulas concluídas e conquistas? Isso fará você começar do zero."
    );
    if (confirmar) {
      setProgresso([]);
      setConquistas([]);
      localStorage.removeItem('passostech_progresso');
      localStorage.removeItem('passostech_conquistas');
      setCurrentPage('home');
      setSelectedCursoId(null);
      setActiveAulaId(null);
      alert("Seu progresso foi zerado! Bons estudos!");
    }
  };

  // Callback de seleção de aula específica
  const handleSelectAula = (aulaId) => {
    setActiveAulaId(aulaId);
    setCurrentPage('aula');
  };

  // Lógica para renderizar a página correspondente ao estado currentPage
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <Home 
            setCurrentPage={setCurrentPage} 
            setSelectedCursoId={setSelectedCursoId} 
          />
        );
      case 'cursos':
        return (
          <Cursos 
            setCurrentPage={setCurrentPage}
            selectedCursoId={selectedCursoId}
            setSelectedCursoId={setSelectedCursoId}
            progresso={progresso}
            onSelectAula={handleSelectAula}
          />
        );
      case 'aula':
        return (
          <AulaDetail 
            aulaId={activeAulaId}
            onBack={() => {
              setCurrentPage('cursos');
              // Mantém o curso selecionado para que o usuário veja a lista de aulas
            }}
            onConcluirAula={concluirAula}
            progresso={progresso}
            desbloquearConquista={desbloquearConquista}
            onSelectAula={handleSelectAula}
          />
        );
      case 'glossario':
        return <Glossario />;
      case 'ajuda':
        return (
          <Ajuda 
            setCurrentPage={setCurrentPage}
            setSelectedCursoId={setSelectedCursoId}
            onSelectAula={handleSelectAula}
          />
        );
      case 'seguranca':
        return (
          <Seguranca 
            desbloquearConquista={desbloquearConquista} 
          />
        );
      case 'perfil':
        return (
          <MeuAprendizado 
            progresso={progresso}
            conquistas={conquistas}
            onResetProgresso={resetarProgresso}
            onSelectAula={handleSelectAula}
          />
        );
      default:
        return <Home setCurrentPage={setCurrentPage} setSelectedCursoId={setSelectedCursoId} />;
    }
  };

  // Calcula o percentual de progresso para exibir no Header
  const totalAulasCount = mockData.aulas.length;
  const progressoPercent = totalAulasCount > 0 
    ? Math.round((progresso.length / totalAulasCount) * 100) 
    : 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      
      {/* 1. Barra de Acessibilidade no topo */}
      <AccessibilityBar 
        fontSize={fontSize} 
        setFontSize={setFontSize} 
        altoContraste={altoContraste} 
        setAltoContraste={setAltoContraste} 
      />

      {/* 2. Cabeçalho de Navegação Principal */}
      <Header 
        currentPage={currentPage === 'aula' ? 'cursos' : currentPage} 
        setCurrentPage={(page) => {
          setCurrentPage(page);
          if (page !== 'cursos') {
            setSelectedCursoId(null);
          }
          setActiveAulaId(null);
        }} 
        progressoPercent={progressoPercent}
      />

      {/* 3. Área de Conteúdo da Página Ativa */}
      <main style={{ flex: 1, backgroundColor: 'var(--bg-color)', transition: 'background-color 0.3s ease' }}>
        {renderPage()}
      </main>

      {/* 4. Rodapé da Página */}
      <Footer 
        setCurrentPage={(page) => {
          setCurrentPage(page);
          setSelectedCursoId(null);
          setActiveAulaId(null);
        }} 
      />

      {/* 5. Modal Popup de Ganho de Conquistas (Feedback Gamificado) */}
      <ModalConquista 
        conquista={conquistaDesbloqueadaRecente} 
        onClose={() => setConquistaDesbloqueadaRecente(null)} 
      />
    </div>
  );
}

export default App;

