import { LoginForm } from "@/core/auth/login-form"
import { Unauthenticated } from "@/core/auth/unauthenticated"

export const LoginPage = () => {
    return (
        <Unauthenticated>
            <LoginForm />
        </Unauthenticated>
    )
}