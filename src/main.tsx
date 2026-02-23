import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AppShell } from './core/app-shell'
import { MockRepositoryProvider } from './core/repository-provider/adapters/mock'
import { ListColaboradoresPage } from './features/colaboradores/pages/list'
import { CreateColaboradoresPage } from './features/colaboradores/pages/create'
import { DashboardLayout } from './core/user-interface/dashboard-layout'
import { FirebaseRepositoryProvider } from './core/repository-provider/adapters/firebase'



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppShell
      repositoryProvider={import.meta.env.PROD ? new FirebaseRepositoryProvider() : new MockRepositoryProvider()}
      routes={[
        {
          pathless: true,
          Component: DashboardLayout,
          children: [
            {
              path: '/',
              Component: ListColaboradoresPage
            },
            {
              path: '/create',
              Component: CreateColaboradoresPage
            },
          ]
        }
      ]}
    />
  </StrictMode>,
)
