import React, { useEffect, useState } from "react";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import "components/Application.scss";
import axios from 'axios';
import { getAppointmentsForDay } from "helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });
  const setDay = day => setState(prev => ({ ...prev, day }));
  
  useEffect(() => {
    let fetchDays = axios.get("http://localhost:8001/api/days");
    let fetchAppointments = axios.get("http://localhost:8001/api/appointments");
    let fetchInterviewer = axios.get("http://localhost:8001/api/interviewers");
    Promise.all([
      Promise.resolve(fetchDays),
      Promise.resolve(fetchAppointments),
    ]).then(all => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1]}));
    })
  }, [])
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {
          dailyAppointments.map(appointment => {
          return <Appointment key={appointment.id} id={appointment.id} time={appointment.time} interview={appointment.interview} />})
        }
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}