import { Layout, Spin, Row, Col } from "antd";
import React, { useState } from "react";
import Home from "../pages/Home";
import CategoryFilter from "../components/CategoryFilter";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function HomeLayout() {
  const [loading, setLoading] = useState(false);
  return (
    <Spin spinning={loading}>
      <Row>
        <Col span={24}>
          <Navbar />
        </Col>
        <Col span={24}>
          <Home loading={loading} setLoading={setLoading} />
        </Col>
        <Col span={24}>
          <Footer />
        </Col>
      </Row>
    </Spin>
  );
}
