import { useState } from 'react';

export default function PowerButton(): JSX.Element {
    const [isAnnounce, setIsAnnounce] = useState<boolean>(false);

    return (
        <div className="flex items-center justify-between w-full rounded-xl shadow-md bg-white px-4 py-6">
            <div>
                <h3 className="font-semibold text-xl text-neutral-800">
                    เปิดใช้งานบอท
                </h3>
                <p className="text-xs text-neutral-500">
                    เปิดให้น้องปูนแจ้ง AP เลย!
                </p>
            </div>
            <button
                onClick={() => setIsAnnounce(!isAnnounce)}
                className={`flex p-1 w-16 h-[34px] rounded-full duration-200 ${
                    isAnnounce
                        ? 'pl-1 bg-neutral-300'
                        : 'pl-[34px] bg-primary-500'
                }`}
            >
                <div className="h-full aspect-square rounded-full bg-white duration-300"></div>
            </button>
        </div>
    );
}
