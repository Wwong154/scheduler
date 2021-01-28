import React from "react";
import Button from "components/Button";
/*
Confirmation card, load when user try to cancel appointment
Take in
onCancel: function [back(), shoudl take user back 1 state/page]
onConfirm: function [cancel(), delete appointment, refer to index.js for more detail]
*/
export default function Confirm(props) {
  return (
  <main className="appointment__card appointment__card--confirm">
    <h1 className="text--semi-bold">{props.massage}</h1>
    <section className="appointment__actions">
      <Button danger
       onClick={() => props.onCancel()}
       >Cancel</Button>
      <Button danger
       onClick={() => props.onConfirm()}
       >Confirm</Button>
    </section>
  </main>
  )
}
