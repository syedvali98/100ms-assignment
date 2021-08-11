import { Col, Row } from "antd";
import React from "react";

export default function Navbar() {
  return (
    <Row justify="center" style={{ height: "90px" }}>
      <Col style={{ height: "100%" }}>
        <img src="./assets/logo.png" alt="logo" height="100%"></img>
      </Col>
    </Row>
  );
}
