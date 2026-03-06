
import { DataGrid } from '@/core/user-interface/data-grid';
import { Chip } from '@/core/user-interface/chip';
import { Skeleton } from "@/core/user-interface/skeleton";

import { DashboardMainPage } from '@/core/user-interface/dashboard-main-page';

import type { Colaborador } from "../model";
import { IDENTITY, type Departamento } from '@/features/departamentos/model';
import { ForeignEntity } from '@/core/entity/foreign/foreign';
import { NameAndAvatarDisplay, NameAndAvatarSkeleton } from '../name-and-avatar-display';
import { formatCurrency } from '@/core/utils/format-currency';
import { EntityContext } from '@/core/entity/identity/context-provider';



export const ListColaboradoresPage = () => {
    return (
        <DashboardMainPage
            title='Colaboradores'
            createButtonText='Novo Colaborador'
        >
            <DataGrid>
                <DataGrid.Header>
                    <DataGrid.HeaderCell id="name" filter={{ strategy: 'includes' }}>
                        Nome
                    </DataGrid.HeaderCell>
                    <DataGrid.HeaderCell id="email" filter={{ strategy: 'includes' }}>
                        Email
                    </DataGrid.HeaderCell>
                    <EntityContext.Provider value={IDENTITY}>
                        <DataGrid.HeaderCell id="role" filter={{ strategy: 'includes', entityField: 'name' }}>
                            Departamento
                        </DataGrid.HeaderCell>
                    </EntityContext.Provider>
                    <DataGrid.HeaderCell id="status">
                        Status
                    </DataGrid.HeaderCell>
                    <DataGrid.HeaderCell id="admissionDate">
                        Data de Admissao
                    </DataGrid.HeaderCell>
                    <DataGrid.HeaderCell id="baseWage">
                        Salario Base
                    </DataGrid.HeaderCell>
                    <DataGrid.HeaderCell id="manager">
                        Gestor Responsavel
                    </DataGrid.HeaderCell>
                    <DataGrid.HeaderCell id="jobTitle">
                        Cargo
                    </DataGrid.HeaderCell>
                    <DataGrid.HeaderCell id="seniority">
                        Nivel Hierarquico
                    </DataGrid.HeaderCell>
                </DataGrid.Header>
                <DataGrid.Body<Colaborador>>
                    {({ data, isLoading }) =>
                        isLoading ? [1, 2, 3, 4].map((num) =>
                            <DataGrid.Row key={num}>
                                <DataGrid.Cell>
                                    <NameAndAvatarSkeleton />
                                </DataGrid.Cell>
                                <DataGrid.Cell>
                                    <Skeleton />
                                </DataGrid.Cell>
                                <DataGrid.Cell>
                                    <Skeleton />
                                </DataGrid.Cell>
                                <DataGrid.Cell>
                                    <Skeleton />
                                </DataGrid.Cell>
                                <DataGrid.Cell>
                                    <Skeleton />
                                </DataGrid.Cell>
                                <DataGrid.Cell>
                                    <Skeleton />
                                </DataGrid.Cell>
                                <DataGrid.Cell>
                                    <Skeleton />
                                </DataGrid.Cell>
                                <DataGrid.Cell>
                                    <Skeleton />
                                </DataGrid.Cell>
                                <DataGrid.Cell>
                                    <Skeleton />
                                </DataGrid.Cell>
                            </DataGrid.Row>
                        ) : data.data.map(row => (
                            <DataGrid.Row key={row.id} id={row.id}>
                                <DataGrid.Cell>
                                    <NameAndAvatarDisplay colaborador={row} />
                                </DataGrid.Cell>
                                <DataGrid.Cell>
                                    {row.email}
                                </DataGrid.Cell>
                                <DataGrid.Cell>
                                    <ForeignEntity<Departamento>
                                        relationship={IDENTITY}
                                        recordId={row.role}
                                    >
                                        {({ data, isLoading }) => isLoading ? <Skeleton /> : data?.name}
                                    </ForeignEntity>
                                </DataGrid.Cell>
                                <DataGrid.Cell>
                                    <Chip color={row.status ? 'success' : 'error'}>
                                        {row.status ? 'Ativo' : 'Inativo'}
                                    </Chip>
                                </DataGrid.Cell>
                                <DataGrid.Cell>
                                    {new Date(row.admissionDate).toLocaleDateString()}
                                </DataGrid.Cell>
                                <DataGrid.Cell>
                                    {formatCurrency(row.baseWage)}
                                </DataGrid.Cell>
                                <DataGrid.Cell>
                                    {(() => {
                                        const manager = data.data.find(colaborador => colaborador.id === row.manager)
                                        if (manager) return <NameAndAvatarDisplay colaborador={manager} />
                                        return 'N/A'
                                    })()}
                                </DataGrid.Cell>
                                <DataGrid.Cell>
                                    {row.jobTitle}
                                </DataGrid.Cell>
                                <DataGrid.Cell>
                                    {row.seniority}
                                </DataGrid.Cell>
                            </DataGrid.Row>
                        ))}
                </DataGrid.Body>
                <DataGrid.Footer />
            </DataGrid>
        </DashboardMainPage>
    )
}