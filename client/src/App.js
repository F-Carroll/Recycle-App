import * as React from "react";
import "./App.css";
import { ChakraProvider, theme} from "@chakra-ui/react";
import { BrowserRouter as Router, Route} from "react-router-dom";

//Components
import Navbar from "./components/Navbar";
import SearchResult from "./components/SearchResult";
import Settings from "./components/Settings"
import SettingsHandler from "./components/SettingsHandler"
import AddItem from "./components/AddItem";
import AddLocation from "./components/AddLocation";

function App() {
  
  return (
    <ChakraProvider theme={theme}>
      <Router>
         <Route exact path="/">
           <Navbar />
           
           <SearchResult/>
           <SettingsHandler/>
           </Route>

         <Route path="/settings">
           <Settings/>
         </Route>

         <Route path="/add/item">
           <AddItem/>
         </Route>

         <Route path="/add/location">
           <AddLocation/>
         </Route>
            
           
                       
  </Router>
    </ChakraProvider>
  );
}

export default App;
