import SignUpComponent from '../../components/sign-up-form/sign-up-form.component'

import '../../components/sign-up-form/sign-up-form.styles.scss'
import SignInComponent from '../../components/sign-in-form/sign-in-form.component'
import './authentication.styles.scss'

const Authentication = () => {
  return (
    <div className="authentication-container">
      <SignInComponent />
      <SignUpComponent />
    </div>
  )
}

export default Authentication
