import "./App.css";
import LogIn from "./components/LogIn";
import "bootstrap/dist/css/bootstrap.css";
import NavBar from "./components/NavBar";
import appConfig from "./realm.json";
import { RealmAppProvider, useRealmApp } from "./contexts/RealmApp";
import Details from "./components/Details";

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
  return (
    <div className="App">
      <NavBar />
      <LogIn />
      {currentUser && <Details />}
    </div>
  );
}
