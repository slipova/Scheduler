import React from "react";
import "components/Appointment/styles.scss";
import useVisualMode from "hooks/useVisualMode";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";



function Appointment(props) {
  const { id, bookInterview } = props;

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";

  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);


  /////////////added
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING)
    bookInterview(id, interview)
      .then(() => { transition(SHOW) })
  }
  //////////////////


  return (
    <article className="appointment">
      <Header time={props.time} />

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && <Show interviewer={props.interview.interviewer} student={props.interview.student} />}
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={back} onSave={save} />}
      {mode === SAVING && <Status message="Saving" />}

    </article>
  );
};

export default Appointment;