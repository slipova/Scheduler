import React from "react";
import "components/Appointment/styles.scss";
import useVisualMode from "hooks/useVisualMode";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";



function Appointment(props) {
  const { id, bookInterview, cancelInterview } = props;


  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";

  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);


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
  function deleteInterview(id) {
    transition(DELETING);

    cancelInterview(id)
      .then(() => { transition(EMPTY) })
  }


  //////////////////////////
  function confirmDelete() {
    transition(CONFIRM);
  }


  return (
    <article className="appointment">
      <Header time={props.time} />

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && <Show interviewer={props.interview.interviewer} student={props.interview.student} onConfirm={confirmDelete} />}
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={back} onSave={save} />}
      {mode === CONFIRM && <Confirm message="Are you sure you would like to delete entry?" onCancel={back} onDelete={deleteInterview} id={props.id} />}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}

    </article>
  );
};

export default Appointment;