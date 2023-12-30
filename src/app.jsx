import Routes from "./Routes";
import React from "react";
import AuthContext from "./authentication/AuthContext";
import { useSelector } from "react-redux";
export function App() {
  const [user, setUser] = React.useState(null);
  const theme = useSelector((state) => state.theme.theme);
  return (
    <div className="bg-gray-black h-full w-full" data-theme={theme}>
      <AuthContext.Provider value={{ user, setUser }}>
        <Routes />
      </AuthContext.Provider>
    </div>
  );
}
export default App;
