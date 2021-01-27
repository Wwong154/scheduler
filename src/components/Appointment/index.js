import React from "react";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status"
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error"
import { useVisualMode } from "hooks/useVisualMode";
import "components/Appointment/styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
      const interview = {
        student: name,
        interviewer
      };
      transition(SAVING)
      props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE,true));
  }

  function confirm() {
    transition(CONFIRM);
  }

  function cancel() {
    transition(DELETING,true);
    props.cancelInterview(props.id)
    .then(() => transition(EMPTY)) 
    .catch(() => transition(ERROR_DELETE,true));
  }

  function edit() {
    transition(EDIT);
  }

  return <article className="appointment" data-testid="appointment">
    <Header time={props.time} />
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    {mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onEdit={edit}
        onDelete={confirm}
      />
    )}
    {mode === CREATE && (
      <Form
      interviewers={props.interviewers}
      onSave={save}
      onCancel={back}
      />
    )}
    {mode === SAVING && <Status massage="Saving"/>}
    {mode === DELETING && <Status massage="Deleting"/>}
    {mode === CONFIRM && (
      <Confirm
        massage="Are you sure you want to cancel"
        onConfirm={cancel}
        onCancel={back}
      />
    )}
    {mode === EDIT && (
      <Form
        interviewers={props.interviewers}
        name={props.interview.student}
        value={props.interview.interviewer.id}
        onSave={save}
        onCancel={back}
      />
    )}
    { mode === ERROR_SAVE && (
      <Error
      massage="There is a error while saving, pelse try again"
      onClose={back}
      />
    )}
    { mode === ERROR_DELETE && (
      <Error
      massage="There is a error while deleting, pelse try again"
      onClose={back}
      />
    )}
  </article>
}
