import userURL from '@/assets/user.svg'
import { withImageAdapter } from './adapters/img-adapter'

export const UserIcon = withImageAdapter((props) => <img src={userURL} {...props} />)