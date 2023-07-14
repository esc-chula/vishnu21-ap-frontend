'use client';
import APSelection from '@/components/APSelection';
import Logout from '@/components/Logout';
import PowerButton from '@/components/PowerButton';
import { useAuth } from '@/contexts/AuthContext';
import { useLiff } from '@/contexts/LiffContext';
import { FiCheckSquare, FiSquare } from 'react-icons/fi';

export default function Home() {
    const liff = useLiff();
    const { user } = useAuth();

    return (
        <div className="space-y-4">
            <PowerButton />
            <APSelection />
            <Logout />
        </div>
    );
}
