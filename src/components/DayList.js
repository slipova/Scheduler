import React from "react";
import DayListItem from "./DayListItem";

function DayList(props) {
  const days = Object.values(props.days)
  console.log(props)

  const parsedDays = days.map(item => <DayListItem key={item.id} {...item} />)
  return (
    <ul>
      {parsedDays}
    </ul>
  );
};

export default DayList;