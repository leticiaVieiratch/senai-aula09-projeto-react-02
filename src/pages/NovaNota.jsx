import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

/**
 * Página NovaNota: Formulário Controlado
 * Demonstra useState para campos controlados, onSubmit, preventDefault e useNavigate
 */
export default function NovaNota({ aoSalvarNota }) {
  const navigate = useNavigate();

  // Estados dos Campos Controlados (Slide 13-15 da Aula 09)
  const [titulo, setTitulo] = useState('');
  const [texto, setTexto] = useState('');
  const [categoria, setCategoria] = useState('Front-End');
  const [prioridade, setPrioridade] = useState('Média');
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState(false);

  // Sincronização do título da página com useEffect
  useEffect(() => {
    document.title = 'DevPulse Notes - Nova Nota';
  }, []);

  // Manipulador de Envio do Formulário (Slide 16-18)
  const handleSubmit = (e) => {
    // Evita o recarregamento padrão da página pelo navegador
    e.preventDefault();

    // Validações
    if (titulo.trim().length < 3) {
      setErro('O título da nota deve conter pelo menos 3 caracteres.');
      return;
    }
    if (texto.trim().length < 5) {
      setErro('O conteúdo da nota deve conter pelo menos 5 caracteres.');
      return;
    }

    setErro('');
    const novaNota = {
      id: Date.now().toString(),
      titulo: titulo.trim(),
      texto: texto.trim(),
      categoria,
      prioridade,
      criadoEm: new Date().toISOString()
    };

    aoSalvarNota(novaNota);
    setSucesso(true);

    // Redireciona de volta para a Home após 1 segundo
    setTimeout(() => {
      navigate('/');
    }, 900);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      
      {/* Topo / Breadcrumb */}
      <div className="flex items-center justify-between">
        <Link to="/" className="text-xs font-semibold text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-1.5">
          <span>&larr;</span> Voltar para o Painel de Notas
        </Link>
        <span className="text-xs text-slate-500 font-mono">Formulário Controlado</span>
      </div>

      {/* Caixa do Formulário */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Criar Nova Nota Técnica</h2>
          <p className="text-xs text-slate-400 mt-1">
            Preencha os campos abaixo. Cada entrada é controlada em tempo real pelo estado do React via <code>value</code> e <code>onChange</code>.
          </p>
        </div>

        {/* Mensagens de Alerta (Renderização Condicional) */}
        {erro && (
          <div className="bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs px-4 py-3 rounded-xl flex items-center gap-2">
            <span>⚠️</span>
            <span>{erro}</span>
          </div>
        )}

        {sucesso && (
          <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs px-4 py-3 rounded-xl flex items-center gap-2">
            <span>✓</span>
            <span>Nota criada com sucesso! Redirecionando...</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Campo Título */}
          <div>
            <label htmlFor="titulo" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Título da Nota *
            </label>
            <input
              id="titulo"
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Ex: Configuração de CORS no Express"
              required
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
            />
          </div>

          {/* Categoria e Prioridade */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="categoria" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Categoria
              </label>
              <select
                id="categoria"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
              >
                <option value="Front-End">Front-End</option>
                <option value="Back-End">Back-End</option>
                <option value="DevOps">DevOps</option>
                <option value="Design">Design</option>
              </select>
            </div>

            <div>
              <label htmlFor="prioridade" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Prioridade
              </label>
              <select
                id="prioridade"
                value={prioridade}
                onChange={(e) => setPrioridade(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
              >
                <option value="Baixa">Baixa</option>
                <option value="Média">Média</option>
                <option value="Alta">Alta</option>
              </select>
            </div>
          </div>

          {/* Campo Conteúdo */}
          <div>
            <label htmlFor="texto" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Conteúdo / Detalhes da Nota *
            </label>
            <textarea
              id="texto"
              rows="4"
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              placeholder="Descreva o procedimento técnico, comando ou anotação..."
              required
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
            ></textarea>
          </div>

          {/* Painel Explicativo sobre preventDefault() */}
          <div className="bg-slate-950/60 rounded-xl p-3.5 border border-slate-800 text-[11px] text-slate-400 space-y-1">
            <span className="font-bold text-cyan-400 uppercase tracking-wide block">Conceito-Chave: e.preventDefault()</span>
            <p>
              Em aplicações SPA (Single Page Application), o método <code>e.preventDefault()</code> impede que o formulário recarregue o documento no navegador, permitindo que o React valide os dados e atualize o estado local em memória instantaneamente.
            </p>
          </div>

          {/* Botões de Ação */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <Link
              to="/"
              className="px-4 py-2.5 rounded-xl border border-slate-700 text-slate-300 text-xs font-semibold hover:bg-slate-800 transition-colors"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold shadow-lg shadow-cyan-500/20 transition-all"
            >
              Salvar Nota
            </button>
          </div>
        </form>
      </div>

    </div>
  );
}
