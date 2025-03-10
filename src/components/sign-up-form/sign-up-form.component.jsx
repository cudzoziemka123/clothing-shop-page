import { useState } from 'react'

import { createAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils'

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
}

const SignUpComponent = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { displayName, email, password, confirmPassword } = formFields
  console.log(formFields)
  const handleSubmit = async (event) => {
    event.preventDefault()

    if (password !== confirmPassword) {
      alert('password do not match!')
      return
    }

    try {
      const response = await createAuthUserWithEmailAndPassword(email, password)
      console.log(response)
    } catch (error) {
      console.log(error.message)
    }
  }
  const handleChange = (event) => {
    const { name, value } = event.target
    setFormFields({ ...formFields, [name]: value })
  }

  return (
    <>
      <h1>Sign up with your email and password</h1>
      <form onSubmit={() => {}}>
        <label>Display</label>
        <input
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}></input>
        <label>Email</label>
        <input
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}></input>
        <label>Password</label>
        <input
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}></input>
        <label>Confirm Password</label>
        <input
          type="password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}></input>
        <button type="submit">Sign Up</button>
      </form>
    </>
  )
}

export default SignUpComponent
