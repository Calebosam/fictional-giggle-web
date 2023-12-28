import React, { useEffect, useState } from "react";
import { Stack, Button } from "@mui/material";
import UserCard from "../components/UserCard/UserCard";
import { BASE_URL } from "../config";
import axios from "axios";
import UserAccount from "../components/UseAccount/UserAccount";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [externalUsers, setExternalUsers] = useState([]);
  const [externalSrc, setExternalSrc] = useState("Typicode");
  const [systemUsers, setSystemUsers] = useState([]);

  const handleDataFetch = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/v1/externalUsers`);
      setExternalSrc(data.src);
      setExternalUsers(data.data);
    } catch (err) {
      toast.error("Error getting your data!");
    }
  };

  const handleClearCache = async () => {
    try {
      await axios.delete(`${BASE_URL}/api/v1/externalUsers`);
      toast.success("Redis Cache is cleared")
    } catch (err) {
      toast.error("Error getting your data!");
    }
  };
  const handleSystemDataFetch = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/v1/users`);
      setSystemUsers(data.data);
    } catch (err) {
      toast.error("Error getting your data!");
    }
  };
  useEffect(() => {
    handleSystemDataFetch();
    handleDataFetch();
  }, []);
  return (
    <>
      <div style={{ width: "35%", margin: "0 auto" }}>
        <h1 style={{ textAlign: "center" }}>User Dashboard</h1>
        <UserAccount
          id={localStorage.getItem("id")}
          firstName={localStorage.getItem("firstName")}
          lastName={localStorage.getItem("lastName")}
          email={localStorage.getItem("email")}
          password={localStorage.getItem("password")}
          description={
            "My role as a DevOps Engineer entails some combination of release engineering, infrastructure provisioning and management, system administration, security, and DevOps advocacy. "
          }
        />
      </div>
      <div>
        <h1 style={{ textAlign: "center" }}>System Users</h1>
        <UserCard users={systemUsers} />
      </div>
      <div>
        <h1 style={{ textAlign: "center" }}>External Users</h1>
        <Stack
          sx={{ pt: 4 }}
          direction="row"
          spacing={2}
          justifyContent="center"
        >
          <Button variant="contained" onClick={() => handleDataFetch()}>
            Fetch Data
          </Button>
          <Button variant="outlined" onClick={() => handleClearCache()}>
            Clear Cache
          </Button>
        </Stack>
        <h2 style={{ textAlign: "center" }}>Data Source: {externalSrc}</h2>
        <UserCard users={externalUsers} />
      </div>
    </>
  );
};

export default Dashboard;
