import { Delete, Search } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const ContentTable = ({ content }) => {
  return (
    <Box>
      <Box
        sx={{
          backgroundColor: "primary.main",
          borderRadius: 0.5,
          display: "grid",
          gridTemplateColumns: "1fr 3fr 5fr 1fr",
        }}
      >
        <Box sx={{ p: 2, flexGrow: 0.1, borderRight: "2px solid white" }}>
          <Typography variant="subtitle1" color="white">
            Sr. No
          </Typography>
        </Box>
        <Box sx={{ p: 2, flexGrow: 0.3, borderRight: "2px solid white" }}>
          <Typography variant="subtitle1" color="white">
            Name
          </Typography>
        </Box>
        <Box sx={{ p: 2, flexGrow: 0.5, borderRight: "2px solid white" }}>
          <Typography variant="subtitle1" color="white">
            Link
          </Typography>
        </Box>
        <Box sx={{ p: 2, flexGrow: 0.1 }}>
          <Typography variant="subtitle1" color="white">
            Delete
          </Typography>
        </Box>
      </Box>
      {content.map(({ _id, name, link }, index) => (
        <Box
          key={`content_${index}`}
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 3fr 5fr 1fr",
            backgroundColor:
              index % 2 === 0 ? "rgb(250,250,250)" : "rgb(240,240,240)",
          }}
        >
          <Box sx={{ p: 2, flexGrow: 0.1, borderRight: "2px solid white" }}>
            <Typography variant="subtitle1">{_id}</Typography>
          </Box>
          <Box sx={{ p: 2, flexGrow: 0.3, borderRight: "2px solid white" }}>
            <Typography variant="subtitle1">{name}</Typography>
          </Box>
          <Box
            sx={{
              p: 2,
              flexGrow: 0.5,
              borderRight: "2px solid white",
            }}
          >
            <Typography
              variant="subtitle1"
              variantMapping={{ subtitle1: Link }}
              sx={{
                textDecoration: "none",
              }}
              to={link}
            >
              {link}
            </Typography>
          </Box>
          <Box sx={{ p: 2, flexGrow: 0.1 }}>
            <IconButton>
              <Delete />
            </IconButton>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

const SearchBar = ({ text, setText }) => {
  return (
    <Box sx={{ display: "flex", width: 500 }}>
      <TextField
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
        sx={{
          flexGrow: 0.8,
        }}
        size="small"
      />
      <IconButton
        sx={{
          backgroundColor: "primary.main",
          borderRadius: "0",
          borderTopRightRadius: 16,
          borderBottomRightRadius: 16,
          px: 2,
        }}
        size="small"
      >
        <Search />
      </IconButton>
    </Box>
  );
};

function Home() {
  const [content] = useState([
    {
      _id: 1,
      name: "Nikhil",
      link: "/certificate/1",
    },
    {
      _id: 2,
      name: "Hrishikesh",
      link: "/certificate/2",
    },
  ]);
  const [text, setText] = useState("");
  const navigate = useNavigate();
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
            navigate("/login");
          }}
        >
          Login
        </Button>
      </Box>
      <Box sx={{ mt: 4 }}>
        <Container maxWidth="lg">
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <SearchBar text={text} setText={setText} />
            <Button
              variant="contained"
              onClick={() => {
                navigate("/create-certificate");
              }}
            >
              Create Certificate
            </Button>
          </Box>
          <ContentTable
            content={content.filter(({ name }) =>
              name.toLowerCase().includes(text.toLowerCase())
            )}
          />
        </Container>
      </Box>
    </Box>
  );
}

export default Home;
