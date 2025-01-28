import {BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom"
import { useRecoilValue } from "recoil"
import {Roles, userState} from "./stores/userStore.ts"
import Signin from "./components/Signin.tsx"
import { ProtectedRoute } from "./components/ProtectedRoute.tsx"
import { Home as AdminHome } from "./components/admin/Home.tsx"
import {Home as TeacherHome} from "./components/teacher/Home.tsx"
import Logout from "./components/common/Logout.tsx"
const App = () => {
    const user = useRecoilValue(userState)

    return (
            <Router>
                <Routes>
                    <Route
                        path="/logout"
                        element={
                            !user.isAuthenticated ?
                                <Navigate to="/" replace={true} /> :
                                <Logout/>
                        }
                    />
                    <Route path="/" element={user.isAuthenticated ?
                        (<Navigate to={user.role === Roles.ADMIN ? "/admin-dashboard" : "/teacher-dashboard"} />) :
                        <Signin />
                    } />
                    <Route
                        path="/admin-dashboard"
                        element={
                            <ProtectedRoute allowedRoles={[Roles.ADMIN]}>
                                <AdminHome/>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/teacher-dashboard"
                        element={
                            <ProtectedRoute allowedRoles={[Roles.TEACHER]}>
                                <TeacherHome/>
                            </ProtectedRoute>
                        }
                    />
                    <Route/>
                </Routes>
            </Router>
    )
}

export default App
