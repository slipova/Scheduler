import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {
  const { setDay, name } = props;


  const formatSpots = () => {
    return props.spots > 1 ? `${props.spots} spots remaining` : (props.spots === 1 ? "1 spot remaining" : "no spots remaining");
  }


  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": !props.spots
  });

  return (
    //console gets mad when unclickable days are clicked
    <li className={dayClass} onClick={setDay}>
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>


  );
}