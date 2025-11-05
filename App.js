import Dashboard from "./components/Dashboard";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { dataContext } from "./context/dataContext";
export default function App() {
  return (
    <SafeAreaProvider>
      <dataContext>
        <Dashboard />
      </dataContext>
    </SafeAreaProvider>
  );
}
