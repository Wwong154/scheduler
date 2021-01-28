import React from "react";
import DayListItem from "components/DayListItem";
//load all day available
export default function DayList(props) {
  return (
    <ul>
      {
        props.days.map(day => {
          return <DayListItem 
            key={day.id}
            name={day.name} 
            spots={day.spots} 
            selected={day.name === props.day}
            setDay={() => props.setDay(day.name)}  />
        })
      }
    </ul>
  );
}