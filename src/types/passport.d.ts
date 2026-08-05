import 'passport-local';

declare module 'passport-local' {
  interface IVerifyOptions {
    message?: string;
    field?: string;
  }
}
