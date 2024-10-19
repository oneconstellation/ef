import { minLength, required, useForm, email } from '@oneconstellation/ef';

export const LoginDemoPage = () => {
  const login = useForm(
    {
      login: ['', [required(), email()]],
      password: ['', [required(), minLength(3)]],
    },
    {
      onSubmit(values) {
        console.log(values);
      },
    }
  );
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-6">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-semibold">Sign In</h1>
        <p className="text-sm">Sign in to access your account</p>
      </div>
      <form className="form-group" {...login.form}>
        <div className="form-field">
          <label className="form-label">Email address</label>

          <input placeholder="Type here" type="email" className="input max-w-full" {...login.field('login')} />
          <label className="form-label">
            <span className="form-label-alt">Please enter a valid email.</span>
          </label>
        </div>
        <div className="form-field">
          <label className="form-label">Password</label>
          <div className="form-control">
            <input placeholder="Type here" type="password" className="input max-w-full" {...login.field('password')} />
          </div>
        </div>
        <div className="form-field">
          <div className="form-control justify-between">
            <div className="flex gap-2">
              <input type="checkbox" className="checkbox" />
              <a href="#">Remember me</a>
            </div>
            <label className="form-label">
              <a className="link link-underline-hover link-primary text-sm">Forgot your password?</a>
            </label>
          </div>
        </div>
        <div className="form-field pt-5">
          <div className="form-control justify-between">
            <input type="submit" className="btn btn-primary w-full" value={'Sign in'} />
          </div>
        </div>

        <div className="form-field">
          <div className="form-control justify-center">
            <a className="link link-underline-hover link-primary text-sm">Don't have an account yet? Sign up.</a>
          </div>
        </div>
      </form>
    </div>
  );
};
