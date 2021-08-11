import { Col, Row, Statistic, Tag } from "antd";
import React from "react";

export default function CharacterDetails({ character }) {
  return character ? (
    <Row justify="space-between" style={{ height: "100%" }}>
      <Col md={12} xs={24}>
        <Row style={{ height: "100%" }} justify="center" align="middle">
          <Col>
            <img src={character.img} alt="character" width="100%" />
          </Col>
        </Row>
      </Col>
      <Col md={10} xs={24}>
        <Row gutter={[20, 20]}>
          <Col span={24}>
            <Statistic title="Name" value={character.name} />
          </Col>
          <Col span={24}>
            <Statistic title="Alias" value={character.nickname} />
          </Col>
          <Col span={24}>
            <Statistic title="Portrayed by" value={character.portrayed} />
          </Col>
          <Col span={24}>
            <Statistic
              title="Appearence(s) In Breaking Bad"
              valueRender={() =>
                character.appearance.length
                  ? character.appearance.map((season) => (
                      <Tag>Season {season}</Tag>
                    ))
                  : "None"
              }
            />
          </Col>
          <Col span={24}>
            <Statistic
              title="Appearence(s) In Better Call Saul"
              valueRender={() =>
                character.better_call_saul_appearance.length
                  ? character.better_call_saul_appearance.map((season) => (
                      <Tag>Season {season}</Tag>
                    ))
                  : "None"
              }
            />
          </Col>
          <Col span={24}>
            <Statistic
              title="Occupation"
              valueRender={() =>
                character.occupation.length
                  ? character.occupation.map((occupation) => (
                      <Tag>{occupation}</Tag>
                    ))
                  : "None"
              }
            />
          </Col>
          <Col span={24}>
            <Statistic title="Date of birth" value={character.birthday} />
          </Col>
          <Col span={24}>
            <Statistic title="Category" value={character.category} />
          </Col>
          <Col span={24}>
            <Statistic title="Status" value={character.status} />
          </Col>
        </Row>
      </Col>
    </Row>
  ) : (
    <></>
  );
}
