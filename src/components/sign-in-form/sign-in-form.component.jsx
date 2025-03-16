import { useState } from 'react'
import {
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils'

import FormInput from '../form-input/form-input.component'
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component'

import { SignUpContainer, ButtonsContainer } from './sign-in-form.styles.jsx'

const defaultFormFields = {
  email: '',
  password: '',
}
const SignInComponent = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { email, password } = formFields

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const signInWithGoogle = async () => {
    try {
      await signInWithGooglePopup()
    } catch (error) {
      //TODO Closed poppup by user error!!!!
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await signInAuthUserWithEmailAndPassword(email, password)
    } catch (error) {
      if (error.code === 'auth/invalid-credential') {
        alert('Password or email are incorrect')
      }
    }
    resetFormFields()
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormFields({ ...formFields, [name]: value })
  }

  return (
    <SignUpContainer>
      <h2>Already have account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}></FormInput>

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}></FormInput>

        <ButtonsContainer>
          <Button type="submit">Sign in </Button>
          <Button
            type="button"
            onClick={signInWithGoogle}
            buttonType={BUTTON_TYPE_CLASSES.google}>
            Google sign in
          </Button>
        </ButtonsContainer>
      </form>
    </SignUpContainer>
  )
}
export default SignInComponent
