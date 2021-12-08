import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";


function InterviewerList(props) {

  const parsedInterviewers = props.interviewers.map(interviewer => <InterviewerListItem key={interviewer.id} {...interviewer} setInterviewer={() => props.onChange(interviewer.id)} selected={interviewer.id === props.value} />)

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{parsedInterviewers}</ul>
    </section>
  );
};

export default InterviewerList;