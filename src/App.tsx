import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";

import SpecialityPage from "./pages/SpecialityPage";
import SectionsPage from "./pages/SectionsPage";
import ModulesPage from "./pages/ModulesPage";
import StudentsPage from "./pages/StudentsPage";
import SemestersPage from "./pages/SemestersPage";
import MarksPage from "./pages/MarksPage";
import WelcomePage from "./pages/WelcomePage";
import LoginPage from "./pages/LoginPage";
import DecisionPage from "./pages/DecisionPage";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <WelcomePage />
          </Layout>
        }
      />
      <Route
        path="/specialities"
        element={
          <Layout>
            <SpecialityPage />
          </Layout>
        }
      />
      <Route
        path="/sections"
        element={
          <Layout>
            <SectionsPage />
          </Layout>
        }
      />
      <Route
        path="/students"
        element={
          <Layout>
            <StudentsPage />
          </Layout>
        }
      />
      <Route
        path="/modules"
        element={
          <Layout>
            <ModulesPage />
          </Layout>
        }
      />
      <Route
        path="/semesters"
        element={
          <Layout>
            <SemestersPage />
          </Layout>
        }
      />
      <Route
        path="/marks"
        element={
          <Layout>
            <MarksPage />
          </Layout>
        }
      />
      <Route
        path="/decisions"
        element={
          <Layout>
            <DecisionPage />
          </Layout>
        }
      />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
