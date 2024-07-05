import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Nurses from "./pages/Nurses";
import Users from "./pages/Users";
import Login from "./pages/Login";
import Account from "./pages/Account";
import PageNotFound from "./pages/PageNotFound";
import GlobalStyles from './styles/GlobalStyles'
import AppLayout from "./ui/AppLayout";
import AddGovernorate from './pages/AddGovernorate'
import AddCity from './pages/AddCity'
import User from "./pages/User";
import Nurse from './pages/Nurse'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DateContext } from './context/useDate'
import SignupForm from "./features/CreateNewAdmin/SignupForm";
import ProtectedRoute from "./pages/ProtectedRoute";
import Booking from "./pages/Booking";
import { DarkModeProvider } from "./context/DarkModeContext";
export default function App() {

  return (
    <div>
      <DarkModeProvider>

        <GlobalStyles />
        <DateContext>

          <BrowserRouter>
            <Routes>
              <Route element={<ProtectedRoute> <AppLayout /></ProtectedRoute>}>
                <Route index element={<Navigate replace to='/dashboard' />}></Route>
                <Route path="dashboard" element={<Dashboard />}></Route>
                <Route path="users" element={<Users />} />
                <Route path="users/:id" element={<User />} />
                <Route path="nurses/:id" element={<Nurse />} />
                <Route path="bookings/:id" element={<Booking />} />
                <Route path="nurses" element={<Nurses />} />
                <Route path="signup" element={<SignupForm />} />
                <Route path="bookings" element={<Bookings />} />
                <Route path='account' element={<Account />} />

                <Route path='governorate' element={<AddGovernorate />} />
                <Route path="city" element={<AddCity />} />
              </Route>
              <Route path="login" element={<Login />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </BrowserRouter>
        </DateContext>

        <ToastContainer position="top-right" style={{
          fontSize: '17px', maxWidth: '700px'
          , padding: '16px 4px', backgroundColor: 'var(--color-grey-0)', color: 'var(--color-grey-700)'
        }} />


      </DarkModeProvider>
    </div>
  )
}
