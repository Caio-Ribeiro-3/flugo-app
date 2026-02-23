import type { PropsWithChildren } from 'react';

import MUITimeline from '@mui/lab/Timeline';
import MUITimelineItem from '@mui/lab/TimelineItem';
import MUITimelineSeparator from '@mui/lab/TimelineSeparator';
import MUITimelineConnector from '@mui/lab/TimelineConnector';
import MUITimelineContent from '@mui/lab/TimelineContent';
import MUITimelineDot from '@mui/lab/TimelineDot';
import { CheckIcon } from './icons/check';

const StepperVertical = ({ children }: PropsWithChildren) => {
    return (
        <MUITimeline sx={{ my: 0, py: 0 }}>{children}</MUITimeline>
    )
}

const StepperVerticalItem = ({ children }: PropsWithChildren) => {
    return (
        <MUITimelineItem
            sx={{
                '::before': {
                    flex: 0
                }
            }}
        >{children}</MUITimelineItem>
    )
}

const StepperVerticalSeparator = ({ children }: PropsWithChildren) => {
    return (
        <MUITimelineSeparator >{children}</MUITimelineSeparator>
    )
}

const StepperVerticalConnector = () => {
    return (
        <MUITimelineConnector sx={{ borderWidth: 1, bgcolor: 'divider', minHeight: 104 }} />
    )
}

const StepperVerticalContent = ({ children }: PropsWithChildren) => {
    return (
        <MUITimelineContent >{children}</MUITimelineContent>
    )
}

interface TimelineDotProps {
    isCurrent?: boolean;
    isCompleted?: boolean;
}

const StepperVerticalDot = ({
    isCurrent,
    isCompleted,
    children }: PropsWithChildren<TimelineDotProps>) => {
    const isPrimaryVariant = (isCurrent || isCompleted)
    return (
        <MUITimelineDot
            sx={{
                height: theme => theme.spacing(3),
                width: theme => theme.spacing(3),
                color: isPrimaryVariant ? 'white' : undefined,
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
