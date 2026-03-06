import { Link } from "../routing-provider/Link"
import { Base } from "../user-interface/base"
import { Button } from "../user-interface/button"
import { windowBreakpoints } from "../user-interface/constants"
import { useTheme } from "../user-interface/context-provider"
import { TextInput } from "../user-interface/form/text-input"
import { useForm } from "../user-interface/form/use-form"
import { Typography } from "../user-interface/typography"
import { useMediaQuery } from "../user-interface/use-media-query"
import { authValidators } from "./types"
import { useRegister } from "./use-register"

export const RegisterForm = () => {
    const theme = useTheme()
    const { register, isLoading } = useRegister()
    const matches = useMediaQuery(windowWidth => windowWidth > windowBreakpoints.sm)


    const { Field, handleSubmit, getAllErrors } = useForm({
        email: '',
        password: '',
        confirmPassword: '',
    },
        payload => {
            if (!getAllErrors().form.errors.length) {
                register({
                    email: payload.email,
                    password: payload.password
                })
            }
        }
    )
    return (
        <form
            style={{
                width: '100%',
                maxWidth: windowBreakpoints.sm
            }}
            onSubmit={e => {
                e.preventDefault()
                e.stopPropagation()
                handleSubmit()
            }}>

            <Base
                _css={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    flex: 1,
                    p: matches ? 4 : 2,
                    borderRadius: 4,
                    boxShadow: theme.boxShadow.light,
                }}
            >
                <Typography
                    _css={{
                        mb: theme => theme.spacing(1)
                    }}
                    component="h1"
                    variant="desktop-h4"
                >
                    Registre-se
                </Typography>
                <Field
                    name="email"
                    validators={{
                        onChange: ({ value }) => {
                            return authValidators.email(value)
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
                    name="password"
                    validators={{
                        onChange: ({ value }) => {
                            return authValidators.password(value)
                        },
                    }}
                    children={(field) => {
                        return (
                            <TextInput
                                id={field.name}
                                name={field.name}
                                label='Senha'
                                type='password'
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.target.value)}
                                error={field.state.meta.errors[0]}
                            />
                        )
                    }}
                />
                <Field
                    name="confirmPassword"
                    validators={{
                        onChange: ({ value, fieldApi }) => {
                            return authValidators.confirmPassword(value, fieldApi.form.state.values.password)
                        },
                    }}
                    children={(field) => {
                        return (
                            <TextInput
                                id={field.name}
                                name={field.name}
                                label='Repetir Senha'
                                type='password'
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.target.value)}
                                error={field.state.meta.errors[0]}
                            />
                        )
                    }}
                />
                <div>
                    <Link to='/login'>Já tem uma conta? Faça login agora!</Link>
                    <Button disabled={isLoading} type="submit" _css={{ mt: 2, width: '100%' }}>
                        Registrar
                    </Button>
                </div>
            </Base>
        </form>
    )
}