import React, { useState } from "react";
import {
  Button,
  Center,
  Container,
  Flex,
  Spacer,
  Text,
  Input,
  Tooltip,
} from "@chakra-ui/react";
import { CloseIcon, InfoIcon } from "@chakra-ui/icons";
import Select from "react-select";

export default function AddItem() {
  const [product_name, setProduct_Name] = useState("");
  const [barcode, setBarcode] = useState("");
  const [materials, setMaterials] = useState([]);

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

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

  const items = materials.map((item) => item.label);

  const onSubmitForm = async (e) => {
      e.preventDefault();
        try {
            const body = {product_name, barcode, items}
            await fetch("http://localhost:5000/api/items", {
                method:'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(body)

                
            });
            window.location = "/";
        } catch (error) {
            console.error(error.message)
        }  
  }

  function handleClose() {
    window.location = "/";
  }

  const NameInputHandler = (event) => {
    setProduct_Name(event.target.value)
  }
  const BarcodeInputHandler = (event) => {
    setBarcode(event.target.value)
  }
 

  return (
    <div>
      <Flex>
        <Text
          fontSize="30px"
          m="20px"
          p="5px"
          px="18px"
          borderBottomWidth="3.5px"
          borderColor="#39F969"
        >
          Add Product
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
            <Text>Product Name:</Text>
          </Center>
          <Spacer />
          <Input type="text" w="230px" placeholder="Enter Product Name" autoComplete="off" onChange={NameInputHandler}/>
        </Flex>
        <Flex mt="20px">
          <Center>
            <Text>Barcode:</Text>
          </Center>
          <Spacer />
          <Input id="barcode-input"type="text" w="230px" placeholder="Enter Barcode" autoComplete="off" onChange={BarcodeInputHandler} />
        </Flex>
        <Flex mt="20px" h="40vh">
          <Text>
            Select Materials:
            <Tooltip
              m="5px"
              hasArrow
              label="Select all the materials make up this product, e.g. Cardboard, Foil, etc..."
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
              options={options}
              onChange={setMaterials}
              isMulti
              autoFocus
              isSearchable
              placeholder="Select Materials"
            />
          </Container>
        </Flex>
        <Center>
          <Button type="submit" colorScheme="blue">Submit</Button>
        </Center>
      </Container>
      </form>
      
    </div>
  );
}
