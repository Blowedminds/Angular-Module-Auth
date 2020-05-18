export const errors: { [key: string]: Error } = {
  user_exists: {
    code: 422,
    error_code: 100,
    locale_key: 'user_exists'
  }
};

interface Error {
  code: number;
  error_code: number;
  locale_key: string;
}
