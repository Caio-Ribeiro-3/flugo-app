import logoURL from '@/assets/logo.svg'
import { useNavigate } from '../routing-provider/use-navigate'



interface LogoProps {
    to?: string;
}

/**
 * Componente de marca visual (Logo).
 * 
 * Centraliza a exibição do logotipo oficial da aplicação, garantindo que
 * o asset correto seja utilizado em toda a plataforma.
 * 
 * @example
 * <Logo />
 */
export const Logo = ({ to }: LogoProps) => {
    const navigate = useNavigate()
    return (
        <img
            src={logoURL}
            alt="Logo da empresa"
            onClick={to ? () => {
                navigate(to)
            } : undefined}
            style={{
                cursor: to ? 'pointer' : undefined
            }}
        />
    )
}