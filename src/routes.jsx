import App from "./App";
import SelectGame from "./components/selectGame";
import ErrorPage from "./components/errorPage";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />
  },
  {
    path: "/:page",
    element: <SelectGame />,
  }, 
];

export default routes;