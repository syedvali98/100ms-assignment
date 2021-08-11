import { Col, message, Modal, Pagination, Row, Select } from "antd";
import React, { useEffect, useState } from "react";
import {
  GetCharacterByAttributes,
  GetCharactersByPage,
} from "../helpers/HomeCalls";
import CharacterCard from "../components/CharacterCard";
import CharacterDetails from "../components/CharacterDetails";

const { Option } = Select;

export default function Home({ loading, setLoading }) {
  //character states
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState();

  //search states
  const [searchString, setSearchString] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  //categories states
  const [categories] = useState(["Breaking Bad", "Better Call Saul"]);

  //pagination states
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCharacters] = useState(62);

  useEffect(() => {
    setLoading(true);
    GetCharactersByPage(pageSize, currentPage)
      .then((a) => {
        setCharacters(a.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        message.error("Something went wrong");
        setLoading(false);
      });
  }, [currentPage, pageSize]);

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

  const searchCharactersByCategory = (category) => {
    if (category.length) {
      GetCharacterByAttributes("category", String(category))
        .then((a) => {
          setCharacters(a.data);
        })
        .catch((err) => {
          console.log(err);
          message.error("Something went wrong");
          setLoading(false);
        });
    } else {
      GetCharactersByPage(pageSize, currentPage)
        .then((a) => {
          setCharacters(a.data);
        })
        .catch((err) => {
          console.log(err);
          message.error("Something went wrong");
          setLoading(false);
        });
    }
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
          {characters.map((character, index) => (
            <CharacterCard
              character={character}
              key={index}
              setSelectedCharacter={setSelectedCharacter}
            />
          ))}
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
