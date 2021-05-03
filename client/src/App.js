import * as React from "react";
import "./assets/main.css";
import { BrowserRouter as Router, Route} from "react-router-dom";
import { useSelector } from "react-redux";

//Components
import Navbar from "./components/Navbar";
import SearchResult from "./components/SearchResult";
import Settings from "./components/Settings"
import SettingsHandler from "./components/SettingsHandler"
import AddItem from "./components/AddItem";
import AddLocation from "./components/AddLocation";
import LandingPage from "./components/LandingPage";

function App() {
  const query = useSelector((state) => state.query);
  return (
      <Router>
         <Route exact path="/">
           <Navbar />
           {query ? null : <LandingPage/>}
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
  );
}

export default App;
