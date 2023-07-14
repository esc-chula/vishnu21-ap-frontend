import { useAuth } from '@/contexts/AuthContext';

export default function Logout(): JSX.Element {
    const { logoutHandler } = useAuth();

    return (
        <div className="flex justify-center py-8">
            <button
                onClick={logoutHandler}
                className="border-primary-500 border-2 rounded-lg px-4 py-2 text-primary-500 font-medium"
            >
                ออกจากระบบ
            </button>
        </div>
    );
}
