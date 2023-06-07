const NAME_NOT_UNIQUE = 'This profile name has already been registered.'
const FIELD_REQUIRED = (field: string) => `${field} is required`

export const createProfileSchema = {
  rules: {
    name: 'required|unique:profiles:name',
  },
  messages: {
    required: FIELD_REQUIRED,
    'name.unique': NAME_NOT_UNIQUE,
  },
}

export const updateProfileSchema = {
  rules: {
    name: 'required|unique:profiles:name',
  },
  messages: {
    required: FIELD_REQUIRED,
    'name.unique': NAME_NOT_UNIQUE,
  },
}
