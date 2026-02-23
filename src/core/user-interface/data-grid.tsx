import type { PropsWithChildren } from 'react';

import { } from '@mui/x-data-grid/DataGrid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'

import { IconButton } from './button';

const DataGrid = ({ children }: PropsWithChildren) => {
    return (
        <TableContainer>
            <Table sx={{ tableLayout: 'fixed' }}>
                {children}
            </Table>
        </TableContainer>
    )
}

const Header = ({ children }: PropsWithChildren) => {
    return (
        <TableHead
            sx={{
                bgcolor: '#F4F6F8',
            }}>
            {children}
        </TableHead>
    )

}

export interface HeaderCellProps {
    align?: 'left' | 'right'
}

const HeaderCell = ({
    align = 'left',
    children
}: PropsWithChildren<HeaderCellProps>) => {
    return (
        <TableCell
            align={align}
            sx={{
                fontWeight: 600,
                fontSize: 14,
                lineHeight: 24 / 14,
                p: theme => theme.spacing(2),
                maxWidth: 270,
                color: theme => theme.palette.text.secondary
            }}>
            {children}
            <IconButton size='small' sx={{ my: 'auto' }}>
                <ArrowUpwardIcon sx={{ fontSize: 18 }} />
            </IconButton>
        </TableCell>
    )

}

const Body = ({ children }: PropsWithChildren) => {
    return <TableBody>{children}</TableBody>

}

const Row = ({ children }: PropsWithChildren) => {
    return (
        <TableRow
            sx={{
            }}
        >
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
            {children}
        </TableCell>
    )
}

const SortButton = ({ children }: PropsWithChildren) => {
    return (
        <IconButton>
            {children}
        </IconButton>
    )
}



DataGrid.Header = Header
DataGrid.HeaderCell = HeaderCell
DataGrid.Body = Body
DataGrid.Row = Row
DataGrid.Cell = Cell
DataGrid.SortButton = SortButton

export { DataGrid }