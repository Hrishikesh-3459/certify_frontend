import React from "react";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function CreateCertificate() {
  const navigate = useNavigate();
  const handleSubmission = (e) => {
    e.preventDefault();
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
                Name
              </Typography>
              <TextField label="Name" fullWidth />
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
              <TextField label="Role" fullWidth />
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
              <TextField label="Joining Date" fullWidth />
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
              <TextField label="End Date" fullWidth />
            </Box>
            <Box sx={{ display: "flex", gap: 2, p: 2, width: "100%" }}>
              <Typography variant="subtitle1" sx={{ width: "7rem" }}>
                Review
              </Typography>
              <TextField label="Review" multiline rows={4} fullWidth />
            </Box>
            <Button variant="contained" type="submit" sx={{ width : "12rem"}}>
              Submit
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default CreateCertificate;
