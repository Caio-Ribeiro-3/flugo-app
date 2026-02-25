import Box from "@mui/material/Box";
import MUILinearProgress from "@mui/material/LinearProgress";
import type { BaseUserInterfaceProps } from "./types";
import { Typography } from "./typography";



export type LinearProgressProps = BaseUserInterfaceProps<{
    /** Valor de 0 a 100 que reprenta percentual de preenchimento do LinearProgress */
    percentage?: number;
}>

/**
 * Componente de barra de progresso linear (Facade).
 * 
 * Exibe o status visual de uma operação em andamento com um indicador 
 * percentual textual à direita.
 * 
 * @example
 * <LinearProgress percentage={75} />
 */
export const LinearProgress = ({ percentage = 100 }: LinearProgressProps) => (
    <Box sx={{ display: 'flex', gap: theme => theme.spacing(1), alignItems: 'center' }}>
        <Box sx={{ width: '100%' }}>
            <MUILinearProgress sx={{ borderRadius: 50 }} variant="determinate" value={percentage} />
        </Box>
        <Typography variant="caption">
            {percentage}%
        </Typography>
    </Box>
)