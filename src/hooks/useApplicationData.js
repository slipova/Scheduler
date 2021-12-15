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
        .then(() => {
          const updatedWeek = freeAppointmentSpots();
          setState(prev => ({ ...prev, appointments, days: updatedWeek }))

        })
    )

  }

  function freeAppointmentSpots() {
    const currentDay = state.day;
    let arrayOfAppointments = [];
    let updatedWeek = [];


    for (let weekday of state.days) {
      if (weekday.name === currentDay) {
        arrayOfAppointments = weekday.appointments;
        let freeSpots = arrayOfAppointments.filter(spot => !state.appointments[spot].interview);

        let availableSpots = freeSpots.length;
        let updatedDay = { ...weekday, spots: availableSpots }
        updatedWeek.push(updatedDay)
      } else {

        updatedWeek.push(weekday);
      }
    };

    return updatedWeek;

  }

  const cancelInterview = (appointmentId) => {
    const newAppointments = state.appointments;
    newAppointments[appointmentId].interview = null;
    return (
      axios.delete(`/api/appointments/${appointmentId}`)
        .then(() => {
          const updatedWeek = freeAppointmentSpots();
          setState({ ...state, appointments: newAppointments, days: updatedWeek })

        })
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

