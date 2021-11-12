import * as yup from 'yup'

const validations = yup.object().shape({
  email: yup
    .string()
    .email('Geçerli bir e-posta adresi giriniz.')
    .required('Zorunlu alan.'),
  password: yup
    .string()
    .min(4, 'Parolanız en az 4 karakter olmalıdır')
    .required('Zorunlu alan.'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password')], 'Parolalar uyuşmuyor.')
    .required('Zorunlu alan.'),
})

export default validations
