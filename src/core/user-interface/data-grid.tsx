import { type PropsWithChildren, type ReactNode } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { TableFooter, TablePagination, TableSortLabel } from '@mui/material';

import { Typography } from './typography';
import { useTheme } from './context-provider';
import { Base } from './base';
import { useListController } from '../entity/list/list-controller';
import { useEntity } from '../entity/identity/context-provider';
import { RecordContext, useRecord } from '../entity/record/context-provider';
import { useList } from '../entity/list/use-list';
import { Checkbox } from './form/checkbox';
import { BaseList } from '../entity/list/base-list';
import { DEFAULT_PAGINATION, usePagination } from '../entity/list/use-pagination';
import { useSort } from '../entity/list/use-sort';
import type { BaseRecord, Filter } from '../repository-provider/types';
import { EmptyList } from './empty-list';
import { DeleteControllerProvider, useDeleteController } from '../entity/delete/delete-controller';
import { Button, IconButton } from "@/core/user-interface/button"
import { EditIcon } from "@/core/user-interface/icons/edit"
import { DeleteIcon } from "@/core/user-interface/icons/delete"
import { useNavigate } from "@/core/routing-provider/use-navigate"
import type { BaseUserInterfaceProps } from './types';
import { useFilter } from '../entity/list/use-filter';
import { Menu, MenuCategory } from './menu';
import { TextInput } from './form/text-input';
import { useDebounce } from '../utils/debounce';
import { VerticalDotstIcon } from './icons/vertical-dots';



const UpdateButton = () => {
    const recordId = useRecord()
    const { isLoading } = useDeleteController()
    const navigate = useNavigate()

    return (
        <IconButton
            disabled={isLoading || !recordId}
            onClick={() => navigate(`edit/${recordId}`)}
        >
            <EditIcon size='small' />
        </IconButton>
    )
}

const DeleteButton = () => {
    const recordId = useRecord()
    const { submit, isLoading } = useDeleteController()


    return (
        <IconButton
            disabled={isLoading || !recordId}
            onClick={submit}
        >
            <DeleteIcon size='small' />
        </IconButton>
    )
}

const DeleteAllButton = () => {
    const { selected } = useList()
    const { submit, isLoading } = useDeleteController()


    return selected.length > 0 && (
        <Button
            _css={{ mb: 2, ml: 'auto', display: 'flex' }}
            disabled={isLoading}
            onClick={submit}
            variant="text"
        >
            Excluir todos os selecionados
        </Button>
    )
}

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
        <BaseList>
            <DeleteControllerProvider>
                <Base
                    _css={{
                        maxWidth: '100vw',
                    }}>
                    <DeleteAllButton />
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
            </DeleteControllerProvider>
        </BaseList>
    )
}

const Header = ({ children }: PropsWithChildren) => {
    const theme = useTheme()
    const { selected, clear, selectAll } = useList()
    const { data } = useListController()

    const isChecked = data.data.length > 0 && data.data.length === selected.length

    return (
        <TableHead
            sx={{
                bgcolor: theme.components.table.tableHeader.bgColor,
            }}>
            <TableRow>
                <HeaderCell>
                    <Checkbox
                        value={isChecked}
                        onChange={isChecked ? clear : selectAll}
                    />
                </HeaderCell>
                {children}
                <HeaderCell align='right'>
                    Ações
                </HeaderCell>
            </TableRow>
        </TableHead>
    )

}

export interface HeaderCellProps {
    id?: string;
    align?: 'left' | 'right';
    filter?: Pick<Filter[number], 'strategy' | 'entityField'>;
}

const HeaderCell = ({
    id,
    align = 'left',
    filter,
    children,
}: PropsWithChildren<HeaderCellProps>) => {
    const entity = useEntity()
    const { sort, toggleSort } = useSort()
    const { handleFilter, filters } = useFilter()
    const debouncedHandleFilter = useDebounce(handleFilter)

    const sortIndex = sort.findIndex(el => el.field === id)

    function renderText() {
        return (
            <Typography variant='table-head' _css={{ whiteSpace: 'nowrap' }}>
                {children}
            </Typography>
        )
    }
    return (
        <TableCell
            align={align}
            sx={{
                p: theme => theme.spacing(2),
                maxWidth: 270,
            }}>
            {id ? (
                <Base _css={{ display: 'flex' }}>
                    {filter && (
                        <Menu
                            trigger={() => (
                                <IconButton>
                                    <VerticalDotstIcon />
                                </IconButton>
                            )}
                        >
                            {() => (
                                <MenuCategory title='Filtrar'>
                                    <TextInput
                                        placeholder='Digite o filtro'
                                        defaultValue={filters.find(filter => filter.field === id)?.value}
                                        onChange={e => {
                                            debouncedHandleFilter(id, e.target.value, entity, filter.entityField)
                                        }}
                                    />
                                </MenuCategory>
                            )}
                        </Menu>
                    )}
                    <TableSortLabel
                        active={!!sort[sortIndex]}
                        direction={sort[sortIndex]?.direction}
                        onClick={() => toggleSort(id)}
                    >
                        {renderText()}
                    </TableSortLabel>
                </Base>
            ) : renderText()}
        </TableCell>
    )

}

function Body<T extends BaseRecord>({ children }: { children(payload: ReturnType<typeof useListController<T>>): ReactNode }) {
    const listControllerState = useListController()
    return (
        <TableBody>
            {listControllerState.error ? (
                <></>
            ) : (!listControllerState.isLoading && !listControllerState.data.data.length) ? (
                <tr>
                    <td colSpan={20}>
                        <EmptyList />
                    </td>
                </tr>
                // @ts-expect-error
            ) : children(listControllerState)}
        </TableBody>
    )
}

const Row = ({ id, children }: PropsWithChildren<{ id?: string }>) => {
    const entity = useEntity()
    const { selected, toggleSelect } = useList()

    function wrapped(child: ReactNode) {
        if (id) {
            return (
                <RecordContext.Provider value={id}>
                    {child}
                </RecordContext.Provider>
            )
        }
        return child
    }


    return wrapped(
        <TableRow>
            <DataGrid.Cell>
                <Checkbox
                    value={id ? selected.includes(id) : false}
                    onChange={id ? () => toggleSelect(id) : undefined}
                />
            </DataGrid.Cell>
            {children}
            <DataGrid.Cell align='right' _css={{ minWidth: 150 }}>
                <DeleteControllerProvider>
                    <UpdateButton
                        aria-label={`Ir para pagina de edicao de registro de ${entity}`}
                    />
                    <DeleteButton
                        aria-label={`Excluir de registro de ${entity}`}
                    />
                </DeleteControllerProvider>
            </DataGrid.Cell>
        </TableRow>
    )
}

interface CellProps {
    align?: 'left' | 'center' | 'right'
}

const Cell = ({ align = 'left', _css, children }: PropsWithChildren<BaseUserInterfaceProps<CellProps>>) => {
    return (
        <TableCell
            align={align}
            sx={{
                maxWidth: 270,
                ..._css
            }}
        >
            {typeof children === 'string' ? (
                <Typography variant='body2'>
                    {children}
                </Typography>
            ) : children}
        </TableCell>
    )
}

const Footer = () => {
    const { pagination, setPagination } = usePagination()
    const { data, isLoading, error } = useListController()
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