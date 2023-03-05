
import QRCode from "react-qr-code";
import React from 'react';
export default function Code() {
    return (
        <div style={{ height: "auto", margin: "0 auto", maxWidth: 64, width: "100%" }}>
            <QRCode
                size={256}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                value={'ridentity.com'}
                viewBox={`0 0 256 256`}
            />
        </div>

    );
}