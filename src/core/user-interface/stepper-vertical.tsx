import { createContext, useContext, type PropsWithChildren } from 'react';

import MUITimeline from '@mui/lab/Timeline';
import MUITimelineItem from '@mui/lab/TimelineItem';
import MUITimelineSeparator from '@mui/lab/TimelineSeparator';
import MUITimelineConnector from '@mui/lab/TimelineConnector';
import MUITimelineContent from '@mui/lab/TimelineContent';
import MUITimelineDot from '@mui/lab/TimelineDot';
import { CheckIcon } from './icons/check';
import { Typography } from './typography';



/**
 * Componente de fluxo de etapas vertical (StepperVertical).
 * 
 * Utiliza a estrutura de Timeline para criar um indicador de progresso 
 * sequencial. O estado visual (isCurrent/isCompleted) é compartilhado 
 * via contexto entre os sub-componentes.
 * 
 * @example
 * <StepperVertical>
 *   <StepperVertical.StepperVerticalItem isCompleted>
 *     <StepperVertical.StepperVerticalSeparator>
 *       <StepperVertical.StepperVerticalDot>1</StepperVertical.StepperVerticalDot>
 *       <StepperVertical.StepperVerticalConnector />
 *     </StepperVertical.StepperVerticalSeparator>
 *     <StepperVertical.StepperVerticalContent>Etapa Concluída</StepperVertical.StepperVerticalContent>
 *   </StepperVertical.StepperVerticalItem>
 * 
 *   <StepperVertical.StepperVerticalItem isCurrent>
 *     <StepperVertical.StepperVerticalSeparator>
 *       <StepperVertical.StepperVerticalDot>2</StepperVertical.StepperVerticalDot>
 *     </StepperVertical.StepperVerticalSeparator>
 *     <StepperVertical.StepperVerticalContent>Etapa Atual</StepperVertical.StepperVerticalContent>
 *   </StepperVertical.StepperVerticalItem>
 * </StepperVertical>
 */
const StepperVertical = ({ children }: PropsWithChildren) => {
    return (
        <MUITimeline sx={{ my: 0, p: 0 }}>{children}</MUITimeline>
    )
}

interface StepperVerticalItemProps {
    isCurrent?: boolean;
    isCompleted?: boolean;
}

const StepperVerticalItemContext = createContext<StepperVerticalItemProps | null>(null)

const useStepperVerticalItemContext = () => useContext(StepperVerticalItemContext)!

const StepperVerticalItem = ({ children, ...rest }: PropsWithChildren<StepperVerticalItemProps>) => {
    return (
        <StepperVerticalItemContext.Provider value={rest}>
            <MUITimelineItem
                sx={{
                    '::before': {
                        flex: 0,
                        padding: 0
                    }
                }}
            >
                {children}
            </MUITimelineItem>
        </StepperVerticalItemContext.Provider>
    )
}

const StepperVerticalSeparator = ({ children }: PropsWithChildren) => {
    return (
        <MUITimelineSeparator>{children}</MUITimelineSeparator>
    )
}

const StepperVerticalConnector = () => {
    return (
        <MUITimelineConnector sx={{ borderWidth: 1, bgcolor: 'divider', minHeight: 104 }} />
    )
}

const StepperVerticalContent = ({ children }: PropsWithChildren) => {
    const { isCurrent, isCompleted } = useStepperVerticalItemContext()
    return (
        <MUITimelineContent sx={{ pt: theme => theme.spacing(1), pl: 1, pr: 0 }}>
            <Typography variant='subtitle2' disabled={!isCurrent && !isCompleted}>
                {children}
            </Typography>
        </MUITimelineContent>
    )
}

const StepperVerticalDot = ({
    children
}: PropsWithChildren) => {
    const { isCurrent, isCompleted } = useStepperVerticalItemContext()
    const isPrimaryVariant = (isCurrent || isCompleted)
    return (
        <MUITimelineDot
            sx={{
                height: theme => theme.spacing(3),
                width: theme => theme.spacing(3),
                color: isPrimaryVariant ? 'white' : 'text.secondary',
                display: 'flex',
                flexShrink: 0,
                flexGrow: 0,
                justifyContent: 'center',
                alignItems: 'center',
                fontWeight: 600,
                fontSize: 14,
                lineHeight: 22 / 14,
                boxShadow: 'none',
                my: theme => theme.spacing(1)
            }}
            color={isPrimaryVariant ? 'primary' : undefined}
        >
            {isCompleted ? <CheckIcon size='small' /> : children}
        </MUITimelineDot>
    )
}

StepperVertical.StepperVerticalItem = StepperVerticalItem
StepperVertical.StepperVerticalSeparator = StepperVerticalSeparator
StepperVertical.StepperVerticalConnector = StepperVerticalConnector
StepperVertical.StepperVerticalContent = StepperVerticalContent
StepperVertical.StepperVerticalDot = StepperVerticalDot

export { StepperVertical }
