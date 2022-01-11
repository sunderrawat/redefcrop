import { Routes, Route } from 'react-router-dom';
import Homepage from './../pages/Homepage';
import Projects from './../pages/Peojects';
import Login from './../pages/Login';
import SingleProject from './../pages/SingleProject';
import PageNotFound from './../pages/PageNotFound';
import AddProject from './../components/Project/AddProject';
import EditProject from '../components/Project/EditProject';

function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/add-new-project" element={<AddProject />} />
        <Route path="/projects/edit-project/:id" element={<EditProject />} />
        <Route path="/projects/:id" element={<SingleProject />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default AppRoutes;
