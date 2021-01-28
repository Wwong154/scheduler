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

  //initial call to get all data
  useEffect(() => {
    let fetchDays = axios.get("/api/days");
    let fetchAppointments = axios.get("/api/appointments");
    let fetchInterviewers = axios.get("/api/interviewers");
    Promise.all([
      Promise.resolve(fetchDays),
      Promise.resolve(fetchAppointments),
      Promise.resolve(fetchInterviewers)
    ]).then(all => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    })
  }, [])

  function updateSpot(add, cancel) { //to update spots remaining text
    const dayChange = state.days.find(day => day.name === state.day) //find day
    const days = [...state.days]; //data of all days
    if (cancel) {//if cancel add spot
      dayChange.spots++;
    } else if (add) {//if add appointment, minus spots
      dayChange.spots--;
    }
    days[dayChange.id - 1] = dayChange; //apply to change to object (not state yet)
    return days;
  }

  function bookInterview(id, interview) {//add interview
    const add = !(state.appointments[id].interview);
    const appointment = {//make appointment with the new interview
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {//add that appointment to the list of appointments
      ...state.appointments,
      [id]: appointment
    };
    return (axios.put(`/api/appointments/${id}`, appointment)//push change to db
      .then(() => {
        setState({...state, appointments: appointments, days: updateSpot(add)});//update everything
      })
    )
  }

  function cancelInterview(id) {// refer to bookInterviwer, same thing
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return (axios.delete(`/api/appointments/${id}`, appointment)
      .then(() => {
        setState({...state, appointments: appointments, days: updateSpot(null, true)})
      })
    )
  }
  return { state, setDay, bookInterview, cancelInterview}
}