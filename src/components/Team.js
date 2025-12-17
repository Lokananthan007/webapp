import React from "react";
import "./styles/Team.css";

const referralData = [
  { count: 1, income: 1500 },
  { count: 2, income: 3000 },
  { count: 3, income: 4500 },
  { count: 4, income: 6000 },
  { count: 5, income: 7500 },
  { count: 6, income: 9000 },
  { count: 7, income: 10500 },
  { count: 8, income: 12000 },
  { count: 9, income: 13500 },
  { count: 10, income: 15000 },
  { count: 11, income: 16500 },
  { count: 12, income: 18000 },
  { count: 13, income: 19500 },
  { count: 14, income: 21000 },
  { count: 15, income: 22500 },
  { count: 16, income: 24000 },
  { count: 17, income: 25500 },
  { count: 18, income: 27000 },
  { count: 19, income: 28500 },
  { count: 20, income: 30000 },
];

export default function Team() {
  return (
    <div className="team-container">
      <h2 className="title">VIP Referral Income</h2>

      <div className="table-wrapper">
        <table className="referral-table">
          <thead>
            <tr>
              <th>Referral</th>
              <th>Income (₹)</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {referralData.map((item) => (
              <tr key={item.count}>
                <td>{item.count}</td>
                <td>₹{item.income.toLocaleString()}</td>
                <td className="status">✓</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
