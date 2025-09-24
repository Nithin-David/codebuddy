import { Navigate, Route, Routes } from "react-router-dom";
import GoogleAuthPage from "./pages/GoogleAuthPage";
import { GoogleOAuthProvider } from "@react-oauth/google";

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
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
}

export default App
