import type { PropsWithChildren } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { TableFooter, TablePagination, TableSortLabel } from '@mui/material';
import { useListController } from '../entity/list/use-list-controller';
import type { Colaborador } from '@/features/colaboradores/model';
import { Typography } from './typography';
import { useTheme } from './context-provider';
import type { Sort } from '../repository-provider/types';



/**
 * Componente de tabela de dados (DataGrid) baseado em Compound Components.
 * 
 * Centraliza a lógica de paginação, ordenação e estilização de tabelas,
 * utilizando internamente o `useListController` para gerenciar o estado dos dados.
 * 
 * @example
 * <DataGrid>
 *   <DataGrid.Header>
 *     <DataGrid.Row>
 *       <DataGrid.HeaderCell id="nome">Nome</DataGrid.HeaderCell>
 *       <DataGrid.HeaderCell id="email">E-mail</DataGrid.HeaderCell>
 *     </DataGrid.Row>
 *   </DataGrid.Header>
 *   <DataGrid.Body>
 *     {data.map(item => (
 *       <DataGrid.Row key={item.id}>
 *         <DataGrid.Cell>{item.nome}</DataGrid.Cell>
 *         <DataGrid.Cell>{item.email}</DataGrid.Cell>
 *       </DataGrid.Row>
 *     ))}
 *   </DataGrid.Body>
 *   <DataGrid.Footer />
 * </DataGrid>
 */

const DataGrid = ({ children }: PropsWithChildren) => {
    const theme = useTheme()
    return (
        <TableContainer
            sx={{
                borderRadius: theme.spacing(2),
                boxShadow: theme.boxShadow.light
            }}
        >
            <Table>
                {children}
            </Table>
        </TableContainer>
    )
}

const Header = ({ children }: PropsWithChildren) => {
    const theme = useTheme()
    return (
        <TableHead
            sx={{
                bgcolor: theme.components.table.tableHeader.bgColor,
            }}>
            {children}
        </TableHead>
    )

}

export interface HeaderCellProps {
    id: string;
    align?: 'left' | 'right'
}

const HeaderCell = ({
    id,
    align = 'left',
    children
}: PropsWithChildren<HeaderCellProps>) => {
    const { queryParams, setQueryParams } = useListController<
        Colaborador,
        Colaborador & { page: number; limit: number }
    >({ entity: 'colaboradores' })
    return (
        <TableCell
            align={align}
            sx={{
                p: theme => theme.spacing(2),
                maxWidth: 270,
            }}>
            <TableSortLabel
                active={!!queryParams[id]}
                direction={(queryParams[id]) as Sort[keyof Sort]}
                onClick={() => {
                    setQueryParams(prev => ({ ...prev, [id]: !prev[id] ? 'asc' : prev[id] === 'asc' ? 'desc' : undefined }))
                }}
            >
                <Typography variant='table-head'>
                    {children}
                </Typography>
            </TableSortLabel>
        </TableCell>
    )

}

const Body = ({ children }: PropsWithChildren) => {
    return <TableBody>{children}</TableBody>

}

const Row = ({ children }: PropsWithChildren) => {
    return (
        <TableRow>
            {children}
        </TableRow>
    )

}

interface CellProps {
    align?: 'left' | 'center' | 'right'
}

const Cell = ({ align = 'left', children }: PropsWithChildren<CellProps>) => {
    return (
        <TableCell
            align={align}
            sx={{
                maxWidth: 270,
            }}
        >
            <Typography variant='body2'>
                {children}
            </Typography>
        </TableCell>
    )
}

const Footer = () => {
    const { data, isLoading, error, queryParams, setQueryParams } = useListController<
        Colaborador,
        Colaborador & { page: number; limit: number }
    >({ entity: 'colaboradores' })
    return (
        <TableFooter>
            <TableRow>
                <TablePagination
                    disabled={isLoading || !!error}
                    count={data.data.length}
                    onPageChange={(_, page) => {
                        setQueryParams(prev => {
                            return { ...prev, page: page }
                        })
                    }}
                    page={queryParams.page || 0}
                    rowsPerPage={10}
                    rowsPerPageOptions={[10]}
                />
            </TableRow>
        </TableFooter>
    )
}



DataGrid.Header = Header
DataGrid.HeaderCell = HeaderCell
DataGrid.Body = Body
DataGrid.Row = Row
DataGrid.Cell = Cell
DataGrid.Footer = Footer

export { DataGrid }