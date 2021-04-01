import React from "react";
import { SearchIcon } from "@chakra-ui/icons";
import {
  Center,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { setQuery } from "../actions";

export default function SearchInput() {
  const dispatch = useDispatch();
  const query = useSelector((state) => state.query);
  const items = useSelector((state) => state.items);

  function handleOnSearch({ currentTarget = {} }) {
    const { value } = currentTarget;
    dispatch(setQuery(value));
  }

  return (
    <>
      <Center>
        <InputGroup mx="14.4%">
          <InputLeftElement children={<SearchIcon color="gray.500" />} />
          <Input
            size="md"
            variant="filled"
            id="search"
            autoComplete="off"
            placeholder="Search by EAN or Product Name"
            type="text"
            value={query}
            onChange={handleOnSearch}
          />
        </InputGroup>
      </Center>
    </>
  );
}
