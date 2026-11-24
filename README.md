# Aula 09: Projeto React 02 — State (`useState`), Formulários Controlados, `useEffect`, Consumo de APIs e React Router

> **Disciplina:** Frameworks Front-End  
> **Professor:** Me. Deivison S. Takatu  
> **Instituição:** SENAI  
> **Atividade:** Atividade Prática - Projeto React 02 (Aula 09 - Slide 41)  
> **Aplicação Desenvolvida:** DevPulse Notes & API Hub (SPA)

---

## 1. Visão Geral da Aplicação

A pasta `05-React-Avancado-Hooks-e-Rotas` contém uma aplicação de ponta a ponta construída em **React 18** focada na implementação prática de **conceitos fundamentais e avançados de desenvolvimento front-end com bibliotecas de componentes**. O sistema implementa uma plataforma completa de gerenciamento de anotações técnicas e testes de integração com APIs REST externas, cobrindo com rigor didático todos os tópicos estipulados nos slides da **Aula 09**.

### Principais Módulos da Aplicação:
1. **Painel de Anotações (`/`):** Listagem dinâmica com busca em tempo real, filtragem por categorias (`Conceito`, `Prática`, `Dúvida`, `Importante`), contadores de métricas e persistência no `localStorage`.
2. **Nova Anotação (`/nova`):** Formulário 100% controlado com validações síncronas de campos obrigatórios e contagem mínima de caracteres, demonstrando o uso de `event.preventDefault()`, gerenciamento de múltiplos estados e navegação programática com `useNavigate()`.
3. **Detalhes da Anotação (`/nota/:id`):** Rota dinâmica que consome parâmetros de URL via `useParams()`, sincronizando o título da aba (`document.title`) através de `useEffect()` com array de dependências monitorando o identificador `id`.
4. **Laboratório de APIs (`/api-demo`):** Interface para consumo de web APIs assíncronas via `fetch()` (JSONPlaceholder API), demonstrando requisições `GET` e `POST`, verificação rigorosa de `response.ok`, blocos `try...catch...finally`, estados visuais de carregamento (*loading spinners*), tratamento amigável de falhas (*error state*) e função de limpeza (*cleanup function*) com `AbortController`.
5. **Guia Didático de Hooks (`/sobre`):** Documentação interativa embutida explicando o ciclo de renderização, regras dos Hooks e boas práticas de arquitetura front-end.

---

## 2. Arquitetura e Estrutura de Arquivos

O projeto foi estruturado seguindo os mais altos padrões da comunidade React moderna, disponibilizando **dois modos completos de execução**: execução direta no navegador (*zero-setup* via CDN e Babel) e execução modular com bundler (*Vite*).

```
09-Projeto-React-02/
├── index.html                  # Executável Standalone Zero-Setup (duplo clique no navegador)
├── package.json                # Configurações de dependências (React 18, React Router DOM 6)
├── vite.config.js              # Configuração do Vite com plugin @vitejs/plugin-react
├── vercel.json                 # Configuração de rewrites para SPA no deploy
├── README.md                   # Documentação técnica e guia didático completo
└── src/                        # Código-fonte modular Vite
    ├── main.jsx                # Ponto de entrada, ReactDOM.createRoot e BrowserRouter
    ├── App.jsx                 # Configuração de rotas (<Routes>, <Route>) e estado global
    ├── styles.css              # Estilos utilitários e variáveis CSS customizadas
    ├── components/
    │   ├── Navbar.jsx          # Barra de navegação com indicador ativo (<Link>)
    │   └── Rodape.jsx          # Rodapé institucional do SENAI
    └── pages/
        ├── Home.jsx            # Listagem, busca, filtro e deleção de notas
        ├── NovaNota.jsx        # Formulário controlado, validação e useNavigate()
        ├── DetalheNota.jsx     # Rota dinâmica (/nota/:id), useParams() e useEffect()
        ├── ApiDemo.jsx         # Consumo assíncrono com fetch (GET/POST) e AbortController
        └── Sobre.jsx           # Glossário teórico dos React Hooks
```

---

## 3. Fundamentação Teórica e Implementação Prática

### 3.1. Estado e Imutabilidade com `useState`
O Hook `useState` permite associar variáveis de estado a componentes funcionais, provocando uma nova renderização (*re-render*) quando seu valor é alterado. No React, o estado deve sempre ser tratado como **imutável**: nunca alteramos o valor de uma variável de estado diretamente, mas sim geramos uma nova referência através da função modificadora correspondente.

```jsx
// Exemplo no App.jsx: Adicionando uma nova anotação mantendo a imutabilidade
const adicionarNota = (novaNota) => {
  const notaComId = {
    ...novaNota,
    id: Date.now().toString(),
    dataCriacao: new Date().toLocaleDateString('pt-BR')
  };
  // Cria um novo array concatenando o item anterior sem modificar o original
  setNotas(notasAnteriores => [notaComId, ...notasAnteriores]);
};
```

---

### 3.2. Formulários Controlados e `event.preventDefault()`
Em componentes normais do HTML (`<input>`, `<textarea>`), o próprio elemento DOM armazena seu estado interno. Em React, aplicamos o padrão de **Formulários Controlados** (*Controlled Components*), onde o valor do input é espelhado no estado do React (`value={titulo}`) e atualizado a cada tecla digitada via evento `onChange`:

```jsx
// Exemplo em NovaNota.jsx:
const [titulo, setTitulo] = useState('');
const [conteudo, setConteudo] = useState('');
const [categoria, setCategoria] = useState('Geral');

const handleSubmit = (e) => {
  // Impede o recarregamento padrão da página do navegador (POST nativo)
  e.preventDefault();

  if (titulo.trim().length < 3) {
    setErro('O título precisa ter pelo menos 3 caracteres.');
    return;
  }

  // Persiste a nova nota e navega programaticamente
  onSalvar({ titulo, conteudo, categoria });
  navigate('/');
};

return (
  <form onSubmit={handleSubmit}>
    <input 
      type="text" 
      value={titulo} 
      onChange={(e) => setTitulo(e.target.value)} 
      placeholder="Título da anotação..."
    />
    <button type="submit">Salvar Anotação</button>
  </form>
);
```

---

### 3.3. Efeitos Colaterais com `useEffect` e Funções de Limpeza (*Cleanup*)
O Hook `useEffect` gerencia operações de efeito colateral (*side effects*), tais como requisições de rede, manipulação direta de propriedades do documento (`document.title`), timers (`setTimeout`, `setInterval`) e inscrições em eventos (*event listeners*).

O comportamento do `useEffect` varia criticamente de acordo com o **Array de Dependências**:
1. **Sem array de dependências (`useEffect(fn)`):** Executa após **toda** renderização.
2. **Array de dependências vazio (`useEffect(fn, [])`):** Executa apenas **uma vez**, quando o componente é montado no DOM (análogo ao `componentDidMount`).
3. **Array com variáveis (`useEffect(fn, [id, status])`):** Executa na montagem e sempre que algum dos valores listados no array for alterado.
4. **Função de Limpeza (*Cleanup*):** A função retornada pelo `useEffect` é executada antes da desmontagem do componente ou antes de reexecutar o efeito para evitar vazamentos de memória (*memory leaks*):

```jsx
// Exemplo de Cleanup em ApiDemo.jsx usando AbortController:
useEffect(() => {
  const abortController = new AbortController();

  async function carregarPosts() {
    setCarregando(true);
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5', {
        signal: abortController.signal
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const dados = await response.json();
      setPosts(dados);
    } catch (err) {
      if (err.name !== 'AbortError') {
        setErro(err.message);
      }
    } finally {
      setCarregando(false);
    }
  }

  carregarPosts();

  // Função de limpeza: cancela a requisição caso o usuário saia da página antes do término
  return () => {
    abortController.abort();
  };
}, []);
```

---

### 3.4. Consumo de APIs com `fetch` (GET e POST)
A aplicação demonstra o padrão profissional de comunicação HTTP:
- **Requisição GET:** Recuperação assíncrona de recursos com tratamento de status HTTP (`response.ok`).
- **Requisição POST:** Envio de dados estruturados em JSON com cabeçalhos apropriados (`Content-Type: application/json`).
- **Tratamento de Exceções com `try/catch/finally`:** Assegura que o estado de carregamento (*loading*) seja finalizado mesmo em cenários de falha.

```jsx
// Exemplo de POST no ApiDemo.jsx:
const criarPostExemplo = async (novoPost) => {
  setSalvando(true);
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; credentials: false'
      },
      body: JSON.stringify(novoPost)
    });

    if (!res.ok) {
      throw new Error(`Falha no envio da requisição: ${res.status}`);
    }

    const postCriado = await res.json();
    setPosts(atuais => [postCriado, ...atuais]);
  } catch (erro) {
    setErro(`Erro ao cadastrar: ${erro.message}`);
  } finally {
    setSalvando(false);
  }
};
```

---

### 3.5. Roteamento em SPAs com `react-router-dom`
Aplicações de Página Única (*Single Page Applications*) navegam entre visões sem recarregar o navegador. O roteador intercepta a URL e renderiza dinamicamente o componente associado à rota correspondente:

| Componente / Hook | Papel na Arquitetura | Exemplo de Aplicação |
| :--- | :--- | :--- |
| `<BrowserRouter>` / `<HashRouter>` | Provedor de contexto do histórico de navegação. | Envolve toda a aplicação em `main.jsx` |
| `<Routes>` & `<Route>` | Mapeia o padrão da URL para o componente correspondente. | `<Route path="/nota/:id" element={<DetalheNota />} />` |
| `<Link>` | Cria links acessíveis que realizam transições sem recarregar o browser. | `<Link to="/nova">Cadastrar Nota</Link>` |
| `useParams()` | Hook para capturar parâmetros dinâmicos da URL. | `const { id } = useParams();` |
| `useNavigate()` | Hook para navegação imperativa/programática após ações de formulário. | `const navigate = useNavigate(); navigate('/');` |

---

## 4. Instruções de Execução

### Opção A: Execução Imediata no Navegador (Zero-Setup)
Nenhuma dependência ou servidor local é necessário.
1. Abra o explorador de arquivos na pasta `09-Projeto-React-02/`.
2. Dê **duplo clique** no arquivo [index.html](file:///c:/Users/Letícia%20Vieira/Desktop/DevisonProjeto/09-Projeto-React-02/index.html).
3. O navegador executará a aplicação completa utilizando React 18, Babel Standalone, HashRouter e Tailwind CSS via CDN.

### Opção B: Execução com Servidor de Desenvolvimento Vite
Para testar a compilação modular oficial:
```bash
# 1. Acesse o diretório
cd "09-Projeto-React-02"

# 2. Instale as dependências (React 18 + React Router DOM 6)
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev

# 4. Para gerar o pacote otimizado de produção
npm run build
```

---

## 5. Guia de Deploy no Vercel (Configuração de SPA Fallback)

Ao publicar aplicações SPA com roteamento baseado em histórico (`BrowserRouter`) em servidores estáticos como o Vercel ou Netlify, qualquer atualização direta de página (ex: `F5` na rota `/nota/123`) gerará um erro HTTP 404 caso o servidor não esteja configurado para redirecionar todas as rotas para o `index.html`.

Para resolver isso, crie um arquivo chamado `vercel.json` na raiz do projeto com o seguinte conteúdo de *rewrite*:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

Dessa forma, o servidor sempre entrega o `index.html`, permitindo que o React Router assuma o controle da URL no cliente.

---

## 6. Conclusão Acadêmica

A implementação desta atividade cumpre integralmente os requisitos didáticos e práticos da disciplina de **Frameworks Front-End**, consolidando o domínio de:
- Ciclo de vida funcional de componentes React;
- Gerenciamento de estado complexo e sincronização com APIs externas;
- Boas práticas de acessibilidade, tipagem de eventos e UX em formulários;
- Estruturação de projetos escaláveis com navegação declarativa client-side.
