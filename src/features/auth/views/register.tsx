import { RegisterForm } from "@/core/auth/register-form"
import { Unauthenticated } from "@/core/auth/unauthenticated"

export const RegisterPage = () => {
    return (
        <Unauthenticated>
            <RegisterForm />
        </Unauthenticated>
    )
}