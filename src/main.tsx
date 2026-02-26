import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AppShell } from './core/app-shell'
import { MockRepositoryProvider } from './core/repository-provider/adapters/mock'
import { ListColaboradoresPage } from './features/colaboradores/views/list'
import { CreateColaboradoresPage } from './features/colaboradores/views/create'
import { DashboardLayout } from './core/user-interface/dashboard-layout'
import { FirebaseRepositoryProvider } from './core/repository-provider/adapters/firebase'
import { ControllerProvider } from './core/entity/list/list-controller'
import { Outlet } from './core/routing-provider/outlet'
import { IDENTITY } from './features/colaboradores/model'



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppShell
      repositoryProvider={import.meta.env.PROD ? new FirebaseRepositoryProvider() : new MockRepositoryProvider()}
      routes={[
        {
          pathless: true,
          Component: () => (
            <DashboardLayout>
              <ControllerProvider entity={IDENTITY}>
                <Outlet />
              </ControllerProvider>
            </DashboardLayout>
          ),
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
