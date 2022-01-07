import "./App.css";
import "react-notifications/lib/notifications.css";
import { NotificationContainer } from "react-notifications";
import Home from "./pages/Home";
import AccountSummary from "./pages/AccountSummary";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <div className="main">
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/accountsummary" element={<AccountSummary />} />
            <Route
              exact
              path="/iframe"
              element={
                <iframe
                  src="http://localhost:3000?TKij1kzMtCU2sSMzwJR3SteJQwcqXogKBD"
                  title="W3Schools Free Online Web Tutorials"
                  id="iframe_id"
                  style={{ height: "1000px", width: "100%" }}
                ></iframe>
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
      <NotificationContainer />
    </div>
  );
}

export default App;
