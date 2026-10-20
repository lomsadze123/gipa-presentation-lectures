import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./components/HomePage";
import LecturePage from "./components/LecturePage";
import NotFound from "./components/NotFound";

const App = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path="lectures/:id" element={<LecturePage />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
);

export default App;
