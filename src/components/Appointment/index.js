import React from "react";
import "components/Appointment/styles.scss";


function Appointment(props) {
  return (
    <>
      {props.time && <article className="appointment">Appointment at {props.time}</article>}
      {!props.time && <article className="appointment">No appointments</article>}
    </>
  );
};

export default Appointment;