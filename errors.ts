export const errors: { [key: string]: Error } = {
  user_exists: {
    code: 422,
    error_code: 100,
    locale_key: 'user_exists'
  },
  invalid_credentials: {
    code: 422,
    error_code: 101,
    locale_key: 'invalid_credentials'
  }
};

interface Error {
  code: number;
  error_code: number;
  locale_key: string;
}
