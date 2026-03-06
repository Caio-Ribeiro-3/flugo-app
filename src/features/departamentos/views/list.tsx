
import { DataGrid } from '@/core/user-interface/data-grid';
import { Skeleton } from "@/core/user-interface/skeleton";
import { DashboardMainPage } from '@/core/user-interface/dashboard-main-page';
import { Avatar } from '@/core/user-interface/avatar';
import { ForeignEntity } from '@/core/entity/foreign/foreign';
import { AvatarGroup } from '@/core/user-interface/avatar-group';

import { IDENTITY, type Colaborador } from '@/features/colaboradores/model';
import { NameAndAvatarDisplay, NameAndAvatarSkeleton } from '@/features/colaboradores/name-and-avatar-display';

import type { Departamento } from "../model";
import { Tooltip } from '@/core/user-interface/tooltip';



export const ListDepartamentosPage = () => {
    return (
        <DashboardMainPage
            title='Departamentos'
            createButtonText='Novo Departamento'
        >
            <DataGrid>
                <DataGrid.Header>
                    <DataGrid.HeaderCell id="name">
                        Nome
                    </DataGrid.HeaderCell>
                    <DataGrid.HeaderCell id="employees">
                        Colaboradores
                    </DataGrid.HeaderCell>
                    <DataGrid.HeaderCell id="manager">
                        Responsavel
                    </DataGrid.HeaderCell>
                </DataGrid.Header>
                <DataGrid.Body<Departamento>>
                    {({ data, isLoading }) =>
                        isLoading ? [1, 2, 3, 4].map((num) => (
                            <DataGrid.Row key={num}>
                                <DataGrid.Cell>
                                    <Skeleton />
                                </DataGrid.Cell>
                                <DataGrid.Cell>
                                    <Skeleton />
                                </DataGrid.Cell>
                                <DataGrid.Cell>
                                    <NameAndAvatarSkeleton />
                                </DataGrid.Cell>
                            </DataGrid.Row>
                        )) : data.data.map(row => (
                            <DataGrid.Row key={row.id} id={row.id}>
                                <DataGrid.Cell>
                                    {row.name}
                                </DataGrid.Cell>
                                <DataGrid.Cell>
                                    <ForeignEntity<Colaborador>
                                        relationship={IDENTITY}
                                    >
                                        {({ data, isLoading }) => {
                                            if (isLoading) return <Skeleton />
                                            const filteredColaboradores = data.filter(colaborador => colaborador.role === row.id)
                                            return (
                                                <Tooltip title={filteredColaboradores.map(colaborador => colaborador.name).join(', ')}>
                                                    <AvatarGroup>
                                                        {filteredColaboradores.map(colaborador => (
                                                            <Avatar src={colaborador.avatar} alt={colaborador.name} />
                                                        ))}
                                                    </AvatarGroup>
                                                </Tooltip>
                                            )
                                        }}
                                    </ForeignEntity>
                                </DataGrid.Cell>
                                <DataGrid.Cell>
                                    <ForeignEntity<Colaborador>
                                        relationship={IDENTITY}
                                        recordId={row.owner}
                                    >
                                        {({ data, isLoading }) => isLoading ? <NameAndAvatarSkeleton /> : (
                                            (data && row.owner) ? <NameAndAvatarDisplay colaborador={data} /> : <></>
                                        )}
                                    </ForeignEntity>
                                </DataGrid.Cell>
                            </DataGrid.Row>
                        ))}
                </DataGrid.Body>
                <DataGrid.Footer />
            </DataGrid>
        </DashboardMainPage>
    )
}