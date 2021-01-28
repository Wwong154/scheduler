import React from "react";
/*
A transition page/ loading page
Take in
massage: a string of what the user is trying to do
*/
export default function Status(props) {
  return (
  <main className="appointment__card appointment__card--status">
    <img
      className="appointment__status-image"
      src="images/status.png"
      alt="Loading"
    />
    <h1 className="text--semi-bold">{props.massage}</h1>
  </main>
  )
}
