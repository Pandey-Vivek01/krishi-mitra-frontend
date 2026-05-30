import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, allowedRoles }) => {
    const { user, token } = useSelector((state) => state.auth);

    if (!token) {
        return <Navigate to="/login" />;
    }

    if (allowedRoles && !allowedRoles.includes(user?.accountType)) {
        return <Navigate to="/" />;
    }

    return children;
};

export default PrivateRoute;