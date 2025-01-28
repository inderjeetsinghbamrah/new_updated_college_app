import { userState } from '@/stores/userStore'
import { useRecoilState } from 'recoil'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

const Logout = () => {
    const [user, setUser] = useRecoilState(userState);
    const navigate = useNavigate();

    const logoutAPI= import.meta.env.VITE_LOGOUT_API
    const handleLogout = async() => {
        try {
            const response = await axios.post(logoutAPI);

            if (response.status == 200)
                {
                    setUser({ isAuthenticated: false, username: null, role: null });
                    toast.success("You have been logged out successfully");
                    setTimeout(() => {
                        navigate('/');
                    },3000)
                }
        } catch (error) {
            toast.error("Log out Operation failed")
        }
    }
    return (
        <div>
            <Button variant="outline" onClick={handleLogout}>Logout</Button>
        </div>
    )
}

export default Logout
