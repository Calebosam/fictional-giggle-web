import React, { useEffect, useState } from "react";
import { Stack,Button } from "@mui/material";
import UserCard from "../components/UserCard/UserCard";
import { BASE_URL } from "../config";
import axios from 'axios'

const systemUsers = [
  {
    id: "1",
    firstName: "Caleb",
    lastName: "Osam",
    email: "email@gmail.com",
    password: "password",
  },
  {
      id: "2",
      firstName: "Gabby",
      lastName: "Maru",
      email: "gabby@gmail.com",
      password: "password",
    },
];

const Dashboard = () => {
  const [externalUsers, setExternalUsers] = useState([])
  const [externalSrc, setExternalSrc] = useState("hello")

  const handleDataFetch = async ()=> {
    const {data} = await axios.get(`${BASE_URL}/api/v1/externalUsers`)
    setExternalSrc(data.src)
    setExternalUsers(data.data)
  }

  const handleClearCache = async ()=> {
    await axios.delete(`${BASE_URL}/api/v1/externalUsers`)
  }
  useEffect( ()=>{
    handleDataFetch()
  }, [])
  return (
    <>
      <div>
        <h1>User Dashboard</h1>
        <p>id: {localStorage.getItem("id")}</p>
        <p>First Name: {localStorage.getItem("firstName")}</p>
        <p>Last Name: {localStorage.getItem("lastName")}</p>
        <p>Email: {localStorage.getItem("email")}</p>
        <p>Password: {localStorage.getItem("password")}</p>
      </div>
      <div>
        <h1>System Users</h1>
            <UserCard users={systemUsers}/>
      </div>
      <div>
      
        <h1>External Users</h1>
        <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained" onClick={() => handleDataFetch()}>Fetch Data</Button>
              <Button variant="outlined" onClick={() => handleClearCache()}>Clear Cache</Button>
            </Stack>
            <h2>Data Source: {externalSrc}</h2>
            <UserCard users={externalUsers} />
      </div>
    </>
  );
};

export default Dashboard;
