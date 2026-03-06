import { useState } from "react";

import { Button } from '@/core/user-interface/button';
import { Typography } from '@/core/user-interface/typography';
import { Base } from '@/core/user-interface/base';
import { TextInput } from "@/core/user-interface/form/text-input";
import { Select, Option } from "@/core/user-interface/form/select";
import { useMediaQuery } from "@/core/user-interface/use-media-query";
import { windowBreakpoints } from "@/core/user-interface/constants";
import { useForm } from "@/core/user-interface/form/use-form";
import { departamentValidator, type Departamento } from "../departamentos/model";
import { ForeignEntity } from "@/core/entity/foreign/foreign";
import { Skeleton } from "@/core/user-interface/skeleton";
import { IDENTITY, type Colaborador } from "../colaboradores/model";



interface CreateEditFormProps {
    initialData?: Departamento;
    onSubmit(payload: Partial<Departamento>): void;
    isLoading: boolean;
}

export const CreateEditForm = ({ initialData, onSubmit, isLoading }: CreateEditFormProps) => {
    const matches = useMediaQuery(windowWidth => windowWidth > windowBreakpoints.sm);


    const [step] = useState(0)

    const { Field, Subscribe, handleSubmit, getAllErrors } = useForm({
        name: initialData?.name || '',
        employees: initialData?.employees || [],
        owner: initialData?.owner,
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
            <Base _css={{ display: 'flex', justifyContent: 'space-between', mt: theme => theme.spacing(5) }}>
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
                        Informações Básicas
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
                                        return departamentValidator.name(value)
                                    },
                                }}
                                children={(field) => {
                                    return (
                                        <TextInput
                                            id={field.name}
                                            name={field.name}
                                            label='Nome'
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            error={field.state.meta.errors[0]}
                                        />
                                    )
                                }}
                            />
                            <Field
                                name="owner"
                                validators={{
                                    onChange: ({ value }) => departamentValidator.owner(value),
                                }}
                                children={(field) => {
                                    return (
                                        <ForeignEntity<Colaborador>
                                            relationship={IDENTITY}
                                        >
                                            {({ data, isLoading }) => isLoading ? (
                                                <Skeleton _css={{ height: 56, width: '100%' }} />
                                            ) : (
                                                <Select
                                                    id={field.name}
                                                    name={field.name}
                                                    disabled={isLoading}
                                                    label='Selecione um gestor'
                                                    value={field.state.value}
                                                    onBlur={field.handleBlur}
                                                    onChange={(e) => field.handleChange(e.target.value)}
                                                    error={field.state.meta.errors[0]}
                                                >
                                                    {data.filter(colaborador => colaborador.seniority === 'gestor').map(colaborador => (
                                                        <Option key={colaborador.id} value={colaborador.id}>{colaborador.name}</Option>
                                                    ))}
                                                </Select>
                                            )}
                                        </ForeignEntity>
                                    )
                                }}
                            />
                            <Field
                                name="employees"
                                validators={{
                                    onChange: ({ value }) => departamentValidator.employees(value),
                                }}
                                children={(field) => {
                                    return (
                                        <ForeignEntity<Colaborador>
                                            relationship={IDENTITY}
                                        >
                                            {({ data, isLoading }) => isLoading ? (
                                                <Skeleton _css={{ height: 56, width: '100%' }} />
                                            ) : (
                                                <Select
                                                    id={field.name}
                                                    name={field.name}
                                                    disabled={isLoading}
                                                    label='Selecione colaboradores'
                                                    value={field.state.value}
                                                    multiple
                                                    onBlur={field.handleBlur}
                                                    onChange={(e) => {
                                                        const value = e.target.value
                                                        field.handleChange(typeof value === 'string' ? value.split(',') : value)
                                                    }}
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
                        </Base>
                        <Base _css={{ mt: 'auto', pt: 5, display: 'flex', justifyContent: 'flex-end' }}>
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
                        </Base>
                    </form>
                </Base>
            </Base >
        </Base >
    )
}