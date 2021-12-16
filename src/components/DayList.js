import React from "react";
import DayListItem from "./DayListItem";

function DayList(props) {

  const parsedDays = props.days.map(item => <DayListItem key={item["id"]} {...item} setDay={props.onChange} selected={item.name === props.value} />);

  return (
    <ul>
      {parsedDays}
    </ul>
  );
};

export default DayList;