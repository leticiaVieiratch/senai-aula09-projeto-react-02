import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

/**
 * Página Home: Listagem de Notas & Tarefas
 * Demonstra useState, useEffect para sincronização de título e React Router Link
 */
export default function Home({ notas, aoExcluirNota }) {
  const [busca, setBusca] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState('ALL');

  // Sincronização de efeito com document.title na montagem
  useEffect(() => {
    document.title = 'DevPulse Notes - Painel de Notas';
  }, []);

  // Filtragem
  const notasFiltradas = notas.filter(n => {
    const matchBusca = !busca || 
      n.titulo.toLowerCase().includes(busca.toLowerCase()) ||
      n.texto.toLowerCase().includes(busca.toLowerCase());
    const matchCat = filtroCategoria === 'ALL' || n.categoria === filtroCategoria;
    return matchBusca && matchCat;
  });

  return (
    <div className="space-y-6">
      
      {/* Banner Superior com Ação Rápida */}
      <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full">
            Aula 09 • React Avançado
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-2">
            Gestão de Notas com State & Rotas Dinâmicas
          </h1>
          <p className="mt-1 text-sm text-slate-300 max-w-xl">
            Aplicação integrando <code>useState</code> para estado local, formulários controlados, 
            efeitos com <code>useEffect</code> e navegação por URLs com <strong>React Router</strong>.
          </p>
        </div>

        <Link
          to="/nova-nota"
          className="px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/25 transition-all flex items-center gap-2 self-start md:self-auto"
        >
          <span>＋</span>
          <span>Criar Nova Nota</span>
        </Link>
      </section>

      {/* Controles de Busca e Filtro */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <input
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Pesquisar notas por título ou conteúdo..."
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
          />
        </div>
        <div className="sm:w-48">
          <select
            value={filtroCategoria}
            onChange={(e) => setFiltroCategoria(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
          >
            <option value="ALL">Todas Categorias</option>
            <option value="Front-End">Front-End</option>
            <option value="Back-End">Back-End</option>
            <option value="DevOps">DevOps</option>
            <option value="Design">Design</option>
          </select>
        </div>
      </section>

      {/* Listagem de Notas */}
      {notasFiltradas.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center shadow-xl space-y-4">
          <div className="w-16 h-16 rounded-full bg-slate-800 text-slate-500 mx-auto flex items-center justify-center text-2xl font-bold">
            📝
          </div>
          <h3 className="text-lg font-bold text-white">Nenhuma nota encontrada</h3>
          <p className="text-sm text-slate-400 max-w-md mx-auto">
            {busca || filtroCategoria !== 'ALL' 
              ? 'Nenhuma nota corresponde aos filtros de busca aplicados.' 
              : 'Você ainda não possui notas cadastradas. Clique no botão abaixo para adicionar a primeira.'}
          </p>
          <Link
            to="/nova-nota"
            className="inline-block mt-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 font-semibold text-xs border border-slate-700 transition-colors"
          >
            + Adicionar Nota Agora
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {notasFiltradas.map((nota) => (
            <article
              key={nota.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col justify-between hover:border-slate-700 transition-all"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                    {nota.categoria}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    nota.prioridade === 'Alta' 
                      ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' 
                      : nota.prioridade === 'Média'
                      ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  }`}>
                    {nota.prioridade}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white tracking-tight line-clamp-1">
                  {nota.titulo}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                  {nota.texto}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-500">
                  {new Date(nota.criadoEm).toLocaleDateString('pt-BR')}
                </span>

                <div className="flex items-center gap-2">
                  <Link
                    to={`/nota/${nota.id}`}
                    className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700"
                  >
                    Detalhes &rarr;
                  </Link>
                  <button
                    onClick={() => aoExcluirNota(nota.id)}
                    className="text-slate-500 hover:text-rose-400 transition-colors p-1"
                    title="Excluir nota"
                  >
                    🗑
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

    </div>
  );
}
