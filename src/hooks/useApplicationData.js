import { useState, useEffect } from "react";
import axios from 'axios';
export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  const setDay = day => setState(prev => ({ ...prev, day }));

  useEffect(() => {
    let fetchDays = axios.get("http://localhost:8001/api/days");
    let fetchAppointments = axios.get("http://localhost:8001/api/appointments");
    let fetchInterviewers = axios.get("http://localhost:8001/api/interviewers");
    Promise.all([
      Promise.resolve(fetchDays),
      Promise.resolve(fetchAppointments),
      Promise.resolve(fetchInterviewers)
    ]).then(all => {
      console.log(all[2].data)
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    })
  }, [])

  useEffect(() => {
    axios.get("http://localhost:8001/api/days")
    .then(all => setState(prev => ( {...prev, days: all.data} )))
  },[state.appointments])

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    console.log(appointments[1])
    return axios.put(`http://localhost:8001/api/appointments/${id}`, appointment).then(setState({...state, appointments: appointments}))
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return (axios.delete(`http://localhost:8001/api/appointments/${id}`, appointment).then(setState({...state, appointments: appointments})))
  }
  return { state, setDay, bookInterview, cancelInterview}
}