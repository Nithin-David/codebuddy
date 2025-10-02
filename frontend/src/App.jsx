import { Navigate, Route, Routes } from "react-router-dom";
import GoogleAuthPage from "./pages/GoogleAuthPage";
import {GithubAuthPage} from "./pages/GithubAuthPage";
import { GoogleOAuthProvider } from "@react-oauth/google";
import HomePage from "./pages/HomePage";

function App() {
  const GoogleAuthWrapper = () => {
 return (
   <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
     <GoogleAuthPage />
   </GoogleOAuthProvider>
 );
  }
 
  return (
    <>
      <Routes>
        <Route path="/login" element={<GoogleAuthWrapper />} />
        <Route path="/github" element={<GithubAuthPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
}

export default App
