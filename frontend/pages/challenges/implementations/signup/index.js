import Form, { useForm } from '../form';

// validations and patterns need to be refined
const emailPattern = /.*@.*\.com/;
const passwordPattern = /[!#$%&'*+-/=?^_`{|}~;.,]/;
function validateEmail(email) {
  if (!email) throw new Error('Email cannot be empty');
  if (emailPattern.test(email)) throw new Error('Email must have an “@” and the domain side must include a “.”');

  return true;
}

function validatePassword(password) {
  if (!password) throw new Error('Password cannot be empty');
  if (password.length < 8)  throw new Error('Password needs to be at least 8 characters');
  if (passwordPattern.test(password))  throw new Error('Password needs to have at least one character and one number');

}

function Email() {
  return (
    <Form.Field field="email" label="Email">
      <Form.Input field="email" />
    </Form.Field>
  );
}

function Password() {
  return (
    <Form.Field field="password" label="Password">
      <Form.Input field="password" />
    </Form.Field>
  );
}
export default function SignupForm() {
  const form = useForm({
    email: '',
    password: '',
  }, {
    email: validateEmail,
    password: validatePassword,
  },
    console.log
  );

  return (
    <Form form={form} title={"Signup"}>
      <Email />
      <Password />
      <Form.SubmitButton>Signup!</Form.SubmitButton>
    </Form>
  );
}