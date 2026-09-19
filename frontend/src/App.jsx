// import React from 'react'
// import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import Home from './pages/Home'
// import Login from './pages/Login'
// import Register from './pages/Register'
// import VerifyEmail from './pages/VerifyEmail'
// import VerifyPage from './pages/VerifyPage'
// import Books from './pages/Books'
// import MyBorrowedBooks from './pages/MyBorrowedBooks'
// import Profile from './pages/Profile'
// import Fine from './pages/Fine'
// import Dashboard from './pages/Dashboard'
// import AdminDashboard from './pages/AdminDashboard'
// import ForgotPassword from './pages/ForgotPassword'
// import ResetPassword from './pages/ResetPassword'
// import ChangePassword from './pages/ChangePassword'
// import About from './components/About'
// import SearchBooks from './pages/Searchbok'
// import AdminManageBooks from './pages/AdminManageBooks'
// import AddBook from './pages/AddBookByAdmin'
// import ManageUsers from './pages/ManageUsers'
// import ProtectedRoute from './components/ProtectedRoute'
// import { Toaster } from "react-hot-toast";
// import Navber from './components/Navber'

// const App = () => {
//   return (
//     <>
//       <BrowserRouter>
//         <Navber />
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/books" element={<Books />} />
//           <Route path="/about" element={<About />} />

//           <Route path="/register" element={<Register />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/forgot-password" element={<ForgotPassword />} />
//           <Route path="/reset-password/:token" element={<ResetPassword />} />
//           <Route path="/change-password" element={<ChangePassword />} />


//           <Route path="/verify/:token" element={<VerifyEmail />} />
//           <Route path="/verify" element={<VerifyPage />} />

//           <Route path="/my-borrowed-books" element={<MyBorrowedBooks />} />
//           <Route path="/profile" element={<Profile />} />
//           <Route path="/fine" element={<Fine />} />
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/search-books" element={<SearchBooks />} />


//           <Route element={<ProtectedRoute />}>

//             <Route
//               path="/admin-dashboard"
//               element={<AdminDashboard />}
//             />

//             <Route
//               path="/manage-books"
//               element={<AdminManageBooks />}
//             />

//             <Route
//               path="/users"
//               element={<ManageUsers />}
//             />

//             <Route
//               path="/add-book"
//               element={<AddBook />}
//             />

//           </Route>
//         </Routes>
//       </BrowserRouter>
//     </>
//   )
// }

// export default App


import React from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
// import VerifyEmail from './pages/VerifyEmail'
import VerifyPage from './pages/VerifyPage'
import Books from './pages/Books'
import MyBorrowedBooks from './pages/MyBorrowedBooks'
import Profile from './pages/Profile'
import Fine from './pages/Fine'
import Dashboard from './pages/Dashboard'
import AdminDashboard from './pages/AdminDashboard'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import ChangePassword from './pages/ChangePassword'
import About from './components/About'
import SearchBooks from './pages/Searchbok'
import AdminManageBooks from './pages/AdminManageBooks'
import AddBook from './pages/AddBookByAdmin'
import ManageUsers from './pages/ManageUsers'
import ProtectedRoute from './components/ProtectedRoute'
// import { Toaster } from "react-hot-toast";
import Navber from './components/Navber'

const AppContent = () => {
  const location = useLocation();

  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/verify" ||
    location.pathname === "/change-password";

  return (
    <>
      {!hideNavbar && <Navber />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/about" element={<About />} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/change-password" element={<ChangePassword />} />

        {/* <Route path="/verify/:token" element={<VerifyEmail />} /> */}
        <Route path="/verify" element={<VerifyPage />} />

        <Route path="/my-borrowed-books" element={<MyBorrowedBooks />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/fine" element={<Fine />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/search-books" element={<SearchBooks />} />

        <Route element={<ProtectedRoute />}>

          <Route
            path="/admin-dashboard"
            element={<AdminDashboard />}
          />

          <Route
            path="/manage-books"
            element={<AdminManageBooks />}
          />

          <Route
            path="/users"
            element={<ManageUsers />}
          />

          <Route
            path="/add-book"
            element={<AddBook />}
          />

        </Route>
      </Routes>
    </>
  )
}

const App = () => {
  return (
    <>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </>
  )
}

export default App