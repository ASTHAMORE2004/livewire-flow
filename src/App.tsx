import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./pages/Index.tsx";
import EventPage from "./pages/EventPage.tsx";
import NotFound from "./pages/NotFound.tsx";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/event/:id" element={<EventPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
