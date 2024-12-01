# EF - Effortless forms

## Install

```sh
not available yet
```

## About

React hook for building controlled and uncontrolled forms with validation. Highly inspired by Formik, React hook form and Angular ractive forms.

<h4 style="color:red">
    Still in active development / PoC - do not use in prod
</h4>

## How to use

#### Let us first define the fields.

We need to pass an object where the key is the field name and the value is an array. The first element of the array is the default value and the second element is an array of validators

```typescript
const loginForm = useForm(
  {
    email: ['', [required(), email()]],
    password: ['', [required(), minLength(8)]],
  },
  {
    onSubmit(values) {
      // ...
    },
  }
);
```

#### Then we need to pass the generated props

```typescript
return (
  <form {...loginForm.form}>
    <input {...login.field('email')} />
    <input {...login.field('password')} />
    <input type="submit" value={'Sign in'} />
  </form>
);
```

#### Other than text

In most cases we will use the field method, file, radio and checkbox are also available.

```typescript
const loginForm = useForm({
  // other fields
  rememberMe: [false],
});

// ...
<input className="checkbox" {...login.checkbox('rememberMe')} />;
```

#### Validators

To read an error, we can use the get method.

```typescript
login.get('email').errors?.email && <span>Please enter a valid email.</span>;
```

#### Watch

If you need to keep track of field changes, pass the watch option to field

```typescript
{...login.field('email', { watch: true })}
```

## Run tasks

To run the demo app

```sh
npm run dev
```

To build package

```sh
npm run build
```

To run tests

```sh
npm run test
```

To run tests with watch

```sh
npm run test:watch
```
