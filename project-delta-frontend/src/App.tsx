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
  ReviewForm,
  ReviewsPage,
} from "./Pages";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/map" element={<Header />}>
        <Route index element={<MapPage />} />
      </Route>
      <Route path="/list" element={<Header />}>
        <Route index element={<ListPage />} />
      </Route>
      <Route path="/account" element={<Header />}>
        <Route index element={<AccountPage />} />
      </Route>
      <Route path="venue/:id" element={<Header />}>
        <Route index element={<VenuePage />} />
      </Route>
      <Route path="venue/:id/post-review" element={<Header />} >
        <Route index element={<ReviewForm />}/>
      </Route>
      <Route path="venue/:id/reviews" element={<Header />} >
        <Route index element={<ReviewsPage />}/>
      </Route>
      <Route path="*" element={<h1>Page Not Found</h1>} />
    </Routes>
  );
}

export default App;
