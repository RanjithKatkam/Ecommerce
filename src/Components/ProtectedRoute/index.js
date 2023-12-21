import {Redirect, Route} from "react-router-dom"

function ProtectedRoute(props) {
    const userName = localStorage.getItem("LoginEmail")
    const password = localStorage.getItem("LoginPassword")
    if (userName === null && password === null) {
        return <Redirect to="/login" />
    }
    return <Route {...props} />
}

export default ProtectedRoute