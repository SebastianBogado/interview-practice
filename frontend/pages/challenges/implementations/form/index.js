import { Form, Field, Input, Select, Radio, Checkbox, SubmitButton } from './form';

Form.Field = Field;
Form.Input = Input;
Form.Select = Select;
Form.Radio = Radio;
Form.Checkbox = Checkbox;
Form.SubmitButton = SubmitButton;

export { Form as default } from './form';
export { default as useForm } from './useForm';