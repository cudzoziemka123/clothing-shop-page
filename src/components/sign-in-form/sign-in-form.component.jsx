import { useState } from 'react'
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils'

import FormInput from '../form-input/form-input.component'

import Button from '../button/button.component'

import './sign-in-form.styles.scss'

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
    await signInWithGooglePopup()
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const user = await signInAuthUserWithEmailAndPassword(email, password)
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
    <div className="sign-up-container">
      <h2>Already have account</h2>
      <span>Sign up with your email and password</span>
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

        <div className="buttons-container">
          <Button type="submit">Sign in </Button>
          <Button type="button" onClick={signInWithGoogle} buttonType="google">
            Google sign in
          </Button>
        </div>
      </form>
    </div>
  )
}
export default SignInComponent
