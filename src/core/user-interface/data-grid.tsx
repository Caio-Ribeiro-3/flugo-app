import type { PropsWithChildren } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { TableFooter, TablePagination, TableSortLabel } from '@mui/material';
import type { Colaborador } from '@/features/colaboradores/model';
import { Typography } from './typography';
import { useTheme } from './context-provider';
import { Base } from './base';
import { deepCopy } from '../utils/deep-copy';
import { DEFAULT_PAGINATION, useListController } from '../entity/list/list-controller';



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
        <Base
            _css={{
                maxWidth: '100vw',
            }}>
            <TableContainer
                sx={{
                    borderRadius: theme.spacing(2),
                    boxShadow: theme.boxShadow.light,
                }}
            >
                <Table>
                    {children}
                </Table>
            </TableContainer>
        </Base>
    )
}

const Header = ({ children }: PropsWithChildren) => {
    const theme = useTheme()
    return (
        <TableHead
            sx={{
                bgcolor: theme.components.table.tableHeader.bgColor,
            }}>
            <TableRow>
                {children}
            </TableRow>
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
    const { sort, setSort } = useListController<Colaborador>()
    const sortIndex = sort.findIndex(el => el.field === id)
    return (
        <TableCell
            align={align}
            sx={{
                p: theme => theme.spacing(2),
                maxWidth: 270,
            }}>
            <TableSortLabel
                active={!!sort[sortIndex]}
                direction={sort[sortIndex]?.direction}
                onClick={() => {
                    setSort(prev => {
                        const newSort = deepCopy(prev)
                        if (sortIndex === -1) {
                            newSort.push({
                                field: id,
                                direction: 'asc'
                            })
                        } else {
                            if (newSort[sortIndex].direction === 'asc') {
                                newSort[sortIndex] = { ...newSort[sortIndex], direction: 'desc' }
                            } else {
                                newSort.splice(sortIndex, 1)
                            }
                        }
                        return newSort
                    })
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
    const { data, isLoading, error, pagination, setPagination } = useListController<Colaborador>()
    return (
        <TableFooter>
            <TableRow>
                <TablePagination
                    disabled={isLoading || !!error}
                    count={data.total!}
                    onPageChange={(_, page) => {
                        setPagination(prev => {
                            return { ...prev, page: page + 1 }
                        })
                    }}
                    page={(pagination.page || 1) - 1}
                    rowsPerPage={DEFAULT_PAGINATION.perPage!}
                    rowsPerPageOptions={[DEFAULT_PAGINATION.perPage!]}
                    labelDisplayedRows={function ({ from, to, count }) {
                        return `${from}–${to} de ${count !== -1 ? count : `mais que ${to}`}`;
                    }}
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