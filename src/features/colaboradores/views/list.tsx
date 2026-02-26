
import { Button } from '@/core/user-interface/button';
import { Typography } from '@/core/user-interface/typography';
import { Avatar } from '@/core/user-interface/avatar';
import { DataGrid } from '@/core/user-interface/data-grid';
import { Chip } from '@/core/user-interface/chip';
import { Base } from '@/core/user-interface/base';
import { Skeleton } from "@/core/user-interface/skeleton";

import { useNavigate } from "@/core/routing-provider/use-navigate";

import type { Colaborador } from "../model";
import { useMediaQuery } from "@/core/user-interface/use-media-query";
import { windowBreakpoints } from "@/core/user-interface/constants";
import { useListController } from '@/core/entity/list/list-controller';
import { EmptyList } from '@/core/user-interface/empty-list';



export const ListColaboradoresPage = () => {
    const matches = useMediaQuery(windowWidth => windowWidth > windowBreakpoints.sm);
    const { data, isLoading, error } = useListController<Colaborador>()

    const navigate = useNavigate()
    return (
        <>
            <Base
                _css={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: matches ? 'center' : 'stretch',
                    flexDirection: matches ? 'row' : 'column',
                    gap: matches ? undefined : 2,
                    pb: theme => theme.spacing(4),
                    pt: theme => theme.spacing(7)
                }}>
                <Typography variant='desktop-h4' component='h1'>
                    Colaboradores
                </Typography>
                <Button onClick={() => navigate('/create')}>
                    Novo Colaborador
                </Button>
            </Base>
            <DataGrid>
                <DataGrid.Header>
                    <DataGrid.HeaderCell id="name">
                        Nome
                    </DataGrid.HeaderCell>
                    <DataGrid.HeaderCell id="email">
                        Email
                    </DataGrid.HeaderCell>
                    <DataGrid.HeaderCell id="role">
                        Departamento
                    </DataGrid.HeaderCell>
                    <DataGrid.HeaderCell align='right' id="status">
                        Status
                    </DataGrid.HeaderCell>
                </DataGrid.Header>
                <DataGrid.Body>
                    {error ? (
                        <></>
                    ) : isLoading ? [1, 2, 3, 4].map((num) =>
                        <DataGrid.Row key={num}>
                            <DataGrid.Cell>
                                <Base
                                    _css={{
                                        display: 'flex',
                                        gap: theme => theme.spacing(2),
                                        alignItems: 'center'
                                    }}>
                                    <Skeleton _css={{ flexShrink: 0 }} variant="circular" width={40} height={40} />
                                    <Skeleton width={150} />
                                </Base>
                            </DataGrid.Cell>
                            <DataGrid.Cell>
                                <Skeleton />
                            </DataGrid.Cell>
                            <DataGrid.Cell>
                                <Skeleton />
                            </DataGrid.Cell>
                            <DataGrid.Cell align='right'>
                                <Skeleton />
                            </DataGrid.Cell>
                        </DataGrid.Row>
                    ) : data.data.length ? data.data.map(row => (
                        <DataGrid.Row key={row.id}>
                            <DataGrid.Cell>
                                <Base
                                    _css={{
                                        display: 'flex',
                                        gap: theme => theme.spacing(2),
                                        alignItems: 'center'
                                    }}>
                                    <Avatar src={row.avatar} alt={row.name} />
                                    {row.name}
                                </Base>
                            </DataGrid.Cell>
                            <DataGrid.Cell>
                                {row.email}
                            </DataGrid.Cell>
                            <DataGrid.Cell>
                                {row.role}
                            </DataGrid.Cell>
                            <DataGrid.Cell align='right'>
                                <Chip color={row.status ? 'success' : 'error'}>
                                    {row.status ? 'Ativo' : 'Inativo'}
                                </Chip>
                            </DataGrid.Cell>
                        </DataGrid.Row>
                    )) : (
                        <EmptyList />
                    )}
                </DataGrid.Body>
                <DataGrid.Footer />
            </DataGrid>
        </>
    )
}