const EMAIL_NOT_UNIQUE = 'This user email has already been registered.'
const EMAIL_NOT_EMAIL_TYPE = 'Email is not an email type.'
const FIELD_REQUIRED = (field: string) => `${field} is required`

export const createUserSchema = {
  rules: {
    email: 'required|email|unique:users:email',
    password: 'required',
    profileId: 'required',
  },
  messages: {
    required: FIELD_REQUIRED,
    'email.unique': EMAIL_NOT_UNIQUE,
    'email.email': EMAIL_NOT_EMAIL_TYPE,
  },
}

export const updateUserSchema = {
  rules: {
    email: 'required|email|unique:users:email',
    password: 'required',
    profileId: 'required',
  },
  messages: {
    required: FIELD_REQUIRED,
    'email.unique': EMAIL_NOT_UNIQUE,
    'email.email': EMAIL_NOT_EMAIL_TYPE,
  },
}
