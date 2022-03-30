import { Box, Button, Typography } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import jsPDF from "jspdf";
import { UtilityContext } from "../context/UtilityProvider";
import getFetch, { frontUrl } from "../libs/axiosClient";
import { useParams } from "react-router-dom";

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
  const link = `${frontUrl}/verify/${user.id}`;
  const generatePdf = () => {
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
  };
  return (
    <Box
      sx={{
        backgroundColor: "white",
        height: "100%",
        borderRadius: "1rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 4,
        gap: 4,
      }}
    >
      <Typography variant="subtitle1">
        Link : &nbsp;{" "}
        <Typography
          variant="subtitle1"
          variantMapping={{ subtitle1: "a" }}
          href={link}
        >
          {link}
        </Typography>
      </Typography>
      <QRCodeCanvas value={link} id="qrcanvas" />
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
            display: "grid",
            gridTemplateColumns: "3fr 2fr",
            p: 4,
            gap: 2,
            backgroundColor: "primary.main",
            minHeight: "100vh",
          }}
        >
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
                height: `${Math.floor(certificate.height / 4)}px`,
              }}
            />
          </Box>
          <SideBox user={user} canvas={canvas} />
        </Box>
      )}
    </Box>
  );
}

export default VerifiedCertificate;
