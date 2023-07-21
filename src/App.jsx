import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
const Loader = lazy(() => import('./components/Loader.jsx'));
const Home = lazy(() => import('./pages/Home.jsx'));
const Signup = lazy(() => import('./pages/Signup.jsx'));
const Signout = lazy(() => import('./components/Signout.jsx'));
const Login = lazy(() => import('./pages/Login.jsx'));
const Dashboard = lazy(() => import('./pages/Dashboard.jsx'));
const CreateProject = lazy(() => import('./pages/CreateProject.jsx'));
const ProjectDetails = lazy(() => import('./pages/ProjectDetails.jsx'));

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={
              <>
                <Suspense fallback={<Loader />}>
                  <Home />
                </Suspense>
              </>
            }
          />
          <Route
            path='/sessions'
            element={
              <>
                <Suspense fallback={<Loader />}>
                  <Login />
                </Suspense>
              </>
            }
          />

          <Route
            path='/users/new'
            element={
              <>
                <Suspense fallback={<Loader />}>
                  <Signup />
                </Suspense>
              </>
            }
          />
          <Route
            path='/dashboard'
            element={
              <>
                <Suspense fallback={<Loader />}>
                  <Dashboard />
                </Suspense>
              </>
            }
          />
          <Route
            path='/projects/new'
            element={
              <>
                <Suspense fallback={<Loader />}>
                  <CreateProject />
                </Suspense>
              </>
            }
          />
          <Route
            path='/projects/:projectTitle'
            element={
              <Suspense fallback={<Loader />}>
                <ProjectDetails />
              </Suspense>
            }
          />
          <Route
            path='/signout'
            element={
              <Suspense fallback={<Loader />}>
                <Signout />
              </Suspense>
            }
          />

          <Route
            path='*'
            element={
              <>
                <Suspense fallback={<Loader />}>
                  <Home />
                </Suspense>
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
