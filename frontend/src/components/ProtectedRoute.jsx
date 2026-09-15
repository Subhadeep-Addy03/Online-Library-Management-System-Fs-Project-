// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children, allowedRole }) => {

//     const token = localStorage.getItem("accessToken");
//     const user = JSON.parse(localStorage.getItem("user"));

//     // User is not logged in
//     if (!token || !user) {
//         return <Navigate to="/login" replace />;
//     }

//     // Role is not allowed
//     if (allowedRole && user.role !== allowedRole) {
//         return <Navigate to="/" replace />;
//     }

//     return children;
// };

// export default ProtectedRoute;



import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const token = localStorage.getItem("accessToken");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if (!user || user.role !== "admin") {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute