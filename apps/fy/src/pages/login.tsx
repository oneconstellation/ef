import { minLength, required, useForm, email } from '@oneconstellation/ef';
import cn from 'classnames';

export const LoginDemoPage = () => {
  const login = useForm(
    {
      login: ['', [required(), email()]],
      password: ['', [required(), minLength(3)]],
      rememberMe: [false],
    },
    {
      onSubmit(values) {
        console.log(values);
      },
    }
  );
  return (
    <div className="flex max-w-full w-full card bg-backgroundSecondary">
      <div className="card-body flex flex-col gap-4 w-full">
        <div>
          <h1 className="text-3xl font-semibold mb-3">Demo</h1>
          <div className="card">
            <div className="card-body">
              <div className="mx-auto flex w-full max-w-sm flex-col gap-6">
                <div className="flex flex-col items-center">
                  <h1 className="text-3xl font-semibold">Sign In</h1>
                  <p className="text-sm">Sign in to access your account</p>
                </div>
                <form className="form-group" {...login.form}>
                  <div className="form-field">
                    <label className="form-label">Email address</label>
                    <input
                      placeholder="Type here"
                      type="email"
                      className={cn('input max-w-full', { 'input-error': login.get('login').errors?.email })}
                      {...login.field('login')}
                    />
                    {login.get('login').errors?.email && (
                      <label className="form-label">
                        <span className="form-label-alt text-error">Please enter a valid email.</span>
                      </label>
                    )}
                  </div>
                  <div className="form-field">
                    <label className="form-label">Password</label>
                    <div className="form-control">
                      <input
                        placeholder="Type here"
                        type="password"
                        className="input max-w-full"
                        {...login.field('password')}
                      />
                    </div>
                  </div>
                  <div className="form-field">
                    <div className="form-control justify-between">
                      <div className="flex gap-2">
                        <input className="checkbox" {...login.checkbox('rememberMe')} />
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
                      <a className="link link-underline-hover link-primary text-sm">
                        Don't have an account yet? Sign up.
                      </a>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-semibold mb-3">Output</h1>
          <code className="kbd block whitespace-pre overflow-hidden">{JSON.stringify(login.all, null, 4)}</code>
        </div>
      </div>
    </div>
  );
};
