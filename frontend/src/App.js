import "./App.css";
import Landing from "./components/Landing";
import SongPage from "./components/SongPage";
import "bootstrap/dist/css/bootstrap.css";
import NavBar from "./components/NavBar";
import appConfig from "./realm.json";
import { RealmAppProvider, useRealmApp } from "./components/RealmApp";

const { app_id } = appConfig;

function App() {
  return (
    <div className="App">
      <RealmAppProvider appId={app_id}>
        <NavBar />
        <Landing />
        <SongPage />
      </RealmAppProvider>
    </div>
  );
}

export default App;
