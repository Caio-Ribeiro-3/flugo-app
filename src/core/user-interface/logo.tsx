import logoURL from '@/assets/logo.svg'



/**
 * Componente de marca visual (Logo).
 * 
 * Centraliza a exibição do logotipo oficial da aplicação, garantindo que
 * o asset correto seja utilizado em toda a plataforma.
 * 
 * @example
 * <Logo />
 */
export const Logo = () => {
    return <img src={logoURL} />
}