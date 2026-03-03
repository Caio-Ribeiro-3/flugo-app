import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AppShell } from './core/app-shell'
import { DashboardLayout } from './core/user-interface/dashboard-layout'
import { SimpleLayout } from './core/user-interface/simple-layout'
import { FirebaseRepositoryProvider } from './core/repository-provider/adapters/firebase'
import { ControllerProvider } from './core/entity/list/list-controller'
import { Outlet } from './core/routing-provider/outlet'
import { MockRepositoryProvider } from './core/repository-provider/adapters/mock'

import { ListColaboradoresPage } from './features/colaboradores/views/list'
import { CreateColaboradoresPage } from './features/colaboradores/views/create'
import { IDENTITY as COLABORADORES_IDENTITY } from './features/colaboradores/model'

import { ListDepartamentosPage } from './features/departamentos/views/list'
// import { CreateColaboradoresPage } from './features/departamentos/views/create'
import { IDENTITY as DEPARTAMNTOS_IDENTITY } from './features/departamentos/model'
import { MockAuthProvider } from './core/auth/adapters/mock'
import { FirebaseAuth } from './core/auth/adapters/firebase'
import { RegisterPage } from './features/auth/views/register'
import { LoginPage } from './features/auth/views/login'
import { Routes } from './core/routing-provider/context-provider'
import { firebaseSetup } from './lib/firebase'
import type { AuthProvider } from './core/auth/types'
import type { RepositoryProvider } from './core/repository-provider/types'



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

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <AppShell
        authProvider={authProvider}
        repositoryProvider={repositoryProvider}
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
                  <ControllerProvider entity={COLABORADORES_IDENTITY}>
                    {/* <ControllerProvider entity={DEPARTAMNTOS_IDENTITY}> */}
                    <Outlet />
                    {/* </ControllerProvider> */}
                  </ControllerProvider>
                </DashboardLayout>
              ),
              children: [
                {
                  path: '/dashboard/',
                  Component: ListColaboradoresPage
                },
                {
                  path: '/dashboard/create',
                  Component: CreateColaboradoresPage
                },
                {
                  path: '/dashboard/departamentos',
                  Component: ListDepartamentosPage
                },
                // {
                //   path: '/dashboard/departamentos/create',
                //   Component: ListColaboradoresPage
                // },
              ]
            },
          ]} />
      </AppShell>
    </StrictMode>,
  )
})()