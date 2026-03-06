import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AppShell } from './core/app-shell'
import { DashboardLayout } from './core/user-interface/dashboard-layout'
import { SimpleLayout } from './core/user-interface/simple-layout'
import { FirebaseRepositoryProvider } from './core/repository-provider/adapters/firebase'
import { Outlet } from './core/routing-provider/outlet'
import { MockRepositoryProvider } from './core/repository-provider/adapters/mock'

import { ListColaboradoresPage } from './features/colaboradores/views/list'
import { CreateColaboradoresPage } from './features/colaboradores/views/create'
import { IDENTITY as COLABORADORES_IDENTITY } from './features/colaboradores/model'

import { ListDepartamentosPage } from './features/departamentos/views/list'
// import { CreateColaboradoresPage } from './features/departamentos/views/create'
import { IDENTITY as DEPARTAMENTOS_IDENTITY } from './features/departamentos/model'
import { MockAuthProvider } from './core/auth/adapters/mock'
import { FirebaseAuth } from './core/auth/adapters/firebase'
import { RegisterPage } from './features/auth/views/register'
import { LoginPage } from './features/auth/views/login'
import { Routes } from './core/routing-provider/context-provider'
import { firebaseSetup } from './lib/firebase'
import type { AuthProvider } from './core/auth/types'
import type { RepositoryProvider } from './core/repository-provider/types'
import { EditColaboradoresPage } from './features/colaboradores/views/edit'
import { EntityContext } from './core/entity/identity/context-provider'
import { BaseList } from './core/entity/list/base-list'
import { CreateControllerProvider } from './core/entity/create/create-controller'
import { EditDepartamentosPage } from './features/departamentos/views/edit'
import { CreateDepartamentosPage } from './features/departamentos/views/create'



(() => {
  let authProvider: AuthProvider;
  let repositoryProvider: RepositoryProvider;

  if (import.meta.env.PROD) {
    const app = firebaseSetup()
    authProvider = new FirebaseAuth(app)
    repositoryProvider = new FirebaseRepositoryProvider(app)
  } else {
    authProvider = new MockAuthProvider()
    repositoryProvider = new MockRepositoryProvider()
  }

  const defaultAuthenticatedRoute = `/dashboard/${COLABORADORES_IDENTITY}`

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <AppShell
        authProvider={authProvider}
        repositoryProvider={repositoryProvider}
        defaultAuthenticatedRoute={defaultAuthenticatedRoute}
      >
        <Routes
          routes={[
            {
              pathless: true,
              Component: () => (
                <SimpleLayout>
                  <Outlet />
                </SimpleLayout>
              ),
              children: [
                {
                  path: '/register',
                  Component: RegisterPage
                },
                {
                  path: '/login',
                  Component: LoginPage
                },
              ]
            },
            {
              requiredAuthentication: true,
              pathless: true,
              Component: () => (
                <DashboardLayout>
                  <Outlet />
                </DashboardLayout>
              ),
              children: [
                {
                  pathless: true,
                  Component: () => (
                    <EntityContext.Provider value={COLABORADORES_IDENTITY}>
                      <BaseList>
                        <Outlet />
                      </BaseList>
                    </EntityContext.Provider>
                  ),
                  children: [
                    {
                      path: defaultAuthenticatedRoute,
                      Component: ListColaboradoresPage
                    },
                    {
                      path: `/dashboard/${COLABORADORES_IDENTITY}/create`,
                      Component: () => (
                        <CreateControllerProvider>
                          <CreateColaboradoresPage />
                        </CreateControllerProvider>
                      )
                    },
                    {
                      path: `/dashboard/${COLABORADORES_IDENTITY}/edit/:colaboradorId`,
                      Component: EditColaboradoresPage
                    },
                  ]
                },
                {
                  pathless: true,
                  Component: () => (
                    <EntityContext.Provider value={DEPARTAMENTOS_IDENTITY}>
                      <BaseList>
                        <Outlet />
                      </BaseList>
                    </EntityContext.Provider>
                  ),
                  children: [
                    {
                      path: `/dashboard/${DEPARTAMENTOS_IDENTITY}`,
                      Component: ListDepartamentosPage
                    },
                    {
                      path: `/dashboard/${DEPARTAMENTOS_IDENTITY}/create`,
                      Component: () => (
                        <CreateControllerProvider>
                          <CreateDepartamentosPage />
                        </CreateControllerProvider>
                      )
                    },
                    {
                      path: `/dashboard/${DEPARTAMENTOS_IDENTITY}/edit/:departamentoId`,
                      Component: EditDepartamentosPage
                    },
                  ]
                },
              ]
            },
          ]}
        />
      </AppShell>
    </StrictMode>,
  )
})()