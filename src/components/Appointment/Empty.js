import React from "react";
/*
Empty spot for user to add appointment
Take in
onAdd: function [transition(), should change state and take user to CREATE state/Form.js]
*/
export default function Empty(props) {
  return (
    <main className="appointment__add">
      <img
        className="appointment__add-button"
        src="images/add.png"
        alt="Add"
        onClick={props.onAdd}
      />
    </main>
  )
}
