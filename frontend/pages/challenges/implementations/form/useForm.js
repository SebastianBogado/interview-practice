import { useState } from 'react';
import { isEmpty } from './utils';

export default function useForm(modelDefinition, validations, onSubmit) {
  const [model, setModel] = useState(modelDefinition);
  const [errors, setErrors] = useState({});

  const attemptToSubmit = () => {
    const validationErrors = Object.keys(validations).reduce((accum, field) => {
      try {
        validations[field](model[field]);
      } catch (e) {
        accum[field] = e.message;
      }
      return accum;
    }, {});

    if (isEmpty(validationErrors)) {
      onSubmit(model);
    }
    setErrors(validationErrors);
  }

  return [
    model, 
    errors,
    (field) => (value) => {
      setModel((model) => ({ ...model, [field]: value })); 
      setErrors((errors) => ({ ...errors, [field]: null }));
    },
    attemptToSubmit
  ];
}