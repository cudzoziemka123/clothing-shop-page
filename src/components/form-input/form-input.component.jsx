import { Group, FormInputLabel, Input } from './form-input.styles.jsx'

//TODO Cделать поле ввода контролируемым? проверить
const FormInput = ({ label, ...otherProps }) => {
  return (
    <Group>
      <Input {...otherProps} />
      {label && (
        <FormInputLabel shrink={otherProps.value.length}>
          {label}
        </FormInputLabel>
      )}
    </Group>
  )
}

export default FormInput
