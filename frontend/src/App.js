import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import appConfig from "./realm.json";
import { RealmAppProvider, useRealmApp } from "./contexts/RealmApp";
import { useEffect } from "react";
import {
  ToggleComponentsProvider,
  useToggleComponents,
} from "./contexts/ToggleComponents";
import Terms from "./components/Terms";
import Cookies from "./components/Cookies";
import { FetchDataProvider } from "./contexts/FetchData";
import LoginModal from "./components/LoginModal";
import Details from "./components/Details";
import { Routes, Route } from "react-router-dom";
const { app_id } = appConfig;

export default function AppWithRealm() {
  return (
    <FetchDataProvider>
      <ToggleComponentsProvider>
        <RealmAppProvider appId={app_id}>
          <App />
        </RealmAppProvider>
      </ToggleComponentsProvider>
    </FetchDataProvider>
  );
}
function App() {
  const { apiLogin, currentUser } = useRealmApp();
  useEffect(() => {
    async function logGuest() {
      await apiLogin();
    }
    if (currentUser === null) {
      logGuest();
    }
  }, []);
  const { openTerms, openCookies } = useToggleComponents();

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <>
              {currentUser && <Details />}
              <LoginModal />
            </>
          }
        />
        <Route path="/terms" element={<Terms />} />
        <Route path="/cookies" element={<Cookies />} />
      </Routes>
    </div>
  );
}
