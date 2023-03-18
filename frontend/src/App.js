import "./App.css";
import LogIn from "./components/LogIn";
import "bootstrap/dist/css/bootstrap.css";
import NavBar from "./components/NavBar";
import appConfig from "./realm.json";
import { RealmAppProvider, useRealmApp } from "./contexts/RealmApp";
import Details from "./components/Details";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
const { app_id } = appConfig;

export default function AppWithRealm() {
  return (
    <RealmAppProvider appId={app_id}>
      <App />
    </RealmAppProvider>
  );
}
function App() {
  const { currentUser } = useRealmApp();
  const [showNav, setShowNav] = useState(false);
  const containerVariants = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: "-100%" },
  };
  return (
    <div className="App">
      <NavBar showNav={showNav} />
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
    </div>
  );
}
