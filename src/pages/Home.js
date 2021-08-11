import { Col, Empty, message, Modal, Pagination, Row, Select } from "antd";
import React, { useEffect, useState } from "react";
import { GetCharacterByAttributes } from "../helpers/HomeCalls";
import CharacterCard from "../components/CharacterCard";
import CharacterDetails from "../components/CharacterDetails";

const { Option } = Select;

export default function Home({ setLoading }) {
  //character states
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState();

  //search states
  const [searchString, setSearchString] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  //categories states
  const [categories] = useState(["Breaking Bad", "Better Call Saul"]);
  const [attributeKey, setAttributeKey] = useState();
  const [attributeValue, setAttributeValue] = useState();

  //pagination states
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCharacters, setTotalCharacters] = useState(62);

  useEffect(() => {
    setLoading(true);
    GetCharacterByAttributes(
      attributeKey,
      attributeValue,
      pageSize,
      currentPage
    )
      .then((a) => {
        setCharacters(a.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        message.error("Something went wrong");
        setLoading(false);
      });
  }, [currentPage, pageSize, attributeKey, attributeValue]);

  const searchCharacterByName = (name) => {
    setSearchString(name);
    GetCharacterByAttributes("name", String(name))
      .then((a) => {
        setSearchResults(a.data);
      })
      .catch((err) => {
        console.log(err);
        message.error("Something went wrong");
        setLoading(false);
      });
  };

  const setTotalCharactersLength = (category) => {
    if (category.length) {
      if (category.length === 1) {
        if (category[0] === "Breaking Bad") {
          setTotalCharacters(57);
        } else {
          setTotalCharacters(12);
        }
        return;
      }
      if (category.length === 2) {
        setTotalCharacters(7);
        return;
      }
    } else {
      setTotalCharacters(62);
    }
  };

  const searchCharactersByCategory = (category) => {
    if (category.length) {
      setAttributeKey("category");
      if (category.length === 2) {
        setAttributeValue(String(["Breaking Bad", " Better Call Saul"]));
      } else {
        setAttributeValue(String(category));
      }
    } else {
      setAttributeKey();
      setAttributeValue();
    }
    setTotalCharactersLength(category);
  };

  return (
    <Row justify="center">
      <Col style={{ margin: "25px 0" }} span={22}>
        <Row gutter={[10, 10]} justify="center">
          <Col md={10} sm={24} xs={24}>
            <Select
              showSearch
              placeholder="Search characters here"
              defaultActiveFirstOption={false}
              filterOption={false}
              onSearch={searchCharacterByName}
              onChange={searchCharacterByName}
              style={{ width: "100%" }}
              notFoundContent={
                searchString.length ? (
                  <p>Person not found in the territory</p>
                ) : (
                  <p>Say a name</p>
                )
              }
              onSelect={(character) => {
                setSelectedCharacter(searchResults[character]);
              }}
            >
              {searchResults.map((result, index) => (
                <Option key={index}>{result.name}</Option>
              ))}
            </Select>
          </Col>
          <Col md={10} sm={24} xs={24}>
            <Select
              mode="multiple"
              allowClear
              style={{ width: "100%" }}
              placeholder="Filter by categories"
              onChange={searchCharactersByCategory}
            >
              {categories.map((category, index) => (
                <Option key={index} value={category}>
                  {category}
                </Option>
              ))}
            </Select>
          </Col>
        </Row>
      </Col>
      <Col span={22}>
        <Row justify="center" gutter={[15, 15]}>
          {characters.length ? (
            characters.map((character, index) => (
              <CharacterCard
                character={character}
                key={index}
                setSelectedCharacter={setSelectedCharacter}
              />
            ))
          ) : (
            <Col>
              <Empty />
            </Col>
          )}
        </Row>
      </Col>
      <Col span={22}>
        <Row style={{ margin: "15px 0" }} justify="center" align="bottom">
          <Pagination
            pageSize={pageSize}
            current={currentPage}
            total={totalCharacters}
            onChange={(page, pageSize) => {
              setCurrentPage(page);
              setPageSize(pageSize);
            }}
          />
        </Row>
      </Col>
      <Modal
        visible={selectedCharacter}
        onCancel={() => setSelectedCharacter()}
        footer={null}
        style={{ top: 20 }}
        width="1100px"
      >
        <CharacterDetails character={selectedCharacter} />
      </Modal>
    </Row>
  );
}
