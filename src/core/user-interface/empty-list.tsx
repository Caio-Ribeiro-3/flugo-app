import { Base } from "./base"
import { Typography } from "./typography"

export const EmptyList = () => {
    return (
        <Base _css={{ p: 4 }}>
            <Typography variant="body1">
                Parece que não foi possível buscar os dados ou eles não existem. Tente novamente mais tarde
            </Typography>
        </Base>
    )
}