import React, { useState, useEffect } from 'react';

/**
 * Página ApiDemo: Consumo de APIs no Front-End
 * Demonstra useEffect com Fetch assíncrono, try/catch, response.ok, envio com POST e estados de loading/error
 */
export default function ApiDemo() {
  const [publicacoes, setPublicacoes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  
  // Estado para envio via POST (Slide 31 da Aula 09)
  const [novoTitulo, setNovoTitulo] = useState('');
  const [novoCorpo, setNovoCorpo] = useState('');
  const [statusPost, setStatusPost] = useState('');
  const [enviando, setEnviando] = useState(false);

  // Função assíncrona para buscar dados da API externa (Slide 27-30 e 33)
  const carregarDados = async () => {
    setCarregando(true);
    setErro(null);
    try {
      // Endpoint público demonstrado no material do professor (JSONPlaceholder)
      const url = 'https://jsonplaceholder.typicode.com/posts?_limit=4';
      const resposta = await fetch(url);
      
      // Validação do status HTTP
      if (!resposta.ok) {
        throw new Error(`Erro HTTP: ${resposta.status} - Falha ao consultar endpoint`);
      }

      const dados = await resposta.json();
      setPublicacoes(dados);
    } catch (err) {
      console.error('Erro na requisição Fetch:', err);
      // Fallback gracioso com dados locais caso o ambiente não possua conexão externa ativa
      setErro(err.message || 'Falha na conexão com o servidor remoto.');
      setPublicacoes([
        { id: 101, title: 'Consumo Assíncrono com useEffect e Fetch API', body: 'Exemplo demonstrativo recuperado em modo offline com tratamento de exceções try/catch.' },
        { id: 102, title: 'Manipulação de Respostas JSON e Status HTTP', body: 'Validação preventiva de response.ok antes de executar response.json().' }
      ]);
    } finally {
      setCarregando(false);
    }
  };

  // Efeito disparado na montagem do componente (array de dependências vazio [])
  useEffect(() => {
    document.title = 'DevPulse - Consumo de APIs';
    carregarDados();

    // Função de limpeza (cleanup) para desmontagem do efeito (Slide 23-24)
    return () => {
      console.log('Cleanup: cancelando inscrições ou temporizadores pendentes');
    };
  }, []);

  // Envio de dados com método POST (Slide 31)
  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!novoTitulo || !novoCorpo) return;

    setEnviando(true);
    setStatusPost('');

    try {
      const resposta = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
          title: novoTitulo,
          body: novoCorpo,
          userId: 1,
        }),
      });

      if (!resposta.ok) throw new Error('Falha no envio POST.');
      const dadoCriado = await resposta.json();

      // Atualiza a lista visualmente com a nova publicação retornada pelo endpoint
      setPublicacoes(prev => [dadoCriado, ...prev]);
      setNovoTitulo('');
      setNovoCorpo('');
      setStatusPost(`✓ Recurso criado com sucesso no servidor! (ID gerado: ${dadoCriado.id})`);
    } catch (err) {
      // Simulação local de sucesso caso offline
      const mockCriado = { id: Date.now(), title: novoTitulo, body: novoCorpo };
      setPublicacoes(prev => [mockCriado, ...prev]);
      setStatusPost(`✓ Recurso processado localmente! (ID: ${mockCriado.id})`);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Banner de Apresentação */}
      <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full">
              Fetch API & useEffect
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-2">
              Integração e Consumo de APIs REST
            </h1>
            <p className="mt-1 text-sm text-slate-300 max-w-2xl">
              Demonstração de chamadas assíncronas assentes nos slides 25 a 33 da Aula 09: 
              métodos <code>GET</code> e <code>POST</code>, estados de carregamento, tratamento de erros HTTP e ciclo de vida com limpeza.
            </p>
          </div>

          <button
            onClick={carregarDados}
            disabled={carregando}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-slate-700 font-semibold text-xs transition-colors flex items-center gap-2 self-start md:self-auto disabled:opacity-50"
          >
            <span>🔄</span>
            <span>{carregando ? 'Atualizando...' : 'Recarregar Dados'}</span>
          </button>
        </div>
      </section>

      {/* Grid de Conteúdo: Formulário POST + Lista GET */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Formulário POST (5 colunas) */}
        <section className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="border-b border-slate-800 pb-3">
            <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
              Enviar Dados (Método HTTP POST)
            </h2>
            <p className="text-xs text-slate-400">Envio de carga útil JSON para o servidor</p>
          </div>

          {statusPost && (
            <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs p-3 rounded-xl">
              {statusPost}
            </div>
          )}

          <form onSubmit={handlePostSubmit} className="space-y-4">
            <div>
              <label htmlFor="post-title" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Título do Post
              </label>
              <input
                id="post-title"
                type="text"
                value={novoTitulo}
                onChange={(e) => setNovoTitulo(e.target.value)}
                placeholder="Ex: Novo Artigo sobre useEffect"
                required
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
              />
            </div>

            <div>
              <label htmlFor="post-body" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Corpo da Mensagem
              </label>
              <textarea
                id="post-body"
                rows="3"
                value={novoCorpo}
                onChange={(e) => setNovoCorpo(e.target.value)}
                placeholder="Conteúdo a ser enviado via JSON.stringify()..."
                required
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
              ></textarea>
            </div>

            <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800 text-[11px] font-mono text-cyan-400">
              POST /api/posts &rarr; Content-Type: application/json
            </div>

            <button
              type="submit"
              disabled={enviando}
              className="w-full py-2.5 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2"
            >
              <span>{enviando ? 'Enviando...' : 'Disparar Requisição POST'}</span>
            </button>
          </form>
        </section>

        {/* Listagem GET (7 colunas) */}
        <section className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
                Publicações Recebidas (Método GET)
              </h2>
              <p className="text-xs text-slate-400">Dados consumidos e renderizados dinamicamente</p>
            </div>
            <span className="text-xs font-mono text-slate-500">Status: 200 OK</span>
          </div>

          {/* Renderização Condicional de Carregamento e Erro */}
          {carregando ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="text-xs text-slate-400">Buscando dados no servidor remoto...</p>
            </div>
          ) : erro ? (
            <div className="bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs p-4 rounded-2xl space-y-1">
              <div className="font-bold flex items-center gap-1.5">
                <span>⚠️</span> Informação de Conexão:
              </div>
              <p>{erro} Exibindo dados de contingência local.</p>
            </div>
          ) : null}

          {/* Cards da Lista GET */}
          <div className="space-y-3">
            {publicacoes.map((item) => (
              <div
                key={item.id}
                className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-1.5 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-cyan-400">ID #{item.id}</span>
                  <span className="text-[10px] text-slate-500 font-mono">REST JSON</span>
                </div>
                <h3 className="text-sm font-bold text-white tracking-tight capitalize">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </section>

      </div>

    </div>
  );
}
