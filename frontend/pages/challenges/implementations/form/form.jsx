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
  const id = useId();
  const [model, , onInputChange] = useContext(FormContext);
  const checked = model[field] === value;
  const onChange = useCallback((e) => {
    return onInputChange(field)(checked ? '' : e.target.value);
  }, [onInputChange, field, model[field], checked]);

  const radioProps = {
    id,
    name: field,
    type: "radio",
    value,
    checked,
    onChange,
    onClick: onChange,
  };

  return (
    <>
      <input {...radioProps} />
      <label htmlFor={id}>{label}</label>
    </>
  );
}

export function Checkbox({ field, value, label }) {
  const id = useId();
  const [model, , onInputChange] = useContext(FormContext);
  const checked = model[field].includes(value);
  const onChange = useCallback((e) => {
    const selectedVal = e.target.value;
    const selectedValues = [...model[field]];
    if (checked) {
      selectedValues.splice(selectedValues.indexOf(selectedVal), 1);
    } else {
      selectedValues.push(selectedVal);
    }

    return onInputChange(field)(selectedValues);
  }, [onInputChange, field, model[field], checked]);

  const checkboxProps = {
    id,
    name: field,
    type: "checkbox",
    value,
    checked,
    onChange,
  };

  return (
    <>
      <input {...checkboxProps} />
      <label htmlFor={id}>{label}</label>
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
      <label htmlFor={field}>{label}</label>
      {children}
      {error && <p className="error">{error}</p>}
    </div>
  );
}