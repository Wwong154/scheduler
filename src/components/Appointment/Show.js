import React from "react";
/*
Show appointment info if the spot is taken
User can cancel / edit the appointment
Take in
student: name of student
interviewer: interviewer that is booked
onEdit: function [edit(), take user to the Form.js page for edit]
onDelete: function [confirm(), take user to Confirm.js page to make sure they want to cancel appointment ]
*/
export default function Show(props) {
  return (
    <main className="appointment__card appointment__card--show">
      <section className="appointment__card-left">
        <h2 className="text--regular">{props.student}</h2>
        <section className="interviewer">
          <h4 className="text--light">Interviewer</h4>
          <h3 className="text--regular">{props.interviewer.name}</h3>
        </section>
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <img
            className="appointment__actions-button"
            src="images/edit.png"
            alt="Edit"
            onClick={props.onEdit}
          />
          <img
            className="appointment__actions-button"
            src="images/trash.png"
            alt="Delete"
            onClick={() => props.onDelete()}
          />
        </section>
      </section>
    </main>
  )
}
