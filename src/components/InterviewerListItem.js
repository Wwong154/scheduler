import React from "react";
import classNames from 'classnames';
import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {
  //change class if the interviewer is selected
  let liClass = classNames('interviewers__item', {"interviewers__item--selected": props.selected});

  return (
    <li className={liClass} onClick={props.onChange}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected ? props.name : undefined /*give name is the interviwer is selected*/ }
    </li>

  );
}
