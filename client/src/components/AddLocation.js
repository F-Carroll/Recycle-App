import React, { useState } from "react";
import {
  Text,
  Spacer,
  Center,
  Button,
  Flex,
  Container,
  Tooltip,
  Input,
} from "@chakra-ui/react";
import { CloseIcon, InfoIcon } from "@chakra-ui/icons";
import Select from "react-select";
import options from "../options.json";

export default function AddLocation() {
  const [location_name, setLocation_Name] = useState("");
  const [loc_materials, setLoc_Materials] = useState([]);

  function Capitalize(string) {
    const input = string.toLowerCase();
    const words = input.split(" ");

    for (let i = 0; i < words.length; i++) {
      words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }

    return words.join(" ");
  }

  const parsedOptions = [];

  options.optionsList.forEach((option) => {
    parsedOptions.push({ value: option, label: Capitalize(option) });
  });

  const location_materials = loc_materials.map((item) =>
    item.label.toLowerCase()
  );

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { location_name, location_materials };
      await fetch("http://localhost:5000/api/locations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      window.location = "/";
    } catch (error) {
      console.error(error.message);
    }
  };

  function handleClose() {
    window.location = "/";
  }

  const NameInputHandler = (event) => {
    setLocation_Name(event.target.value);
  };

  function customTheme(theme) {
    return {
      ...theme,
      colors: {
        ...theme.colors,
        primary: "none",
        neutral20: "#E2E8F0",
        neutral30: "#CBD5E0",
        neutral50: "#A0AEC0",
        primary25: "#EFF2F5",
        primary50: "#DFE5EC",
      },
    };
  }

  return (
    <>
      <Flex>
        <Text
          fontSize="30px"
          m="20px"
          p="5px"
          px="18px"
          borderBottomWidth="3.5px"
          borderColor="#39F969"
        >
          Add Location
        </Text>
        <Spacer />
        <Center>
          <Button mr="30px" p="0" onClick={handleClose}>
            <CloseIcon />
          </Button>
        </Center>
      </Flex>
      <form onSubmit={onSubmitForm}>
        <Container mt="40px" height="60vw">
          <Flex>
            <Center>
              <Text>Location Name:</Text>
            </Center>
            <Spacer />
            <Input
              type="text"
              w="230px"
              placeholder="Enter Location Name"
              autoComplete="off"
              onChange={NameInputHandler}
            />
          </Flex>
          <Flex mt="20px" h="40vh">
            <Text>
              Select Materials:
              <Tooltip
                m="5px"
                hasArrow
                label="Select all the materials currently recycled by this location."
                bg="gray.100"
                color="black"
              >
                <InfoIcon h="10px" mb="15px" />
              </Tooltip>
            </Text>

            <Spacer />
            <Container w="230px" px="0">
              <Select
                theme={customTheme}
                closeMenuOnSelect={false}
                options={parsedOptions}
                onChange={setLoc_Materials}
                isMulti
                autoFocus
                isSearchable
                placeholder="Select Materials"
              />
            </Container>
          </Flex>
          <Center>
            <Button type="submit" colorScheme="blue">
              Submit
            </Button>
          </Center>
        </Container>
      </form>
    </>
  );
}