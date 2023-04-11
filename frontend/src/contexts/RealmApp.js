import React, {
  useState,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useContext,
} from "react";
import * as Realm from "realm-web";
import appConfig from "../realm.json";

const { baseUrl } = appConfig;

function createRealmApp(id) {
  return new Realm.App({ id, baseUrl });
}

const RealmAppContext = createContext(null);

export function RealmAppProvider({ appId, children }) {
  // Store Realm.App in React state. If appId changes, all children will rerender and use the new realmApp.
  const [realmApp, setRealmApp] = useState(createRealmApp(appId));
  useEffect(() => {
    setRealmApp(createRealmApp(appId));
  }, [appId]);
  // guest api key
  const apiLogin = useCallback(async () => {
    // await realmApp.logIn(Realm.Credentials.apiKey(process.env.REALM_API_KEY));
    await realmApp.logIn(
      Realm.Credentials.apiKey(
        "kCK4nx5uGSOBgSvgGUVGUarImZ1C06l0f9QZm5qw489Fyu2uPE5hK4jjDTjAoQ20"
      )
    );
    setCurrentUser(realmApp.currentUser);
  }, [realmApp]);
  // Store the app's current user in state and wrap the built-in auth functions to modify this state
  const [currentUser, setCurrentUser] = useState(realmApp.currentUser);
  // Wrap the base logIn function to save the logged in user in state
  const logIn = useCallback(
    async (credentials) => {
      await realmApp.logIn(credentials);
      setCurrentUser(realmApp.currentUser);
    },
    [realmApp]
  );
  // Wrap the current user's logOut function to remove the logged out user from state
  const logOut = useCallback(async () => {
    try {
      const user = realmApp.currentUser;
      await user?.logOut();
      await realmApp.removeUser(user);
      await apiLogin();
    } catch (err) {
      console.error(err);
    }
    // In this App there will only be one logged in user at a time, so
    // the new current user will be null. If you add support for
    // multiple simultaneous user logins, this updates to another logged
    // in account if one exists.
    setCurrentUser(realmApp.currentUser);
  }, [realmApp]);

  const deleteUser = useCallback(async () => {
    try {
      await realmApp.deleteUser(realmApp.currentUser);
    } catch (err) {
      console.error(err);
    }
    await apiLogin();
  }, [realmApp]);
  // Override the App's currentUser & logIn properties + include the app-level logout function
  const realmAppContext = useMemo(() => {
    return { ...realmApp, currentUser, apiLogin, logIn, logOut, deleteUser };
  }, [realmApp, currentUser, apiLogin, logIn, logOut, deleteUser]);

  return (
    <RealmAppContext.Provider value={realmAppContext}>
      {children}
    </RealmAppContext.Provider>
  );
}

export function useRealmApp() {
  const realmApp = useContext(RealmAppContext);
  if (!realmApp) {
    throw new Error(
      `No Realm App found. Make sure to call useRealmApp() inside of a <RealmAppProvider />.`
    );
  }
  return realmApp;
}
