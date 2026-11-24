import React, { useEffect } from 'react';

/**
 * Página Sobre: Dicionário Técnico de Hooks & Rotas
 * Guia didático sintetizando os conceitos abordados na Aula 09
 */
export default function Sobre() {
  useEffect(() => {
    document.title = 'DevPulse Notes - Conceitos & Hooks';
  }, []);

  const modulos = [
    {
      titulo: '1. State & useState',
      descricao: 'Enquanto variáveis comuns são reinicializadas a cada execução do componente sem disparar nova renderização, o Hook useState preserva os valores na memória do React e solicita uma re-renderização da interface sempre que o setter correspondente é invocado.',
      codigo: 'const [contador, setContador] = useState(0);\nsetContador(contador + 1);'
    },
    {
      titulo: '2. Formulários Controlados & preventDefault()',
      descricao: 'Em campos controlados, a propriedade value reflete o estado do componente e o evento onChange atualiza o estado a cada tecla digitada. O método e.preventDefault() é indispensável para evitar o comportamento padrão do navegador de recarregar a página ao enviar o formulário.',
      codigo: '<form onSubmit={(e) => { e.preventDefault(); salvar(); }}>\n  <input value={nome} onChange={(e) => setNome(e.target.value)} />\n</form>'
    },
    {
      titulo: '3. useEffect & Ciclo de Vida',
      descricao: 'Permite sincronizar o componente com sistemas externos (APIs, DOM, timers). O array de dependências define a cadência de disparo: [] executa apenas na montagem; [variavel] executa sempre que o valor mudar; e uma função retornada realiza a limpeza (cleanup) de timers ou listeners.',
      codigo: 'useEffect(() => {\n  document.title = titulo;\n  return () => console.log("Limpando recursos");\n}, [titulo]);'
    },
    {
      titulo: '4. Consumo de APIs (Fetch API & Assincronismo)',
      descricao: 'As chamadas HTTP com fetch() devem ser tratadas de forma assíncrona (async/await ou promises). É essencial validar response.ok para detectar erros 4xx/5xx antes de invocar response.json() e proteger a execução com blocos try/catch.',
      codigo: 'const res = await fetch(url);\nif (!res.ok) throw new Error("Erro HTTP");\nconst dados = await res.json();'
    },
    {
      titulo: '5. React Router (Navegação SPA & useParams)',
      descricao: 'Gerencia a navegação entre views sem descarregar o documento HTML da memória. O componente Link atualiza a URL na barra de endereços, enquanto Routes/Route mapeiam o caminho e o Hook useParams() extrai parâmetros dinâmicos (como /nota/:id).',
      codigo: 'import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";\nconst { id } = useParams();'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full">
          Documentação Teórica • Aula 09
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-2">
          Fundamentação dos Hooks e Roteamento
        </h1>
        <p className="mt-1 text-sm text-slate-300">
          Resumo arquitetural e acadêmico dos recursos essenciais para a construção de SPAs modernas em React.
        </p>
      </section>

      <div className="space-y-4">
        {modulos.map((m) => (
          <article
            key={m.titulo}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg space-y-3"
          >
            <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
              {m.titulo}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {m.descricao}
            </p>
            <div className="bg-slate-950 rounded-xl p-3 border border-slate-800">
              <pre className="text-xs font-mono text-cyan-300 overflow-x-auto whitespace-pre">
                {m.codigo}
              </pre>
            </div>
          </article>
        ))}
      </div>

    </div>
  );
}
