import { Badge, Card, Col, Tag } from "antd";
import React from "react";

export default function CharacterCard({ character, setSelectedCharacter }) {
  const getBadgeColor = (status) => {
    if (status.includes("Alive")) return "green";
    return "red";
  };
  return (
    <Col md={5} sm={24} onClick={() => setSelectedCharacter(character)}>
      <Badge.Ribbon
        text={character.status}
        color={getBadgeColor(character.status)}
      >
        <Card
          hoverable
          cover={
            <img
              alt="character-img"
              src={character.img}
              style={{
                objectFit: "contain",
                height: "auto",
                width: "100%",
                borderRadius: "5px",
                maxHeight: "350px",
              }}
            />
          }
        >
          <h2>
            {character.name}{" "}
            <span style={{ fontSize: "0.8rem", float: "right" }}>
              {character.birthday}
            </span>
          </h2>
          {character.occupation.map((occupation) => (
            <Tag color="blue">{occupation}</Tag>
          ))}
        </Card>
      </Badge.Ribbon>
    </Col>
  );
}
