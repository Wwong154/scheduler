export function getAppointmentsForDay(state, day) {
  if(!day) return [];
  const getDays = state.days.filter((x) => x.name === day)[0];
  if(!getDays) return [];
  const appointment = getDays.appointments;
  const result = []
  for(const appoint of appointment) {
    result.push(state.appointments[appoint])
  }
  return result;
}

export function getInterview(state, interview) {
  if(!interview) return null;
  let result = JSON.parse(JSON.stringify(interview))
  result.interviewer = state.interviewers[interview.interviewer]
  return result;
}

export function getInterviewersForDay(state, day) {
  if(!day) return [];
  const getInterviewer = state.days.filter((x) => x.name === day)[0];
  if(!getInterviewer) return [];
  const interviewers = getInterviewer.interviewers;
  const result = []
  for(const interviewer of interviewers) {
    result.push(state.interviewers[interviewer])
  }
  return result;
}

