import React from 'react'

const Dashboard = () => {
  return (
    <div>
        <h1>User Dashboard</h1>
        <p>id: {localStorage.getItem("id")}</p>
        <p>First Name: {localStorage.getItem("firstName")}</p>
        <p>Last Name: {localStorage.getItem("lastName")}</p>
        <p>Email: {localStorage.getItem("email")}</p>
        <p>Password: {localStorage.getItem("password")}</p>
    </div>
  )
}

export default Dashboard