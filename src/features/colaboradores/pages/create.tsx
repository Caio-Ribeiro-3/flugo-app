import { useState } from "react";

import { useMutation } from "@/core/query-provider/use-mutation";

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
import type { Colaborador } from "../model";



const DEPARTAMENTOS = ['Design', 'TI', 'Marketing', 'Produto']

export const CreateColaboradoresPage = () => {
    const navigate = useNavigate()

    const { mutate, isLoading } = useMutation({
        entity: 'colaboradores',
        onSuccess: () => navigate('/'),
    })

    const [step, setStep] = useState(0)
    const [form, setForm] = useState<Partial<Colaborador>>({ status: true })
    // const [errors, setErrors] = useState<Partial<Record<keyof Colaborador, string>>>({})

    return (
        <Base
            _css={{
                display: 'flex',
                flexDirection: 'column',
                pb: theme => theme.spacing(5),
                pt: theme => theme.spacing(2),
            }}>
            <Breadcrumbs>
                <Typography variant="body2" component="span">
                    Colaboradores
                </Typography>
                <Typography disabled={!step} variant="body2" component="span">
                    Cadastrar Colaborador
                </Typography>
            </Breadcrumbs>
            <LinearProgress percentage={step * 50} />
            <Base _css={{ display: 'flex', justifyContent: 'space-between', mt: theme => theme.spacing(5) }}>
                <Base _css={{ mr: 'auto' }}>
                    <StepperVertical>
                        <StepperVertical.StepperVerticalItem isCompleted={!!step} isCurrent={!step}>
                            <StepperVertical.StepperVerticalSeparator>
                                <StepperVertical.StepperVerticalDot>
                                    1
                                </StepperVertical.StepperVerticalDot>
                                <StepperVertical.StepperVerticalConnector />
                            </StepperVertical.StepperVerticalSeparator>
                            <StepperVertical.StepperVerticalContent>
                                Infos Básicas
                            </StepperVertical.StepperVerticalContent>
                        </StepperVertical.StepperVerticalItem>
                        <StepperVertical.StepperVerticalItem isCurrent={!!step} isCompleted={step > 1}>
                            <StepperVertical.StepperVerticalSeparator>
                                <StepperVertical.StepperVerticalDot>
                                    2
                                </StepperVertical.StepperVerticalDot>
                            </StepperVertical.StepperVerticalSeparator>
                            <StepperVertical.StepperVerticalContent>
                                Infos Profissionais
                            </StepperVertical.StepperVerticalContent>
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
                        ml: 5
                    }}>
                    <Typography
                        _css={{
                            mb: theme => theme.spacing(1)
                        }}
                        component="h1"
                        variant="desktop-h4"
                        color='text.secondary'
                    >
                        {!step ? 'Informações Básicas' : 'Informações Profissionais'}
                    </Typography>
                    {!step ? (
                        <>
                            <TextInput
                                label='Título'
                                onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
                                error={!form.name ? 'Voce deve digitar um título' : form.name.length < 4 ? 'Um título deve ter ao menos 5 caracteres' : undefined}
                            />
                            <TextInput
                                label='E-mail'
                                type='email'
                                onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
                                error={!form.email ? 'Voce deve digitar um email' : form.email.length < 4 ? 'Um email deve ter ao menos 5 caracteres' : undefined}
                            />
                            <Switch
                                _css={{ mt: 1 }}
                                label='Ativar ao criar'
                                onChange={e => setForm(prev => ({ ...prev, status: e.target.checked }))}
                            />
                        </>
                    ) : (
                        <Select
                            disabled={isLoading || step > 1}
                            label='Selecione um departamento'
                            onChange={e => setForm(prev => ({ ...prev, role: e.target.value! }))}
                            error={!form.email ? 'Voce deve escolher um departamento' : undefined}
                        >
                            {DEPARTAMENTOS.map(dep => (
                                <Select.Option value={dep}>{dep}</Select.Option>
                            ))}
                        </Select>
                    )}
                    <Base _css={{ mt: 'auto', display: 'flex', justifyContent: 'space-between' }}>
                        <Button color="neutral" onClick={() => setStep(0)} variant="text" disabled={!step || isLoading}>
                            Voltar
                        </Button>
                        <Button
                            disabled={isLoading}
                            onClick={() => {
                                if (step < 2) {
                                    setStep(prev => prev + 1)
                                }
                                if (step) {
                                    mutate(form)
                                }
                            }}>
                            {step ? 'Concluir' : 'Próximo'}
                        </Button>
                    </Base>
                </Base>
            </Base>
        </Base>
    )
}