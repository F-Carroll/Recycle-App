import React, { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Fuse from "fuse.js";
import { useDispatch, useSelector } from "react-redux";
import { setItems } from "../actions";
import { Box, Text, Container, Center, Wrap, WrapItem, Tooltip} from "@chakra-ui/react";
import moment from 'moment'

const SearchResult = (props) => {
  const dispatch = useDispatch();
  const query = useSelector((state) => state.query);
  const items = useSelector((state) => state.items);
  const selectedLocation = useSelector((state) => state.selectedLocation);
  
  function Capitalize(string) {
    const input = string.toLowerCase();
    const words = input.split(" ");

for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substr(1);
}

return words.join(" ")
  }
  
  useEffect(() => {
    const getItems = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/items");
        const jsonData = await response.json();
  
        dispatch(setItems(jsonData));
      } catch (error) {
        console.error(error.message);
      }
    };
  
    getItems();
    // document.getElementById("search").focus();
  },[dispatch]);

  const fuse = new Fuse(items, {
    keys: ["barcode", "product_name"],
    includeScore: true,
  });

  const results = fuse.search(query);

  const itemResults = query ? results.map((result) => result.item) : items;

  var arr2 = selectedLocation[0];

  function RenderList({ items }) {
    if (items?.length) {
      return items.map((item) => <p key={uuidv4()}>{Capitalize(item)}</p>);
    } else {
      return <Center h="60%" color="gray.500">No items</Center>
    }
  }

  return (
    <>
      {itemResults.map((item) => {
        const RecycleList = item.items.filter((item) => arr2.includes(item));
        const WasteList = item.items.filter((item) => !arr2.includes(item));

        return (
<Box key={item.product_id} p="12px" pt="5px" m="30px" boxShadow="lg" borderTop="4px" borderColor="#39F969">
 <Text as="h1" fontSize="25px">{item.product_name}</Text>
 <Text as="h2" fontSize="18px" className="mb-0">{item.barcode}</Text>
<Wrap spacing="0" my="20px">
  <WrapItem w={["100%","50%"]}  borderRight={["0px","2px"]} borderColor={["gray.200","gray.200"]}>
    <Container w="100%" textAlign="center" height="100%" mb={["40px","0", ]}>
      <Center mb="3px">
      <Tooltip hasArrow label="Recyclable" color="white" placement="top">
            <svg height="35px" className="w-6 h-6" fill="none" stroke="#39F969" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      </Tooltip>
      </Center>
      <RenderList items={RecycleList}/>
    </Container>
  </WrapItem>

  <WrapItem w={["100%","50%"]}>
  <Container w="100%" textAlign="center">
    <Center mb="3px">
    <Tooltip hasArrow label="Not Recyclable" color="white" placement="top">
    <svg height="35px" className="w-6 h-6" fill="none" stroke="#E65C32" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinejoin="round" strokeWidth="1.4" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
    </Tooltip>
    </Center>
        <RenderList items={WasteList}/>
    </Container>
  </WrapItem>
</Wrap>
<Tooltip hasArrow label={moment(item.record_date).format("Do MMM YYYY [at] hh:mm A")} color="white" bg="gray.700" fontSize="9px" >
<Text color="gray.400" fontSize="14px" mt="10px" width="fit-content" >Edited {moment(item.record_date).fromNow()}</Text>
</Tooltip>
</Box>
        
        );
      })}
    </>
  );
};

export default SearchResult;
