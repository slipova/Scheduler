

export function getAppointmentsForDay(state, day) {

  if (state.days.length === 0) {
    return [];
  }

  for (let item of state.days) {

    if (item["name"] === day && item.appointments) {
      let arrayOfAppointmentIds = item.appointments;

      let arrayOfAppointmentsForDay = arrayOfAppointmentIds.map((element) => state.appointments[element]);
      return arrayOfAppointmentsForDay;

    }
  };
  return [];
};



export function getInterviewersForDay(state, day) {
  if (state.days.length === 0) {
    return [];
  };

  for (let item of state.days) {

    if (item["name"] === day && item.interviewers) {
      let arrayOfAppointmentIds = item.interviewers;

      let arrayOfAppointmentsForDay = arrayOfAppointmentIds.map((element) => state.interviewers[element])
      return arrayOfAppointmentsForDay;

    }
  };
  return [];
};



export function getInterview(state, interview) {
  if (!state || !interview) {
    return null;
  };

  const interviewerId = interview.interviewer;
  if (state.interviewers[interviewerId]) {
    return { student: interview.student, interviewer: state.interviewers[interviewerId] }
  }

  return null;
};


