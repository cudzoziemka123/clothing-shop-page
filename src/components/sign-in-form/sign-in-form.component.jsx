import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils'
import { useState } from 'react'

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
  console.log(formFields)

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }
  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup()
    await createUserDocumentFromAuth(user)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await signInAuthUserWithEmailAndPassword(email, password)
      console.log(response)
    } catch (error) {
      if (error.code === 'auth/invalid-credential') {
        alert('Password or email are incorrect')
      }
      console.log(error.message)
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
