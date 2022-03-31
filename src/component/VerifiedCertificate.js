import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import jsPDF from "jspdf";
import { UtilityContext } from "../context/UtilityProvider";
import getFetch, { frontUrl } from "../libs/axiosClient";
import { useParams } from "react-router-dom";
import { Facebook, LinkedIn, Twitter } from "@mui/icons-material";

//720
//1470

const certificate = {
  font: "84px serif",
  width: 3088,
  height: 2183,
  issueDate: {
    offsetX: 2725,
    offsetY: 135,
  },
  name: {
    offsetX: 1544,
    offsetY: 880,
  },
  role: {
    offsetX: 1095,
    offsetY: 1018,
  },
  joiningDate: {
    offsetX: 2050,
    offsetY: 1018,
  },
  endDate: {
    offsetX: 2450,
    offsetY: 1018,
  },
  link: {
    offsetX: 600,
    offsetY: 1350,
  },
};

const qr = {
  width: 300,
  height: 300,
  offsetX: 1350,
  offsetY: 1500,
};

const formatDate = (date) => {
  if (date !== undefined && date !== "") {
    var myDate = new Date(date);
    var month = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ][myDate.getMonth()];
    var str = myDate.getDate() + " " + month + " " + myDate.getFullYear();
    return str;
  }
  return "";
};

const CreateImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image(); // Create new img element
    img.src = src;
    img.addEventListener("load", () => {
      resolve(img);
    });
    img.addEventListener("error", () => {
      reject();
    });
  });
};

const SideBox = ({ user, canvas }) => {
  const { openLoading, closeLoading } = useContext(UtilityContext);
  const link = `${frontUrl}/verify/${user.id}`;
  const generatePdf = () => {
    openLoading();
    const options = {
      orientation: "l",
      unit: "px",
      format: "a4",
    };
    const pdf = new jsPDF(options);
    pdf.addImage(
      canvas.current,
      "PNG",
      0,
      0,
      Math.floor(certificate.width / 5),
      Math.floor(certificate.height / 5),
      "NONE"
    );
    pdf.save(`${user.firstName}_internship_completion`);
    closeLoading();
  };
  return (
    <Box
      sx={{
        height: "100%",
        borderRadius: "1rem",
        display: "flex",
        flexDirection: "column",
        color: "rgb(250,240,240)",
        py: 2,
      }}
    >
      <QRCodeCanvas value={link} id="qrcanvas" style={{ display: "none" }} />
      <Typography variant="h5" sx={{ px: 1 }}>
        Share this certificate
      </Typography>
      <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
        <IconButton sx={{ color: "inherit" }}>
          <Facebook fontSize="large" />
        </IconButton>
        <IconButton sx={{ color: "inherit" }}>
          <Twitter fontSize="large" />
        </IconButton>
        <IconButton sx={{ color: "inherit" }}>
          <LinkedIn fontSize="large" />
        </IconButton>
      </Box>
      <Box
        sx={{
          mb: 4,
          p: 1,
          width: "100%",
          backgroundColor: "rgb(250,240,240)",
          overflow: "hidden",
          borderRadius: "4px",
          position: "relative",
          cursor: "pointer",
          ":hover": {
            "::before": {
              content: "'COPY'",
              position: "absolute",
              top: 0,
              right: 0,
              height: "100%",
              p: 1,
              backgroundColor: "primary.main",
              color: "rgb(250,240,240)",
            },
          },
        }}
      >
        <Typography
          color="rgb(50,0,0)"
          sx={{
            whiteSpace: "nowrap",
          }}
        >
          {link}
        </Typography>
      </Box>
      <Button variant="contained" onClick={generatePdf}>
        Download PDF
      </Button>
    </Box>
  );
};

function VerifiedCertificate() {
  const canvas = useRef();
  const [user, setUser] = useState(null);
  const { openLoading, closeLoading } = useContext(UtilityContext);
  const params = useParams();
  useEffect(() => {
    const draw = async () => {
      const ctx = canvas.current.getContext("2d");
      ctx.fillStyle = "rgb(255, 255, 255)";
      ctx.fillRect(0, 0, certificate.width, certificate.height);
      const img = await CreateImage("/certificate.jpg");
      ctx.drawImage(img, 0, 0, certificate.width, certificate.height);
      const qrcanvas = document.getElementById("qrcanvas");
      if (qrcanvas.getContext) {
        const qrData = qrcanvas.toDataURL("image/png");
        const qrImg = await CreateImage(qrData);
        ctx.drawImage(qrImg, qr.offsetX, qr.offsetY, qr.width, qr.height);
      }
      ctx.font = "64px sarif";
      ctx.fillStyle = "rgb(0,0,0)";
      ctx.fillText(
        formatDate(user.issueDate),
        certificate.issueDate.offsetX,
        certificate.issueDate.offsetY
      );
      const name = `${user.firstName} ${user.lastName}`;
      const link = `${frontUrl}/verify/${user.id}`;
      const startDate = formatDate(user.startDate);
      const endDate = formatDate(user.endDate);
      ctx.font = "italic bold 124px sarif";
      ctx.fillText(
        name,
        certificate.name.offsetX - Math.floor((name.length * 124) / 4),
        certificate.name.offsetY
      );
      ctx.font = "bold 45px sarif";
      const role = user.role.toUpperCase();
      ctx.fillText(
        role,
        certificate.role.offsetX - Math.floor((role.length * 45) / 3),
        certificate.role.offsetY
      );
      ctx.font = "bold 54px sarif";
      ctx.fillText(
        startDate,
        certificate.joiningDate.offsetX,
        certificate.joiningDate.offsetY
      );
      ctx.fillText(
        endDate,
        certificate.endDate.offsetX,
        certificate.endDate.offsetY
      );
      ctx.font = "64px serif";
      ctx.fillText(link, certificate.link.offsetX, certificate.link.offsetY);
    };
    if (user) {
      draw();
    }
  }, [user]);
  useEffect(() => {
    const fetch = async () => {
      openLoading();
      try {
        const id = params.id;
        const res = await getFetch().get(`/certificate/${id}`);
        console.log(res);
        setUser(res.data.certificate);
      } catch (e) {
        console.log(e.response);
      }
      closeLoading();
    };
    fetch();
  }, []);
  return (
    <Box>
      {user && (
        <Box
          sx={{
            backgroundColor: "rgb(30,30,30)",
          }}
        >
          <Box
            sx={{
              px: 4,
              py: 2,
              boxShadow: "0px 0px 10px 0px rgb(0,0,0)",
            }}
          >
            <Typography
              variant="h4"
              color="white"
              sx={{
                fontFamily: "'Libre Franklin', sans-serif",
                fontWeight: "800",
              }}
            >
              Internship Certificate
            </Typography>
          </Box>
          <Box
            sx={{
              p: 4,
              minHeight: "100vh",
            }}
          >
            <Grid
              container
              spacing={2}
              sx={{
                minHeight: "100%",
              }}
            >
              <Grid item xs={12} lg={3}>
                <SideBox user={user} canvas={canvas} />
              </Grid>
              <Grid item xs={12} lg={9}>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <canvas
                    width={certificate.width}
                    height={certificate.height}
                    ref={canvas}
                    style={{
                      width: `${Math.floor(certificate.width / 4)}px`,
                      maxWidth: "100%",
                      boxShadow: "0px 0px 10px 5px rgb(0,0,0)",
                      borderRadius: "10px",
                    }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default VerifiedCertificate;
