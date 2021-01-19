import React, { useState } from 'react';
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

export default function Form(props) {
  let [name, setName] = useState(props.name || "");
  let [value, setValue] = useState(props.value || null)

  function reset() {
    setName("");
    setValue(null);
  }

  function cancel() {
    reset();
    props.onCancel();
  }
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            value={name}
            onChange={(ele) => setName(ele.target.value)}
            placeholder="Enter Student Name"
          />
        </form>
        <InterviewerList 
        interviewers={props.interviewers} 
        value={value} 
        onChange={setValue} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={() => cancel()}>Cancel</Button>
          <Button confirm onClick={() => props.onSave(name, value)}>Save</Button>
        </section>
      </section>
    </main>

  )
}
