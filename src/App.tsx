import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./components/HomePage";
import LecturePage from "./components/LecturePage";
import NotFound from "./components/NotFound";
import BuilderPage from "./builder/components/BuilderPage";
import PresentMode from "./builder/components/PresentMode";

const App = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path="lectures/:id" element={<LecturePage />} />
      <Route path="builder" element={<BuilderPage />} />
      <Route path="*" element={<NotFound />} />
    </Route>
    <Route path="builder/present" element={<PresentMode />} />
  </Routes>
);

export default App;
