import { useState } from 'react';
import Form, { useForm } from '../form';

function validateSingleChoiceQuestion(correctAnswer) {
  return function(answer) {
    if (answer !== correctAnswer) throw new Error('Wrong answer');
    return true;
  }
}
function validateMultipleChoiceQuestion(correctAnswer) {
  return function(answer) {
    if (answer.length !== correctAnswer.length) throw new Error('Wrong answer');
    if (!answer.every((a) => correctAnswer.includes(a))) throw new Error('Wrong answer');
    return true;
  }
}

function Question1() {
  return (
    <Form.Field field="q1" label="Which one is the capital of Spain?">
      <Form.Radio field="q1" value={"op1"} label="Buenos Aires" />
      <Form.Radio field="q1" value={"op2"} label="Caracas" />
      <Form.Radio field="q1" value={"op3"} label="Madrid" /> 
    </Form.Field>
  );
}

function Question2() {
  return (
    <Form.Field field="q2" label="Which of these cities are located in Argentina?">
      <Form.Checkbox field="q2" value={"op1"} label="Buenos Aires" />
      <Form.Checkbox field="q2" value={"op2"} label="Mendoza" />
      <Form.Checkbox field="q2" value={"op3"} label="Madrid" /> 
    </Form.Field>
  );
}

export default function Questionnaire() {
  const [questionnaireSubmitted, setQuestionnaireSubmitted] = useState(false);
  const [score, setScore] = useState();
  const onQuestionnaireSubmit = (model, errors = {}) => {
    setScore(Object.keys(model).length - Object.keys(errors).length);
    setQuestionnaireSubmitted(true);
  };

  const form = useForm({
    q1: '',
    q2: [],
  }, {
    q1: validateSingleChoiceQuestion("op3"),
    q2: validateMultipleChoiceQuestion(["op1", "op2"]),
  },
    onQuestionnaireSubmit,
    onQuestionnaireSubmit,
  );

  return (
    <>
      { questionnaireSubmitted && (<p>Your score was {score}</p>)}
      <Form form={form} title={"Questionnaire"}>
        <Question1 />
        <Question2 />
        <Form.SubmitButton>Submit answers</Form.SubmitButton>
      </Form>
    </>
  );
}