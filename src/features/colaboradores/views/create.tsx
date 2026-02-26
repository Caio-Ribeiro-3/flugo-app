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
import { Select, Option } from "@/core/user-interface/form/select";
import { useNavigate } from "@/core/routing-provider/use-navigate";
import { useMediaQuery } from "@/core/user-interface/use-media-query";
import { windowBreakpoints } from "@/core/user-interface/constants";
import { useForm } from "@/core/user-interface/form/use-form";
import { colaboratorValidator, DEPARTAMENTOS } from "../model";



export const CreateColaboradoresPage = () => {
    const matches = useMediaQuery(windowWidth => windowWidth > windowBreakpoints.sm);

    const navigate = useNavigate()

    const { mutate, isLoading } = useMutation({
        entity: 'colaboradores',
        onSuccess: () => navigate('/'),
    })

    const [step, setStep] = useState(0)
    const { Field, Subscribe, handleSubmit, getAllErrors } = useForm({
        email: '',
        name: '',
        role: '',
        status: true,
    },
        payload => mutate(payload)
    )
    console.log(getAllErrors())
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
                {matches && (
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
                )}
                <Base
                    _css={{
                        flexDirection: 'column',
                        display: 'flex',
                        gap: theme => theme.spacing(3),
                        flexGrow: 1,
                        flexShrink: 0,
                        minHeight: 440,
                        ml: matches ? 5 : 0
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
                    <form
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            flexGrow: 1,
                        }}
                        onSubmit={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            handleSubmit()
                        }}>
                        <Base
                            _css={{
                                flexDirection: 'column',
                                display: !step ? 'flex' : 'none',
                                gap: theme => theme.spacing(3),
                            }}>
                            <Field
                                name="name"
                                validators={{
                                    onChange: ({ value }) => colaboratorValidator.name(value),
                                }}
                                children={(field) => {
                                    return (
                                        <TextInput
                                            id={field.name}
                                            name={field.name}
                                            label='Título'
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            error={field.state.meta.errors[0]}
                                        />
                                    )
                                }}
                            />
                            <Field
                                name="email"
                                validators={{
                                    onChange: ({ value }) => colaboratorValidator.email(value),
                                }}
                                children={(field) => {
                                    return (
                                        <TextInput
                                            id={field.name}
                                            name={field.name}
                                            label='E-mail'
                                            type='email'
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            error={field.state.meta.errors[0]}
                                        />
                                    )
                                }}
                            />
                            <Field
                                name="status"
                                validators={{
                                    onChange: ({ value }) => colaboratorValidator.status(value),
                                }}
                                children={(field) => {
                                    return (
                                        <Switch
                                            id={field.name}
                                            name={field.name}
                                            _css={{ mt: 1 }}
                                            label='Ativar ao criar'
                                            checked={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.checked)}
                                            defaultChecked
                                            error={field.state.meta.errors[0]}
                                        />
                                    )
                                }}
                            />
                        </Base>
                        <Base _css={{ display: step ? undefined : 'none' }}>
                            <Field
                                name="role"
                                validators={{
                                    onChange: ({ value }) => colaboratorValidator.role(value),
                                }}
                                children={(field) => {
                                    return (
                                        <Select
                                            id={field.name}
                                            name={field.name}
                                            disabled={isLoading || step > 1}
                                            label='Selecione um departamento'
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            error={field.state.meta.errors[0]}
                                        >
                                            {DEPARTAMENTOS.map(dep => (
                                                <Option value={dep}>{dep}</Option>
                                            ))}
                                        </Select>
                                    )
                                }}
                            />
                        </Base>
                        <Base _css={{ mt: 'auto', display: 'flex', justifyContent: 'space-between' }}>
                            <Button
                                color="neutral"
                                onClick={() => setStep(0)}
                                variant="text"
                                disabled={!step || isLoading}
                            >
                                Voltar
                            </Button>
                            <Subscribe
                                selector={(state) => [state.canSubmit]}
                                children={([canSubmit]) => (
                                    <Button
                                        disabled={step ? !canSubmit : false}
                                        type={step ? "submit" : 'button'}
                                        onClick={() => {
                                            if (step < 2) {
                                                setStep(prev => prev + 1)
                                            }
                                        }}>
                                        {step ? 'Concluir' : 'Próximo'}
                                    </Button>
                                )}
                            />
                        </Base>
                    </form>
                </Base>
            </Base >
        </Base >
    )
}