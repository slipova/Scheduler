import React from "react";
import "components/Appointment/styles.scss";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";



function Appointment(props) {
  console.log(props)
  return (
    <>
      <Header time={props.time} />

      {props.time && <article className="appointment">Appointment at {props.time}</article>}
      {!props.time && <article className="appointment">No appointments</article>}
      {/* {props.interview ? <Show /> : <Empty />} */}
      {props.interview && <Show interviewer={props.interview.interviewer} student={props.interview.student} />}
      {!props.interview && <Empty />}
    </>
  );
};

export default Appointment;