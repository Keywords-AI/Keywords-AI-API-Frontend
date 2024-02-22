import Routes from "./Routes";
import React, {useEffect} from "react";
import AuthContext from "./authentication/AuthContext";
import { useSelector } from "react-redux";
import { HotkeysProvider } from "react-hotkeys-hook";
import { Provider as TooltipProvider } from "@radix-ui/react-tooltip";
import posthog from 'posthog-js'


export function App() {
  const [user, setUser] = React.useState(null);
  const theme = useSelector((state) => state.theme.theme);
  useEffect(()=>{
    posthog.init('phc_Mh9Ez69ruxTaY8m9QFKL4vWokP4A19g9V4cwgplHklW', { api_host: 'https://app.posthog.com' })
  }, [])

  return (
    <div className="bg-gray-1 h-full w-full" data-theme={theme}>
      <AuthContext.Provider value={{ user, setUser }}>
        <HotkeysProvider>
          <Routes />
        </HotkeysProvider>
      </AuthContext.Provider>
    </div>
  );
}
export default App;
