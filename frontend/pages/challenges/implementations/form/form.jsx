import { useCallback, createContext, useContext, useId } from 'react';

const FormContext = createContext(null);

export function Form({ form, title, children }) {
  return (
    <FormContext.Provider value={form}>
      <form className="form">
        <fieldset>
          <legend>{title}</legend>
          {children}
        </fieldset>
      </form>
    </FormContext.Provider>
  );
}

export function Input({ field, ...inputProps }) {
  const [model, , onInputChange] = useContext(FormContext);
  const onChange = useCallback((e) => onInputChange(field)(e.target.value), [onInputChange, field]);
  const formInputProps = {
    id: field,
    name: field,
    value: model[field],
    onChange,
  };

  return (
    <input {...formInputProps} {...inputProps} />
  );
}

export function Radio({ field, value, label }) {
  const id = useId("radio");
  const [model] = useContext(FormContext);
  const radioProps = {
    id,
    field,
    type: "radio",
    value,
    checked: model[field] === value,
  };

  return (
    <>
      <Input {...radioProps} />
      <label for={id}>{label}</label>
    </>
  );
}

export function Select({ field, options }) {
  const [model, , onInputChange] = useContext(FormContext);
  const onChange = useCallback((e) => onInputChange(field)(e.target.value), [onInputChange, field]);
  const formInputProps = {
    id: field,
    name: field,
    value: model[field],
    onChange,
  };

  return (
    <select {...formInputProps}>
      { options.map((option) => (<option key={option.key} value={option.value}>{option.label}</option>)) }
    </select>
  );
}

export function SubmitButton({ children }) {
  const [, , , onSubmit] = useContext(FormContext);

  const handleSubmit = useCallback((e) => {
    e.preventDefault(); 
    onSubmit();
  }, [onSubmit]);

  return (
    <button type="submit" onClick={handleSubmit}>{children}</button>
  );
}

export function Field({ field, label, children }) {
  const [, errors] = useContext(FormContext);
  const error = errors[field];
  return (
    <div className={`field${error ? " has-error": ""}`}>
      <label htmlFor={field}>{label}: </label>
      {children}
      {error && <p className="error">{error}</p>}
    </div>
  );
}