import { useState, useEffect } from "react";
import axios from "axios";
import { getAppointmentsForDay } from "../helpers/selectors"

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return (
      axios.put(`/api/appointments/${id}`, { interview })
        .then(() => { setState({ ...state, appointments }) })
    )

  }

  const cancelInterview = (appointmentId) => {
    const newAppointments = state.appointments;
    newAppointments[appointmentId].interview = null;
    return (
      axios.delete(`/api/appointments/${appointmentId}`)
        .then(() => { setState({ ...state, appointments: newAppointments }) })
    )
  }

  const setDay = day => setState({ ...state, day });
  const dailyAppointments = getAppointmentsForDay(state, state.day);


  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers'),

    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });

  }, []);

  return { state, setDay, bookInterview, cancelInterview, dailyAppointments }

}

