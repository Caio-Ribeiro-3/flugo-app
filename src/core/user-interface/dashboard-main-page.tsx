import { Button } from '@/core/user-interface/button';
import { Typography } from '@/core/user-interface/typography';
import { Base } from '@/core/user-interface/base';

import { useNavigate } from "@/core/routing-provider/use-navigate";

import { useMediaQuery } from "@/core/user-interface/use-media-query";
import type { PropsWithChildren } from 'react';
import { windowBreakpoints } from './constants';


interface DashboardMainPageProps {
    title: string;
    createButtonText: string;
}

export const DashboardMainPage = ({ title, createButtonText, children }: PropsWithChildren<DashboardMainPageProps>) => {
    const matches = useMediaQuery(windowWidth => windowWidth > windowBreakpoints.sm);
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
                    {title}
                </Typography>
                <Button onClick={() => navigate('create')}>
                    {createButtonText}
                </Button>
            </Base>
            {children}
        </>
    )
}