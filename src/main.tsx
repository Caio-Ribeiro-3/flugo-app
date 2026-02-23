import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AppShell } from './core/app-shell'
import { MockRepositoryProvider } from './core/repository-provider/adapters/mock'
import { ListColaboradoresPage } from './features/colaboradores/pages/list'
import { CreateColaboradoresPage } from './features/colaboradores/pages/create'
import { DashboardLayout } from './core/user-interface/dashboard-layout'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppShell
      repositoryProvider={new MockRepositoryProvider()}
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
