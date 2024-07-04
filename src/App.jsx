import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import ResultPage from "./components/Result";
import Header from "./components/Header";
import { GeneratedArchitectureProvider } from "./context/ArchitectureContext";

const App = () => {
  return (
    <Router>
      <Header />
      <GeneratedArchitectureProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/result" element={<ResultPage />} />
        </Routes>
      </GeneratedArchitectureProvider>
    </Router>
  );
};

export default App;
