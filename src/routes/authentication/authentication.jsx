import SignUpComponent from '../../components/sign-up-form/sign-up-form.component'

import '../../components/sign-up-form/sign-up-form.styles.jsx'
import SignInComponent from '../../components/sign-in-form/sign-in-form.component'
import { AuthenticationContainer } from './authentication.styles'

const Authentication = () => {
  return (
    <AuthenticationContainer>
      <SignInComponent />
      <SignUpComponent />
    </AuthenticationContainer>
  )
}

export default Authentication
