import { ApolloProvider } from "@apollo/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { client } from "./client";
import { CreateAssetPage } from "./pages/CreateAssetPage";
import { CreateProjectPage } from "./pages/CreateProjectPage";
import { HomePage } from "./pages/HomePage";
import { ProjectConfigurationPage } from "./pages/ProjectConfigurationPage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { ProjectViewPage } from "./pages/ProjectViewPage";

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/app/projects" element={<ProjectsPage />} />
        <Route path="/app/projects/:projectId" element={<ProjectViewPage />} />
        <Route path="/app/projects/:projectId/configuration" element={<ProjectConfigurationPage />} />
        <Route path="/app/projects/create" element={<CreateProjectPage />} />
        <Route path="/app/projects/:projectId/assets/create" element={<CreateAssetPage />} />
      </Routes>
    </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
