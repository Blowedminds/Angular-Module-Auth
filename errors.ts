export const errors: { [key: number]: Error } = {
  100: {
    code: 100,
    locale_key: 'user_already_exist'
  }
};

interface Error {
  code: number;
  locale_key: string;
};
