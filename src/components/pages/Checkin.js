import React, { useState } from "react";
import "../styles/Checkin.css";

export default function Checkin() {
  const [today] = useState(new Date().getDate());
  const [code, setCode] = useState("");

  const daysInMonth = 31;
  const weeks = [];
  let week = [];

  for (let i = 1; i <= daysInMonth; i++) {
    week.push(i);
    if (week.length === 7 || i === daysInMonth) {
      weeks.push(week);
      week = [];
    }
  }

  return (
    <div className="checkin-container">
      <h2 className="header">CheckIn</h2>
      <h3 className="subHeader">Check-in 8.2025</h3>

      {/* Calendar */}
      <div className="calendar">
        <div className="weekRow headerRow">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div key={d} className="dayHeader">{d}</div>
          ))}
        </div>

        {weeks.map((week, wi) => (
          <div key={wi} className="weekRow">
            {week.map((day) => (
              <div
                key={day}
                className={`dayBox ${today === day ? "todayBox" : ""}`}
              >
                <div className="dayText">{day}</div>
                {today === day ? (
                  <div className="todayText">Today</div>
                ) : (
                  <div className="catchupText">Catch Up</div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Check-in code */}
      <input
        type="text"
        placeholder="Enter check-in code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="input"
      />

      <button className="button">Check in Now!</button>
    </div>
  );
}
