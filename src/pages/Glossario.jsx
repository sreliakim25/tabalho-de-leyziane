import React, { useState } from 'react';
import { mockData } from '../mockData';

/**
 * PÁGINA: Glossário ("Tecnologia sem Complicação")
 * 
 * Permite que o usuário pesquise e compreenda termos técnicos em uma linguagem
 * extremamente simples, com exemplos do dia a dia e elementos visuais (emojis).
 */
export default function Glossario() {
  const [busca, setBusca] = useState('');

  // Filtra os termos com base no que o usuário digitou (busca insensível a maiúsculas/minúsculas)
  const termosFiltrados = mockData.glossario.filter(item => 
    item.termo.toLowerCase().includes(busca.toLowerCase()) ||
    item.definicao.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="container" style={{ maxWidth: '900px', animation: 'fadeIn 0.4s ease' }}>
      
      {/* Cabeçalho */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '2.4rem', marginBottom: '12px' }}>
          Dicionário: Tecnologia sem Complicação 📖
        </h2>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>
          Entenda os termos mais comuns da internet e dos computadores explicados de forma simples e direta.
        </p>
      </div>

      {/* Barra de Pesquisa Grande */}
      <div className="card" style={{ padding: '24px', marginBottom: '32px', backgroundColor: '#FFFFFF' }}>
        <label 
          htmlFor="busca-glossario" 
          style={{ 
            display: 'block', 
            fontSize: '1.25rem', 
            fontWeight: 'bold', 
            marginBottom: '10px',
            color: 'var(--primary)' 
          }}
        >
          🔍 O que você quer entender? Digite o termo abaixo:
        </label>
        
        <input
          id="busca-glossario"
          type="text"
          placeholder="Ex: Wi-Fi, PDF, Nuvem, Login..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          style={{
            width: '100%',
            padding: '18px 24px',
            fontSize: '1.2rem',
            border: '2px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            fontFamily: 'var(--font-body)',
            outline: 'none',
            transition: 'var(--transition)'
          }}
          className="search-input"
        />
        {busca && (
          <button
            onClick={() => setBusca('')}
            style={{
              marginTop: '12px',
              background: 'none',
              border: 'none',
              color: 'var(--primary)',
              textDecoration: 'underline',
              cursor: 'pointer',
              fontSize: '1.05rem',
              fontWeight: 'bold'
            }}
          >
            Limpar Pesquisa
          </button>
        )}
      </div>

      {/* Lista de Termos */}
      {termosFiltrados.length > 0 ? (
        <div className="grid grid-2" style={{ marginBottom: '60px' }}>
          {termosFiltrados.map((item, idx) => (
            <article 
              key={idx} 
              className="card" 
              style={{
                backgroundColor: '#FFFFFF',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                borderLeft: '5px solid var(--secondary)',
                animation: 'slideUp 0.3s ease'
              }}
            >
              {/* Termo e Ícone */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span style={{ fontSize: '2.5rem', lineHeight: 1 }} role="img" aria-hidden="true">
                  {item.icone}
                </span>
                <h3 style={{ fontSize: '1.5rem', margin: 0 }}>
                  {item.termo}
                </h3>
              </div>

              {/* Definição Simples */}
              <div>
                <strong style={{ display: 'block', fontSize: '1.1rem', color: 'var(--primary)', marginBottom: '4px' }}>
                  O que significa:
                </strong>
                <p style={{ fontSize: '1.15rem', color: 'var(--text-color)', margin: 0, lineHeight: 1.5 }}>
                  {item.definicao}
                </p>
              </div>

              {/* Exemplo do Cotidiano */}
              <div style={{
                backgroundColor: 'var(--bg-color)',
                padding: '16px',
                borderRadius: '8px',
                border: '1px dashed var(--border-color)',
                marginTop: 'auto'
              }}>
                <strong style={{ display: 'block', fontSize: '1rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                  💡 Exemplo do dia a dia:
                </strong>
                <span style={{ fontSize: '1.05rem', color: 'var(--text-color)', fontStyle: 'italic', lineHeight: 1.4 }}>
                  {item.exemplo}
                </span>
              </div>
            </article>
          ))}
        </div>
      ) : (
        /* Caso nenhum termo seja encontrado */
        <div style={{
          textAlign: 'center',
          padding: '40px',
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-color)',
          marginBottom: '60px'
        }}>
          <span style={{ fontSize: '3rem' }} role="img" aria-hidden="true">❓</span>
          <h3 style={{ fontSize: '1.4rem', color: 'var(--primary)', marginTop: '16px' }}>
            Não encontramos nenhum termo correspondente a "{busca}"
          </h3>
          <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', marginTop: '8px' }}>
            Tente digitar termos menores ou confira a ortografia do que escreveu.
          </p>
        </div>
      )}
    </div>
  );
}
