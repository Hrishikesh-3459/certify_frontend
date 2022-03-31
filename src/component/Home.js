import { Delete, Search } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  IconButton,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import React, { useState, useEffect, useContext, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UtilityContext } from "../context/UtilityProvider";
import getFetch from "../libs/axiosClient";
import { AuthContext } from "./../context/AuthProvider";
import ConfirmModal from "./ConfirmModal";

const StyledTextFeild = styled(TextField)({
  "& .MuiInputBase-root": {
    borderRadius: 0,
  },
});

const ContentTable = ({ content, loadData }) => {
  const [open, setOpen] = useState(false);
  const choosed = useRef(null);
  const { openLoading, closeLoading } = useContext(UtilityContext);
  const handleDelete = async () => {
    if (choosed.current !== null) {
      openLoading();
      try {
        const res = await getFetch().delete(`/certificate/${choosed.current}`);
        console.log(res);
        choosed.current = null;
        closeLoading();
        loadData();
      } catch (e) {
        console.log(e.response);
        closeLoading();
      }
    }
  };
  return (
    <Box sx={{ overflow: "auto", width: "100%" }}>
      <Box sx={{ width: 800, minWidth: "100%" }}>
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
        {content.map(({ id, firstName, lastName }, index) => {
          const name = `${firstName} ${lastName}`;
          const link = `/verify/${id}`;
          return (
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
                <Typography variant="subtitle1">{index + 1}</Typography>
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
                  {id}
                </Typography>
              </Box>
              <Box sx={{ p: 2, flexGrow: 0.1 }}>
                <IconButton
                  onClick={() => {
                    choosed.current = id;
                    setOpen(true);
                  }}
                >
                  <Delete />
                </IconButton>
              </Box>
            </Box>
          );
        })}
        <ConfirmModal
          open={open}
          setOpen={setOpen}
          title={"Delete Certificate"}
          content="You are about to delete a certificate are you sure about that"
          onConfirm={handleDelete}
        />
      </Box>
    </Box>
  );
};

const SearchBar = ({ text, setText }) => {
  return (
    <Box
      sx={{
        display: "flex",
        width: 500,
        maxWidth: "100%",
      }}
    >
      <StyledTextFeild
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
  const [content, setContent] = useState([]);
  const [text, setText] = useState("");
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { openLoading, closeLoading } = useContext(UtilityContext);
  const loadData = async () => {
    openLoading();
    try {
      const res = await getFetch().get("/certificate");
      console.log(res);
      setContent(res.data.Certificates);
    } catch (e) {
      console.log(e.response);
    }
    closeLoading();
  };
  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 2,
              flexWrap: "wrap",
              gap: "1rem",
              width: "100%",
            }}
          >
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
            content={content.filter(({ firstName, lastName }) => {
              const name = `${firstName} ${lastName}`;
              return name.toLowerCase().includes(text.toLowerCase());
            })}
            loadData={loadData}
          />
        </Container>
      </Box>
    </Box>
  );
}

export default Home;
