import Box from "@mui/material/Box";
import MUILinearProgress from "@mui/material/LinearProgress";
import type { BaseUserInterfaceProps } from "./types";
import { Typography } from "./typography";

export type LinearProgressProps = BaseUserInterfaceProps<{
    percentage?: number;
}>

export const LinearProgress = ({ percentage = 100 }: LinearProgressProps) => (
    <Box sx={{ display: 'flex', gap: theme => theme.spacing(1), alignItems: 'center' }}>
        <Box sx={{ width: '100%' }}>
            <MUILinearProgress sx={{ borderRadius: 50 }} variant="determinate" value={percentage} />
        </Box>
        <Typography sx={{ fontSize: 12, lineHeight: 18 / 12, color: 'text.secondary' }} variant="body1">
            {percentage}%
        </Typography>
    </Box>
)