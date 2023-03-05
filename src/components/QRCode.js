import QRCode from "react-qr-code";
import React from 'react';
import { Button } from "@mui/material";

export default function Code() {
    const downloadQR = () => {
        const canvas = document.getElementById("123456");
        const pngUrl = canvas
          .toDataURL("image/png")
          .replace("image/png", "image/octet-stream");
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = "123456.png";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      };

    return (
        <div style={{ height: "auto", margin: "0rem 2rem", maxWidth: "100vh", width: "80%" }}>
            <QRCode
                size={256}
                style={{ height: "auto", maxWidth: "100%", width: "100%", margin: "2rem 0rem" }}
                value={'ridentity.com'}
                viewBox={`0 0 256 256`}
            />
            <a onClick={downloadQR}>
            <Button 
            className="qr-btn"
            variant="contained"
            color='success'
            download='qrcode.png'
            >Download</Button>
            </a>
        </div>

    );
}