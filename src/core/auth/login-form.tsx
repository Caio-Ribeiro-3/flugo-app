import { Link } from "../routing-provider/Link"
import { Base } from "../user-interface/base"
import { Button } from "../user-interface/button"
import { windowBreakpoints } from "../user-interface/constants"
import { useTheme } from "../user-interface/context-provider"
import { TextInput } from "../user-interface/form/text-input"
import { Typography } from "../user-interface/typography"
import { useMediaQuery } from "../user-interface/use-media-query"
import { useLogin } from "./use-login"

export const LoginForm = () => {
    const theme = useTheme()
    const { login, isLoading } = useLogin()
    const matches = useMediaQuery(windowWidth => windowWidth > windowBreakpoints.sm)

    return (
        <form
            style={{
                width: '100%',
                maxWidth: windowBreakpoints.sm
            }}
            onSubmit={e => {
                e.preventDefault()
                const form = new FormData(e.currentTarget)
                login({
                    email: String(form.get('email')),
                    password: String(form.get('password'))
                })
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
                    Entrar
                </Typography>
                <TextInput disabled={isLoading} id='email' name='email' label='E-mail' type="email" />
                <TextInput disabled={isLoading} id='password' name='password' label='Senha' type='password' />
                <div>
                    <Link to='/register'>Ainda não tem uma conta? Crie agora!</Link>
                    <Button disabled={isLoading} type="submit" _css={{ mt: 2, width: '100%' }}>
                        Login
                    </Button>
                </div>
            </Base>
        </form>
    )
}