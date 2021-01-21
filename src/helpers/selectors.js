export function getAppointmentsForDay(state, day) {
  if(!day) return [];
  const getDays = state.days.filter((x) => x.name === day)[0];
  if(!getDays) return [];
  const appointment = getDays.appointments;
  const result = []
  for(const appoint of appointment) {
    result.push(state.appointments.data[appoint])
  }
  return result;
}