export function getAppointmentsForDay(state, day) {
  if(!day) return []; //no day? 
  const getDays = state.days.filter((x) => x.name === day)[0];
  if(!getDays) return []; //if day does not exist in db
  const appointment = getDays.appointments;
  const result = []
  for(const appoint of appointment) {//turn the fetched object to array
    result.push(state.appointments[appoint])
  }
  return result;
}

export function getInterview(state, interview) {
  if(!interview) return null;//no interview?
  let result = JSON.parse(JSON.stringify(interview)) //deep copying, probably want to change it if db is larger...but hey
  result.interviewer = state.interviewers[interview.interviewer]
  return result;
}

export function getInterviewersForDay(state, day) {
  if(!day) return [];// no day?
  const getInterviewer = state.days.filter((x) => x.name === day)[0];
  if(!getInterviewer) return [];//if no interviewer for that day
  const interviewers = getInterviewer.interviewers;
  const result = []
  for(const interviewer of interviewers) {//turn the fetched object to array
    result.push(state.interviewers[interviewer])
  }
  return result;
}

