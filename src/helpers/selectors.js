export function getAppointmentsForDay(state, day) {

  if (state.days.length === 0) {
    return [];
  }

  for (let item of state.days) {

    if (item["name"] === day && item.appointments) {
      let arrayOfAppointmentIds = item.appointments;

      let arrayOfAppointmentsForDay = arrayOfAppointmentIds.map((element) => state.appointments[element])
      return arrayOfAppointmentsForDay;

    }
  }
  return [];
};

