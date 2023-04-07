import "./App.css";
import LogIn from "./components/LogIn";
import "bootstrap/dist/css/bootstrap.css";
import NavBar from "./components/NavBar";
import appConfig from "./realm.json";
import { RealmAppProvider, useRealmApp } from "./contexts/RealmApp";
import Details from "./components/Details";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  ToggleComponentsProvider,
  useToggleComponents,
} from "./contexts/ToggleComponents";
import Terms from "./components/Terms";
import Cookies from "./components/Cookies";
import { FetchDataProvider } from "./contexts/FetchData";
import LoginModal from "./components/LoginModal";
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
  });
  const [showNav, setShowNav] = useState(false);
  const { openTerms, openCookies } = useToggleComponents();
  const containerVariants = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: "-100%" },
  };
  return openTerms ? (
    <Terms />
  ) : openCookies ? (
    <Cookies />
  ) : (
    <div className="App">
      <AnimatePresence>
        {!currentUser && (
          <motion.div
            initial="visible"
            animate="visible"
            exit="hidden"
            variants={containerVariants}
            transition={{ duration: 0.3 }}
          >
            <LogIn />
          </motion.div>
        )}
      </AnimatePresence>
      {currentUser && (
        <motion.div>
          <Details setShowNav={setShowNav} />
        </motion.div>
      )}
      <LoginModal />
    </div>
  );
}
