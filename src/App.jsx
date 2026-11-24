import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Rodape from './components/Rodape';
import Home from './pages/Home';
import NovaNota from './pages/NovaNota';
import DetalheNota from './pages/DetalheNota';
import ApiDemo from './pages/ApiDemo';
import Sobre from './pages/Sobre';

const STORAGE_KEY = 'devpulse_react_advanced_notes_v1';

// Dados iniciais baseados nos tópicos do curso
const NOTAS_INICIAIS = [
  {
    id: '1',
    titulo: 'Configuração de Middlewares no Express',
    texto: 'Para permitir requisições cross-origin no frontend React, é necessário instalar e configurar o middleware cors (app.use(cors())) e body-parser para parsing de JSON.',
    categoria: 'Back-End',
    prioridade: 'Alta',
    criadoEm: '2026-04-28T10:00:00Z'
  },
  {
    id: '2',
    titulo: 'Ciclo de Vida do useEffect e Dependências',
    texto: 'Quando passamos um array vazio [] como segundo argumento do useEffect, a função de callback executa apenas uma única vez na montagem inicial do componente no DOM.',
    categoria: 'Front-End',
    prioridade: 'Média',
    criadoEm: '2026-04-28T11:30:00Z'
  },
  {
    id: '3',
    titulo: 'Deploy Contínuo no Render e Vercel',
    texto: 'Configurar variáveis de ambiente (PORT=3000) e apontar a URL de produção gerada no Render (https://sua-api.onrender.com) diretamente no fetch do cliente React hospedado na Vercel.',
    categoria: 'DevOps',
    prioridade: 'Alta',
    criadoEm: '2026-04-29T14:15:00Z'
  }
];

export default function App() {
  // Estado das Notas persistido no LocalStorage
  const [notas, setNotas] = useState(() => {
    const salvo = localStorage.getItem(STORAGE_KEY);
    if (salvo) {
      try {
        return JSON.parse(salvo);
      } catch {
        return NOTAS_INICIAIS;
      }
    }
    return NOTAS_INICIAIS;
  });

  // Salvar no LocalStorage sempre que o estado mudar
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notas));
  }, [notas]);

  // Função para adicionar nova nota
  const adicionarNota = (novaNota) => {
    setNotas(prev => [novaNota, ...prev]);
  };

  // Função para excluir nota
  const excluirNota = (id) => {
    setNotas(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col antialiased selection:bg-cyan-500 selection:text-white">
      
      {/* Barra de Navegação SPA */}
      <Navbar />

      {/* Conteúdo Principal com Rotas Dinâmicas */}
      <main className="max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 flex-1">
        <Routes>
          <Route path="/" element={<Home notas={notas} aoExcluirNota={excluirNota} />} />
          <Route path="/nova-nota" element={<NovaNota aoSalvarNota={adicionarNota} />} />
          <Route path="/nota/:id" element={<DetalheNota notas={notas} aoExcluirNota={excluirNota} />} />
          <Route path="/api-demo" element={<ApiDemo />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="*" element={<Home notas={notas} aoExcluirNota={excluirNota} />} />
        </Routes>
      </main>

      {/* Rodapé Acadêmico */}
      <Rodape />

    </div>
  );
}
