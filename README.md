# 🚀 Flugo Tech Test: Sistema de Gestão de Colaboradores

Este projeto é um teste técnico desenvolvido para a **Flugo**, focado em demonstrar uma arquitetura de software escalável, segurança de nível enterprise e isolamento completo de dependências externas através de **Facades** e **Inversão de Dependência**.

## 📌 Visão Geral
A plataforma consiste em duas interfaces principais: **Listagem de Colaboradores** e **Registro de Colaboradores**. A solução foi desenhada para ser agnóstica a fornecedores de infraestrutura e bibliotecas de terceiros.

---

## 🏗️ Arquitetura e Padrões

### 1. MVC (Model-View-Controller)
O projeto separa responsabilidades de forma clara para garantir testabilidade:
-   **Model**: Interfaces e tipos de domínio (`Colaborador`) que definem o contrato de dados.
-   **View**: Componentes React (Design System) focados estritamente na renderização, utilizando o padrão Facade sobre o Material UI.
-   **Controller**: Hooks customizados que orquestram a lógica de negócio, interagem com os repositórios e gerenciam o estado de cache via TanStack Query.

### 2. Inversão de Dependência (DI)
-   **Data Access Layer (DAL)**: O repositório de dados é injetado via **Context API**.
-   A aplicação depende de uma `Interface` interna de repositório.
-   **Implementação Atual**: Mock e Firestore (Firebase). A arquitetura permite trocar para uma API REST ou Mock apenas injetando uma nova classe no Provider, sem tocar na UI.

### 3. Facades de Infraestrutura
-   **UI Facade**: Componentes core isolam o **Material UI**. Mudanças na biblioteca de UI não impactam a lógica de negócio.
-   **Hook Facades**: O **TanStack Query** é encapsulado em hooks específicos, protegendo a aplicação de mudanças na biblioteca de gerenciamento de server-state.

---

## 📂 Estrutura de Pastas

A organização do diretório `src` reflete o compromisso com o desacoplamento e o padrão MVC:

```text
src/
├── assets/                             # Assets estáticos (SVGs, imagens)
├── core/
│   ├── repository-provider/            # Camada de Persistência (DAL)
│   │   ├── adapters/                   # Adapters para mock e firestore
│   │   ├── types/                      # Interfaces que o resto do app depende de forma segura
│   │   ├── context-provider/           # Mecanismo de injeção de dependência
│   ├── query-provider/                 # Gerenciador de estado relacionado a requisições
│   │   ├── use-query/                  # Hook de query
│   │   ├── use-query-client/           # Hook de consulta da store global
│   │   ├── use-mutation/               # Hook de mutacões com invalidação embutida
│   │   ├── types/                      # Interfaces que o resto do app depende de forma segura
│   │   ├── context-provider/           # Mecanismo de injeção de dependência
│   ├── entity/                         # Camada de Controllers universais
│   │   ├── list/use-list-controller    # Hook universal para gerenciar listagem de dados. Lida com cache, todo estado relacionado a requests, sort e paginação
│   ├── user-interface/                 # Design System (Facades do MUI)
│   │   ├── button/                     # Componente + Stories + Unit Tests
│   │   ├── input/
│   │   └── ...
│   └── routing-provider/               # Facade de roteamento
│   │   ├── adapters/                   # Adapter para tanstack-router
│   │   ├── context-provider/           # Mecanismo de injeção de dependência
│   │   ├── types/                      # Interfaces que o resto do app depende de forma segura
│   │   ├── use-navigate/               # Hook para lidar com navegação entre páginas
│   │   ├── use-query-params/           # Hook para lidar com query params da url
│   │   ├── outlet/                     # Facade para roteamento
│   │   ├── mount-routes/               # Criador de rotas, dado um objeto estatico e um strategy/adapter
│   └── utils/                          # Funções de utilidade
├── features/
│   └── colaboradores/
│       ├── model/                      # Definições de tipos e interfaces de domínio
│       ├── controller/                 # Hooks (useListController, etc) - Camada lógica
│       └── view/                       # Componentes de página (Listagem, Registro)
└── test-utils/                         # Helpers para Vitest Browser Mode
```
---

## 🛡️ Segurança e Infraestrutura

### 1. Persistência e Proteção (Firebase)
-   **App Check**: Implementado com **reCAPTCHA Enterprise**, garantindo que apenas requisições originadas do domínio autorizado acessem o Firestore.

### 2. Hosting e Delivery (Cloudflare Pages)
Deploy realizado via **Cloudflare Pages** com foco em hardening:
-   **CSP (Content Security Policy)**: Implementada com suporte a **Nonces** para execução segura de scripts.
-   **Segurança de Headers**: Injeção de headers como `X-Content-Type-Options: nosniff` para mitigação de ataques.

---

## 🧪 Qualidade e CI/CD

A saúde do código é garantida por uma pipeline automatizada:
-   **TypeScript**: Verificação estática rigorosa.
-   **Vitest**: Testes unitários e de integração utilizando **Browser Mode** e `userEvent` para simulação real de comportamento.
-   **Storybook**: Documentação visual isolada de todos os componentes.
-   **JSDoc**: Documentação técnica com exemplos de uso integrados ao IntelliSense.

---

## 🛠️ Guia de Execução

### 1. Pré-requisitos
*   **Node.js 22 (LTS)**: O projeto exige a versão 22 do [Node.js](https://nodejs.org/pt-br/download)
*   **nvm**: Caso possua o nvm instalado, execute `nvm use 22`.

### 2. Configuração de Ambiente
Renomeie o arquivo `.env.example` para `.env.development` na raiz com as credenciais do projeto:
```bash
VITE_API_KEY=""
VITE_AUTH_DOMAIN=""
VITE_PROJECT_ID=""
VITE_STORAGE_BUCKET=""
VITE_MESSAGING_SENDER_ID=""
VITE_APP_ID=""
VITE_RECAPTCHA_SITE_KEY=""
```

### 3. Instalação e Execução
- **Instalar dependências**: Execute `npm install` para baixar as bibliotecas necessárias.
- **Servidor de desenvolvimento**: Use `npm run dev` para iniciar o projeto via Vite.
- **Executar testes**: Utilize `npm run test:browser` para rodar a suíte do Vitest.
- **Documentação visual**: Execute `npm run build-storybook` para buildar e `npm run storybook` para visualizar os componentes.

### 4. Scripts de Qualidade
- **Build de produção**: `npm run build` gera o bundle otimizado para o Cloudflare.
- **Linting**: `npm run lint` valida as regras de estilo de código.