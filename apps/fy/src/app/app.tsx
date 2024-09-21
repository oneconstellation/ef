import { useForm, minLength, maxLength, required } from '@lib/f';

export function App() {
  const f = useForm({
    drone: ['dewey'],
    name: ['Tom', [minLength(5), maxLength(10)]],
    nameDisabled: ['Disabled on init', [], { disabled: true }],
    scales: [],
    horns: [true],
    head: ['#e66465'],
    trip: ['2018-07-22'],
    meeting: ['2018-06-12T19:30'],
    email: [''],
    file: [],
    month: ['2024-10'],
    number: [2],
    password: [],
    range: [],
  });

  const ff = useForm(
    {
      login: ['', [required(), minLength(3)]],
      password: ['', [required(), minLength(3)]],
    },
    {
      onSubmit(values) {
        console.log(values);
      },
    }
  );

  return (
    <main className="container">
      <form {...ff.form}>
        <input type="text" placeholder="login" {...ff.field('login')} autoComplete={'username'} />
        <input type="password" placeholder="password" {...ff.field('password')} autoComplete="current-password" />
        <input type="submit" />
      </form>
      <fieldset>
        <legend>dump</legend>
        <pre>
          <code style={{ whiteSpace: 'normal' }}>{JSON.stringify(f.get('name'))}</code>
        </pre>
      </fieldset>
      <div>
        <form>
          <fieldset>
            <legend>text</legend>
            <div>
              <input {...f.field('name')} placeholder={'name'} autoComplete="username" />
            </div>
            <div>
              <input {...f.field('nameDisabled')} autoComplete="username" />
              <button type="button" onClick={() => f.get('nameDisabled').disable()}>
                disable
              </button>
              <button type="button" onClick={() => f.get('nameDisabled').enable()}>
                enable
              </button>
            </div>
          </fieldset>

          <fieldset>
            <legend>password</legend>
            <input {...f.field('password')} placeholder={'password'} type="password" autoComplete="current-password" />
          </fieldset>

          <fieldset>
            <legend>email</legend>
            <input placeholder={'email'} type="email" {...f.field('email')} />
          </fieldset>

          <fieldset>
            <legend>number</legend>
            <input {...f.field('number')} placeholder={'number'} type="number" />
          </fieldset>

          <fieldset>
            <legend>color</legend>
            <input type="color" id="head" {...f.field('head')} />
            <label htmlFor="head">Head</label>
          </fieldset>

          <fieldset>
            <legend>Date</legend>
            <div>
              <input {...f.field('trip')} type="date" />
            </div>
            <div>
              <input {...f.field('meeting')} type="datetime-local" />
            </div>
            <div>
              <input {...f.field('month')} type="month" />
            </div>
          </fieldset>

          <fieldset>
            <legend>Radio</legend>

            <div>
              <input {...f.radio('drone', 'huey')} id="huey" />
              <label htmlFor="huey">Huey</label>
            </div>

            <div>
              <input {...f.radio('drone', 'dewey')} id="dewey" />
              <label htmlFor="dewey">Dewey</label>
            </div>

            <div>
              <input {...f.radio('drone', 'louie')} id="louie" />
              <label htmlFor="louie">Louie</label>
            </div>
          </fieldset>

          <fieldset>
            <legend>checkbox</legend>

            <div>
              <input {...f.checkbox('scales')} id="scales" />
              <label htmlFor="scales">Scales</label>
            </div>

            <div>
              <input {...f.checkbox('horns')} id="horns" />
              <label htmlFor="horns">Horns</label>
            </div>
          </fieldset>

          <fieldset>
            <legend>file</legend>
            <input type="file" {...f.field('file')} />
          </fieldset>

          <fieldset>
            <legend>range</legend>
            <input type="range" {...f.field('range')} />
          </fieldset>
        </form>
      </div>
    </main>
  );
}
