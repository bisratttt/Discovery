import "./App.css";
import Landing from "./components/Landing";
import SongPage from "./components/SongPage";
import "bootstrap/dist/css/bootstrap.css";
import NavBar from "./components/NavBar";
import appConfig from "./realm.json";
import { RealmAppProvider, useRealmApp } from "./components/RealmApp";

const { appId } = appConfig;

function App() {
  return (
    <div className="App">
      <RealmAppProvider appId={appId}>
        <NavBar />
        <Landing />
        <SongPage />
      </RealmAppProvider>
    </div>
  );
}

export default App;
