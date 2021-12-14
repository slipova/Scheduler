import React from "react";
import "components/Appointment/styles.scss";
import useVisualMode from "hooks/useVisualMode";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";



function Appointment(props) {
  const { id, bookInterview, cancelInterview } = props;


  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);


  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING)
    bookInterview(id, interview)
      .then(() => { transition(SHOW) })
      .catch((error) => { transition(ERROR_SAVE, true) })
  }


  //////////////////
  function deleteInterview(id) {
    transition(DELETING);

    cancelInterview(id)
      .then(() => { transition(EMPTY) })
      .catch((error) => {
        transition(ERROR_DELETE, true)

      })
  }

  function handleError(mode) {
    transition(mode, true)
  }



  //////////////////////////
  function confirmDelete() {
    transition(CONFIRM);
  }

  function edit() {
    transition(EDIT);
  }


  return (
    <article className="appointment">
      <Header time={props.time} />

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && <Show interviewer={props.interview.interviewer} student={props.interview.student} onConfirm={confirmDelete} onEdit={edit} />}
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={back} onSave={save} />}
      {mode === CONFIRM && <Confirm message="Are you sure you would like to delete entry?" onCancel={back} onDelete={deleteInterview} id={props.id} />}
      {mode === EDIT && <Form interviewer={props.interview.interviewer.id} interviewers={props.interviewers} student={props.interview.student} onCancel={back} onSave={save} />}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === ERROR_DELETE && <Error onClose={() => handleError(SHOW)} message="delete" />}
      {mode === ERROR_SAVE && <Error onClose={() => handleError(EMPTY)} message="save" />}

    </article>
  );
};

export default Appointment;