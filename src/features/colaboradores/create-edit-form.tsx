import { useState } from "react";

import { Button } from '@/core/user-interface/button';
import { Typography } from '@/core/user-interface/typography';
import { Base } from '@/core/user-interface/base';
import { LinearProgress } from "@/core/user-interface/linear-progress";
import { Breadcrumbs } from "@/core/user-interface/breadcrumbs";
import { StepperVertical } from "@/core/user-interface/stepper-vertical";
import { TextInput } from "@/core/user-interface/form/text-input";
import { Switch } from "@/core/user-interface/form/switch";
import { Select, Option } from "@/core/user-interface/form/select";
import { useMediaQuery } from "@/core/user-interface/use-media-query";
import { windowBreakpoints } from "@/core/user-interface/constants";
import { useForm } from "@/core/user-interface/form/use-form";
import { colaboratorValidator, SENIORITY, type Colaborador } from "./model";
import { IDENTITY, type Departamento } from "../departamentos/model";
import { ForeignEntity } from "@/core/entity/foreign/foreign";
import { Skeleton } from "@/core/user-interface/skeleton";
import { useListController } from "@/core/entity/list/list-controller";
import { DateInput } from "@/core/user-interface/form/date-input";



interface CreateEditFormProps {
    initialData?: Colaborador;
    onSubmit(payload: Partial<Colaborador>): void;
    isLoading: boolean;
}

export const CreateEditForm = ({ initialData, onSubmit, isLoading }: CreateEditFormProps) => {
    const { data } = useListController<Colaborador>()
    const matches = useMediaQuery(windowWidth => windowWidth > windowBreakpoints.sm);


    const [step, setStep] = useState(0)

    const { Field, Subscribe, handleSubmit, getAllErrors } = useForm({
        avatar: initialData?.avatar || '',
        email: initialData?.email || '',
        name: initialData?.name || '',
        role: initialData?.role || '',
        status: typeof initialData?.status === 'boolean' ? initialData?.status : true,
        jobTitle: initialData?.jobTitle || '',
        admissionDate: initialData?.admissionDate ? new Date(initialData?.admissionDate) : new Date(),
        seniority: initialData?.seniority,
        manager: initialData?.manager,
        baseWage: initialData?.baseWage,
    },
        payload => {
            !getAllErrors().form.errors.length && onSubmit(payload)
        }
    )

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
                                    onChange: ({ value }) => {
                                        const error = colaboratorValidator.name(value)
                                        if (error) {
                                            setStep(0)
                                        }
                                        return error
                                    },
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
                                    onChange: ({ value }) => {
                                        const error = colaboratorValidator.email(value)
                                        if (error) {
                                            setStep(0)
                                        }
                                        return error
                                    },
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
                        <Base
                            _css={{
                                flexDirection: 'column',
                                display: step ? 'flex' : 'none',
                                gap: theme => theme.spacing(3),
                            }}>
                            <Field
                                name="role"
                                validators={{
                                    onChange: ({ value }) => colaboratorValidator.role(value),
                                }}
                                children={(field) => {
                                    return (
                                        <ForeignEntity<Departamento>
                                            relationship={IDENTITY}
                                        >
                                            {({ data, isLoading }) => isLoading ? (
                                                <Skeleton _css={{ height: 56, width: '100%' }} />
                                            ) : (
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
                                                    {data.map(dep => (
                                                        <Option key={dep.id} value={dep.id}>{dep.name}</Option>
                                                    ))}
                                                </Select>
                                            )}
                                        </ForeignEntity>
                                    )
                                }}
                            />
                            <Field
                                name="jobTitle"
                                validators={{
                                    onChange: ({ value }) => {
                                        return colaboratorValidator.jobTitle(value)
                                    },
                                }}
                                children={(field) => {
                                    return (
                                        <TextInput
                                            id={field.name}
                                            name={field.name}
                                            label='Cargo'
                                            type='text'
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            error={field.state.meta.errors[0]}
                                        />
                                    )
                                }}
                            />
                            <Field
                                name="admissionDate"
                                validators={{
                                    onChange: ({ value }) => {
                                        return colaboratorValidator.admissionDate(value)
                                    },
                                }}
                                children={(field) => {
                                    return (
                                        <DateInput
                                            id={field.name}
                                            name={field.name}
                                            label='Data de Admissao'
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(newDate) => field.handleChange(newDate!)}
                                            error={field.state.meta.errors[0]}
                                        />
                                    )
                                }}
                            />
                            <Field
                                name="seniority"
                                validators={{
                                    onChange: ({ value }) => {
                                        return colaboratorValidator.seniority(value)
                                    },
                                }}
                                children={(field) => {
                                    return (
                                        <Select
                                            id={field.name}
                                            name={field.name}
                                            disabled={isLoading || step > 1}
                                            label='Selecione uma senioridade'
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.value as Colaborador['seniority'])}
                                            error={field.state.meta.errors[0]}
                                        >
                                            {SENIORITY.map(dep => (
                                                <Option value={dep}>{dep}</Option>
                                            ))}
                                        </Select>
                                    )
                                }}
                            />
                            <Field
                                name="manager"
                                validators={{
                                    onChange: ({ value }) => {
                                        return colaboratorValidator.manager(value)
                                    },
                                }}
                                children={(field) => {
                                    return (
                                        <Select
                                            id={field.name}
                                            name={field.name}
                                            disabled={isLoading || step > 1}
                                            label='Selecione um gestor'
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            error={field.state.meta.errors[0]}
                                        >
                                            {data.data.filter(colaborador => colaborador.seniority === 'gestor').map(colaborador => (
                                                <Option value={colaborador.id}>{colaborador.name}</Option>
                                            ))}
                                        </Select>
                                    )
                                }}
                            />
                            <Field
                                name="baseWage"
                                validators={{
                                    onChange: ({ value }) => {
                                        return colaboratorValidator.baseWage(value)
                                    },
                                }}
                                children={(field) => {
                                    return (
                                        <TextInput
                                            disabled={isLoading || step > 1}
                                            id={field.name}
                                            name={field.name}
                                            label='Salario Base'
                                            type='number'
                                            min={0}
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(Number(e.target.value))}
                                            error={field.state.meta.errors[0]}
                                        />
                                    )
                                }}
                            />
                        </Base>
                        <Base _css={{ mt: 'auto', pt: 5, display: 'flex', justifyContent: 'space-between' }}>
                            <Button
                                color="neutral"
                                onClick={() => setStep(0)}
                                variant="text"
                                disabled={!step || isLoading}
                            >
                                Voltar
                            </Button>
                            {step < 1 ? (
                                <Button
                                    type='button'
                                    onClick={() => {
                                        setStep(prev => prev + 1)
                                    }}>
                                    Próximo
                                </Button>
                            ) : (
                                <Subscribe
                                    selector={(state) => [state.canSubmit]}
                                    children={([canSubmit]) => (
                                        <Button
                                            disabled={!canSubmit || isLoading}
                                            type="submit"
                                        >
                                            Concluir
                                        </Button>
                                    )}
                                />
                            )}
                        </Base>
                    </form>
                </Base>
            </Base >
        </Base >
    )
}