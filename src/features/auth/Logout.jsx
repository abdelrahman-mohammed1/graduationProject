import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from '../../ui/ButtonIcon';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useData } from "../../context/useData";

export default function Logout() {
    const navigate = useNavigate();

    const token = JSON.parse(localStorage.getItem('access_token'))
    console.log(token)
    const logout = async () => {
        try {
            const res = await fetch('https://we-care-server-seven.vercel.app/api/v1/auth/logout/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (res.ok) {

                await res.json();
                navigate("/login", { replace: true });
                toast.success('Logout successful.');
            } else {
                toast.error('Logout failed.');
            }
        } catch (error) {
            toast.error('An error occurred during logout.');
        }
    };

    return (
        <ButtonIcon onClick={logout}>
            <HiArrowRightOnRectangle />
        </ButtonIcon>
    );
}
