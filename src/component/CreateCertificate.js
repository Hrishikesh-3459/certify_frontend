import React, { useContext, useState } from "react";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import getFetch from "../libs/axiosClient";
import { UtilityContext } from "../context/UtilityProvider";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

function CreateCertificate() {
  const navigate = useNavigate();
  const { openLoading, closeLoading } = useContext(UtilityContext);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const handleSubmission = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const body = {
      startDate,
      endDate,
      role: data.get("role"),
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      phone: data.get("phone"),
    };
    openLoading();
    try {
      const res = await getFetch().post("certificate", body);
      console.log(res);
      navigate("/");
    } catch (e) {
      console.log(e.response);
    }
    closeLoading();
  };
  return (
    <Box>
      <Box
        sx={{
          height: "4rem",
          backgroundColor: "primary.main",
          display: "flex",
          alignItems: "center",
          p: 2,
          justifyContent: "flex-end",
        }}
      >
        <Button
          sx={{ color: "white" }}
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </Button>
      </Box>
      <Box sx={{ my: 4 }}>
        <Container maxWidth="md">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
            component="form"
            onSubmit={handleSubmission}
          >
            <Box
              sx={{
                display: "flex",
                gap: 2,
                p: 2,
                alignItems: "center",
                width: "100%",
              }}
            >
              <Typography variant="subtitle1" sx={{ width: "7rem" }}>
                First Name
              </Typography>
              <TextField label="Name" fullWidth name="firstName" />
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                p: 2,
                alignItems: "center",
                width: "100%",
              }}
            >
              <Typography variant="subtitle1" sx={{ width: "7rem" }}>
                Last Name
              </Typography>
              <TextField label="Name" fullWidth name="lastName" />
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                p: 2,
                alignItems: "center",
                width: "100%",
              }}
            >
              <Typography variant="subtitle1" sx={{ width: "7rem" }}>
                Role
              </Typography>
              <TextField label="Role" fullWidth name="role" />
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                p: 2,
                alignItems: "center",
                width: "100%",
              }}
            >
              <Typography variant="subtitle1" sx={{ width: "7rem" }}>
                Joining Date
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Basic example"
                  value={startDate}
                  onChange={(newValue) => {
                    setStartDate(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                p: 2,
                alignItems: "center",
                width: "100%",
              }}
            >
              <Typography variant="subtitle1" sx={{ width: "7rem" }}>
                End Date
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Basic example"
                  value={endDate}
                  onChange={(newValue) => {
                    setEndDate(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                p: 2,
                alignItems: "center",
                width: "100%",
              }}
            >
              <Typography variant="subtitle1" sx={{ width: "7rem" }}>
                Mobile Number
              </Typography>
              <TextField label="Mobile Number" fullWidth name="phone" />
            </Box>
            <Box sx={{ display: "flex", gap: 2, p: 2, width: "100%" }}>
              <Typography variant="subtitle1" sx={{ width: "7rem" }}>
                Email
              </Typography>
              <TextField label="email" fullWidth name="email" />
            </Box>
            <Button variant="contained" type="submit" sx={{ width: "12rem" }}>
              Submit
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default CreateCertificate;
