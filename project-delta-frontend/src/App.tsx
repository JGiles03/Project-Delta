import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

import { Header } from "./Components";
import {
  HomePage,
  LoginPage,
  SignupPage,
  MapPage,
  ListPage,
  AccountPage,
  VenuePage,
} from "./Pages";

function App() {
  return (
    <Routes>

      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/home" element={<Header />}>
        <Route index element={<HomePage />} />
        <Route path="map" element={<MapPage />} />
        <Route path="list" element={<ListPage />} />
        <Route path="account" element={<AccountPage />} />
        <Route path="venue/:id" element={<VenuePage />} />
      </Route>
      <Route path="*" element={<h1>Page Not Found</h1>} />
    </Routes>
  );
}

export default App;