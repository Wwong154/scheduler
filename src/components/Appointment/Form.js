import React, { useState } from 'react';
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";
/*
Where user will edit / make appointment
When creating, take in:
interviewers: list of interviewers of the day
onSave: function [save(name, interviewer), takes student name and interviewer name and craete new interview for time slot, refer to index.js for detail]
onCancel: function [back(), should take user back 1 page/state]

When editing, also take in the following:
name: The student name that why in db for this appointment
value: The interviewer that is booked for this appointment
*/
export default function Form(props) {
  let [name, setName] = useState(props.name || "");
  let [value, setValue] = useState(props.value || null);
  const [error, setError] = useState("");

  function reset() { //clear name
    setName("");
    setValue(null);
  }

  function cancel() { //call on reset then take user back
    reset();
    props.onCancel();
  }

  function validate() { 
    if (name === "") {//check if user fill in name
      setError("Student name cannot be blank");
      return;
    }
    if (!value) {//check if user select a interviewer
      setError("Please select a interviewer");
      return;
    }
    setError("");//clear error field
    props.onSave(name, value);
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
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList 
        interviewers={props.interviewers} 
        value={value} 
        onChange={setValue} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={() => cancel()}>Cancel</Button>
          <Button confirm onClick={() => validate()}>Save</Button>
        </section>
      </section>
    </main>

  )
}
