import { Base } from "./base"
import { Typography } from "./typography"

export const NotFound = () => {
    return (
        <Base _css={{ textAlign: 'center' }}>
            <Typography variant="desktop-h4" component="h1" color="text.primary" _css={{ mb: 2 }}>404</Typography>
            <Typography variant="caption" component="p" color="text.secondary">
                Página não encontrada. Verifique se a URL está correta
            </Typography>
        </Base>
    )
}