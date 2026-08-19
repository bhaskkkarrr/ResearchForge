import { Route, Routes } from "react-router-dom";
import ChatBox from "./components/ChatBox";
import { GlobalLoader } from "./components/Loaders";
import NavBar from "./components/NavBar";
import { useAuth } from "./context/AuthContext";
import Home from "./pages/Home";
import Report from "./pages/Report";
import Page404 from "./pages/Page404";
import MainLayout from "./pages/MainLayout";
import History from "./pages/History";

function App() {
  const { isAuthLoading } = useAuth();
  if (isAuthLoading) {
    return <GlobalLoader />;
  }
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/research/:id" element={<Report />} />
        <Route path="/history" element={<History />} />
      </Route>
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}

export default App;
