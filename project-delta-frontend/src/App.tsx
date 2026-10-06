import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

import { Header, BusinessHeader } from "./Components";
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
  BusinessPage,
  OnboardingPage,
  PreferencesForm,
} from "./Pages";

function BusinessRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (role !== "venue_owner") {
    return <Navigate to="/list" replace />;
  }

  return children;
}

function AccountHeader() {
  const role = localStorage.getItem("role");

  if (role === "venue_owner") {
    return <BusinessHeader />;
  }

  return <Header />;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path='/onboarding' element={<OnboardingPage />} />
      <Route path="/map" element={<Header />}>
        <Route index element={<MapPage />} />
      </Route>
      <Route path="/list" element={<Header />}>
        <Route index element={<ListPage />} />
      </Route>
      <Route path="/account" element={<AccountHeader />}>
        <Route index element={<AccountPage />} />
      </Route>
      <Route
        path="/business" element={ <BusinessRoute> <BusinessHeader /> </BusinessRoute>}> 
        <Route index element={<BusinessPage />}/>
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
      <Route path="/preferences" element={<Header />} >
        <Route index element={<PreferencesForm />}/>
      </Route>
      <Route path="*" element={<h1>Page Not Found</h1>} />
    </Routes>
  );
}

export default App;
