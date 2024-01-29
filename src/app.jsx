import Routes from "./Routes";
import React from "react";
import AuthContext from "./authentication/AuthContext";
import { useSelector } from "react-redux";
import { HotkeysProvider } from "react-hotkeys-hook";
import { Provider as TooltipProvider } from "@radix-ui/react-tooltip";
export function App() {
  const [user, setUser] = React.useState(null);
  const theme = useSelector((state) => state.theme.theme);
  return (
    <div className="bg-gray-1 h-full w-full" data-theme={theme}>
      <AuthContext.Provider value={{ user, setUser }}>
        <HotkeysProvider>
          <TooltipProvider>
            <Routes />
          </TooltipProvider>
        </HotkeysProvider>
      </AuthContext.Provider>
    </div>
  );
}
export default App;
