import React from "react";
import "components/Appointment/styles.scss";
import useVisualMode from "hooks/useVisualMode";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";



function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

  return (
    <article className="appointment">
      <Header time={props.time} />

      {/* {props.interview ? <Show interviewer={props.interview.interviewer} student={props.interview.student} /> : <Empty />} */}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && <Show interviewer={props.interview.interviewer} student={props.interview.student} />}
      {mode === CREATE && <Form interviewers={[]} onCancel={() => back()} />}

    </article>
  );
};

export default Appointment;