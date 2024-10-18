import { RouterProvider } from "react-router-dom";
import { router } from "./helper/browserRouter";

function App() {
  return <RouterProvider router={router} />;
}

export default App;
