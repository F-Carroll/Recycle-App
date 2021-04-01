import * as React from "react";
import "./App.css";
import { ChakraProvider, theme } from "@chakra-ui/react";

//Components
import InputTodo from "./components/InputTodo";
import Dropdown from "./components/Dropdown";
import Navbar from "./components/Navbar";
import ListItems from "./components/ListItems";
import {useSelector} from 'react-redux';
import SearchInput from "./components/SearchInput";
import SearchResult from "./components/SearchResult";
import LocationSelector from "./components/LocationSelector";


function App() {
  const counter = useSelector(state => state.counter)
  const query = useSelector(state => state.query)
  
  return (
    <ChakraProvider theme={theme}>
          <div className="container">
            <Navbar />
           <SearchInput/>
           <SearchResult/>
           
          </div>
    </ChakraProvider>
  );
}

export default App;
