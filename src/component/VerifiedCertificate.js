import { Box, Button, Typography } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import jsPDF from "jspdf";
import { UtilityContext } from "../context/UtilityProvider";
import getFetch from "../libs/axiosClient";
import { useParams } from "react-router-dom";

const certificate = {
  font: "84px serif",
  width: 3088,
  height: 2183,
  id: {
    offsetX: 500,
    offsetY: 400,
  },
  name: {
    offsetX: 500,
    offsetY: 520,
  },
  role: {
    offsetX: 500,
    offsetY: 640,
  },
  joiningDate: {
    offsetX: 500,
    offsetY: 760,
  },
  endDate: {
    offsetX: 1500,
    offsetY: 760,
  },
  link: {
    offsetX: 2250,
    offsetY: 1400,
  },
};

const qr = {
  width: 400,
  height: 400,
  offsetX: 2250,
  offsetY: 1500,
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
      const img = await CreateImage("/certificate.png");
      ctx.drawImage(img, 0, 0, certificate.width, certificate.height);
      const qrcanvas = document.getElementById("qrcanvas");
      if (qrcanvas.getContext) {
        const qrData = qrcanvas.toDataURL("image/png");
        const qrImg = await CreateImage(qrData);
        ctx.drawImage(qrImg, qr.offsetX, qr.offsetY, qr.width, qr.height);
      }
      ctx.font = certificate.font;
      ctx.fillStyle = "rgb(0,0,0)";
      ctx.fillText(
        `Certificate Id : ${user._id}`,
        certificate.id.offsetX,
        certificate.id.offsetY
      );
      ctx.fillText(
        `Name : ${user.firstName} ${user.lastName}`,
        certificate.name.offsetX,
        certificate.name.offsetY
      );
      ctx.fillText(
        `Role : ${user.role.toUpperCase()}`,
        certificate.role.offsetX,
        certificate.role.offsetY
      );
      ctx.fillText(
        `From : ${user.joiningDate}`,
        certificate.joiningDate.offsetX,
        certificate.joiningDate.offsetY
      );
      ctx.fillText(
        `To : ${user.endDate}`,
        certificate.endDate.offsetX,
        certificate.endDate.offsetY
      );
      ctx.fillText(
        `Link : ${user.link}`,
        certificate.link.offsetX,
        certificate.link.offsetY
      );
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
      } catch (e) {
        console.log(e.response);
      }
      closeLoading();
    };
    fetch();
  }, []);
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
    pdf.save();
  };
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
                href={user.link}
              >
                {user.link}
              </Typography>
            </Typography>
            <QRCodeCanvas value={user.link} id="qrcanvas" />
            <Button variant="contained" onClick={generatePdf}>
              Download PDF
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default VerifiedCertificate;
