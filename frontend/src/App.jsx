import { RouterProvider } from "react-router-dom";
import { router } from "./helper/browserRouter";
import { ThemeProvider } from "@/context/Theme/theme-provider";
import { restoreCSRF } from "./store/csrf";
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './store/store';

if (import.meta.env.VITE_ENV !== "production") {
  restoreCSRF();
}

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
