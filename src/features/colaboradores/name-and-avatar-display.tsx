import { Avatar } from "@/core/user-interface/avatar"
import { Base } from "@/core/user-interface/base"
import type { Colaborador } from "./model"
import { Skeleton } from "@/core/user-interface/skeleton"

export const NameAndAvatarDisplay = ({ colaborador }: { colaborador: Colaborador }) => {
    return (
        <Base
            _css={{
                display: 'flex',
                gap: theme => theme.spacing(2),
                alignItems: 'center',
                whiteSpace: 'nowrap'
            }}>
            <Avatar src={colaborador.avatar} alt={colaborador.name} />
            {colaborador.name}
        </Base>
    )
}

export const NameAndAvatarSkeleton = () => (
    <Base
        _css={{
            display: 'flex',
            gap: theme => theme.spacing(2),
            alignItems: 'center'
        }}>
        <Skeleton _css={{ flexShrink: 0 }} variant="circular" width={40} height={40} />
        <Skeleton width={150} />
    </Base>
)