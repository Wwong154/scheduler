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
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    })
  }, [])

  function updateSpot(add, cancel) {
    const dayChange = state.days.find(day => day.name === state.day)
    const days = [...state.days];
    if (cancel) {
      dayChange.spots++;
    } else if (add) {
      dayChange.spots--;
    }
    days[dayChange.id - 1] = dayChange;
    return days;
  }

  function bookInterview(id, interview) {
    const add = !(state.appointments[id].interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return (axios.put(`http://localhost:8001/api/appointments/${id}`, appointment)
      .then(() => {
        setState({...state, appointments: appointments, days: updateSpot(add)});
      })
    )
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
    return (axios.delete(`http://localhost:8001/api/appointments/${id}`, appointment)
      .then(() => {
        setState({...state, appointments: appointments, days: updateSpot(null, true)})
      })
    )
  }
  return { state, setDay, bookInterview, cancelInterview}
}