import { RouterProvider } from "react-router-dom";
import { router } from "./helper/browserRouter";
import { ThemeProvider } from "@/context/Theme/theme-provider";
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './store/store';

function App() {
  return (
    <ThemeProvider>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </ThemeProvider>
  );
}

export default App;
