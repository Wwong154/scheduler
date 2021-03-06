import React from "react";
import classNames from 'classnames';
import "components/DayListItem.scss";

export default function DayListItem(props) {
  function formatSpots(spots) { //change spot remaining msg
    return spots === 0 ? "no spots remaining" : (spots === 1 ? "1 spot remaining" : spots + " spots remaining"); 
  }

  let spotsLeft = formatSpots(props.spots);
  //change (css style)class base on spot left
  let liClass = classNames('day-list__item', {"day-list__item--selected": props.selected}, {"day-list__item--full" : props.spots === 0});

  return (
    <li className={liClass} onClick={props.setDay} data-testid="day">
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{spotsLeft}</h3>
    </li>
  );
}