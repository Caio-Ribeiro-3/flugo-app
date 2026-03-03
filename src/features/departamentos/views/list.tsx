
import { Button } from '@/core/user-interface/button';
import { Typography } from '@/core/user-interface/typography';
import { DataGrid } from '@/core/user-interface/data-grid';
import { Base } from '@/core/user-interface/base';
import { Skeleton } from "@/core/user-interface/skeleton";

import { useNavigate } from "@/core/routing-provider/use-navigate";

import type { Departamento } from "../model";
import { useMediaQuery } from "@/core/user-interface/use-media-query";
import { windowBreakpoints } from "@/core/user-interface/constants";
import { useListController } from '@/core/entity/list/list-controller';
import { EmptyList } from '@/core/user-interface/empty-list';



export const ListDepartamentosPage = () => {
    const matches = useMediaQuery(windowWidth => windowWidth > windowBreakpoints.sm);
    const { data, isLoading, error } = useListController<Departamento>()

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
                    Departamentos
                </Typography>
                <Button onClick={() => navigate('/create')}>
                    Novo Departamento
                </Button>
            </Base>
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
                <DataGrid.Body>
                    {error ? (
                        <></>
                    ) : isLoading ? [1, 2, 3, 4].map((num) =>
                        <DataGrid.Row key={num}>
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
                    ) : data.data.length ? data.data.map(row => (
                        <DataGrid.Row key={row.id}>
                            <DataGrid.Cell>
                                {row.name}
                            </DataGrid.Cell>
                            <DataGrid.Cell>
                                {row.employees}
                            </DataGrid.Cell>
                            <DataGrid.Cell>
                                {row.manager}
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