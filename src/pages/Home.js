import { Col, Modal, Pagination, Row, Select } from "antd";
import React, { useEffect, useState } from "react";
import {
  GetCharacterByAttributes,
  GetCharactersByPage,
} from "../helpers/HomeCalls";
import CharacterCard from "../components/CharacterCard";
import CharacterDetails from "../components/CharacterDetails";

const { Option } = Select;

export default function Home({ loading, setLoading }) {
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
  const totalCharacters = 62; //defining total characters for the use of pagination

  useEffect(() => {
    GetCharactersByPage(pageSize, currentPage).then((a) => {
      setCharacters(a.data);
    });
  }, [currentPage, pageSize]);

  const searchCharacterByName = (name) => {
    setSearchString(name);
    GetCharacterByAttributes("name", String(name)).then((a) => {
      setSearchResults(a.data);
    });
  };

  const searchCharactersByCategory = (category) => {
    if (category.length) {
      GetCharacterByAttributes("category", String(category)).then((a) => {
        setCharacters(a.data);
      });
    } else {
      GetCharactersByPage(pageSize, currentPage).then((a) => {
        setCharacters(a.data);
      });
    }
  };

  return (
    <Row justify="center">
      <Col span={22}>
        <Row gutter={[10, 10]} justify="center">
          <Col md={10} sm={24} xs={24}>
            <Select
              showSearch
              //   value={searchString}
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
              //   defaultValue={categories}
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
        <Row justify="center" align="bottom">
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
      >
        <CharacterDetails />
      </Modal>
    </Row>
  );
}
