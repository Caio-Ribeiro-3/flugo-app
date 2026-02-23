import { useState } from "react";

import { useMutation } from "@/core/query-provider/context-provider";

import { Button } from '@/core/user-interface/button';
import { Typography } from '@/core/user-interface/typography';
import { Base } from '@/core/user-interface/base';
import { LinearProgress } from "@/core/user-interface/linear-progress";
import { Breadcrumbs } from "@/core/user-interface/breadcrumbs";
import { StepperVertical } from "@/core/user-interface/stepper-vertical";
import { TextInput } from "@/core/user-interface/form/text-input";
import { Switch } from "@/core/user-interface/form/switch";
import { Select } from "@/core/user-interface/form/select";
import { useNavigate } from "@/core/routing-provider/use-navigate";



const DEPARTAMENTOS = ['Design', 'TI', 'Marketing', 'Produto']

export const CreateColaboradoresPage = () => {
    const navigate = useNavigate()
    const { mutate, isLoading } = useMutation({
        entity: 'colaboradores',
        onSuccess: () => navigate('/'),
    })
    const [step, setStep] = useState(0)
    return (
        < >
            <Base
                _css={{
                    display: 'flex',
                    flexDirection: 'column',
                    pb: theme => theme.spacing(5),
                    pt: theme => theme.spacing(2),
                }}>
                <Breadcrumbs>
                    <Typography _css={{ fontSize: 14 }} variant="body1" component="span">
                        Colaboradores
                    </Typography>
                    <Typography _css={{ fontSize: 14, color: 'text.secondary' }} variant="body1" component="span">
                        Cadastrar Colaborador
                    </Typography>
                </Breadcrumbs>
                <LinearProgress percentage={step * 50} />
                <Base _css={{ display: 'flex', justifyContent: 'space-between', mt: theme => theme.spacing(5) }}>
                    <Base _css={{ mr: 'auto' }}>
                        <StepperVertical>
                            <StepperVertical.StepperVerticalItem>
                                <StepperVertical.StepperVerticalSeparator>
                                    <StepperVertical.StepperVerticalDot isCompleted={!!step} isCurrent={!step}>1</StepperVertical.StepperVerticalDot>
                                    <StepperVertical.StepperVerticalConnector />
                                </StepperVertical.StepperVerticalSeparator>
                                <StepperVertical.StepperVerticalContent>Infos Básicas</StepperVertical.StepperVerticalContent>
                            </StepperVertical.StepperVerticalItem>
                            <StepperVertical.StepperVerticalItem>
                                <StepperVertical.StepperVerticalSeparator>
                                    <StepperVertical.StepperVerticalDot isCurrent={!!step} isCompleted={step > 1}>2</StepperVertical.StepperVerticalDot>
                                </StepperVertical.StepperVerticalSeparator>
                                <StepperVertical.StepperVerticalContent>Infos Profissionais</StepperVertical.StepperVerticalContent>
                            </StepperVertical.StepperVerticalItem>
                        </StepperVertical>
                    </Base>
                    <Base
                        _css={{
                            flexDirection: 'column',
                            display: 'flex',
                            gap: theme => theme.spacing(3),
                            flexGrow: 1,
                            flexShrink: 0,
                            minHeight: 440,
                        }}

                    >
                        <Typography
                            _css={{
                                mb: theme => theme.spacing(1)
                            }}
                            component="h1"
                            variant="h4"
                            color='text.secondary'
                        >
                            {!step ? 'Informações Básicas' : 'Informações Profissionais'}
                        </Typography>
                        {!step ? (
                            <>
                                <TextInput label='Título' />
                                <TextInput label='E-mail' type='email' />
                                <Switch _css={{ mt: 1 }} label='Ativar ao criar' />
                            </>
                        ) : (
                            <Select
                                disabled={isLoading || step > 1}
                                label='Selecione um departamento'
                            >
                                {DEPARTAMENTOS.map(dep => (
                                    <Select.MenuItem value={dep}>{dep}</Select.MenuItem>
                                ))}
                            </Select>
                        )}
                        <Base _css={{ mt: 'auto', display: 'flex', justifyContent: 'space-between' }}>
                            <Button onClick={() => setStep(0)} variant="text" disabled={!step || isLoading}>
                                Voltar
                            </Button>
                            <Button
                                disabled={isLoading}
                                onClick={() => {
                                    if (step < 2) {
                                        setStep(prev => prev + 1)
                                    }
                                    if (!!step) {
                                        mutate({})
                                    }
                                }}>
                                {step ? 'Concluir' : 'Próximo'}
                            </Button>
                        </Base>
                    </Base>
                </Base>
            </Base>
        </>
    )
}