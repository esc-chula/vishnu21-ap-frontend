import { useState } from 'react';
import { FiMinus, FiPlus } from 'react-icons/fi';

const Edit: React.FC = () => {
    const [offset, setOffset] = useState<number>(0);

    const announceHandler = async () => {
        setOffset(0);
    };

    return (
        <div className="w-full rounded-xl px-6 py-4 select-none">
            <div className="flex justify-between">
                <div className="space-x-1">
                    <span className="font-bold text-primary-500 text-6xl">
                        {offset === 0 ? 0 : offset > 0 ? `+${offset}` : offset}
                    </span>
                    <span className="font-bold text-neutral-400">นาที</span>
                </div>
                <div className="flex flex-col space-y-6 items-center">
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => setOffset((prev) => prev + 1)}
                            onPointerDown={() => {
                                const timeout = setTimeout(() => {
                                    const interval = setInterval(() => {
                                        setOffset((prev) => prev + 1);
                                    }, 100);
                                    document.addEventListener(
                                        'pointerup',
                                        () => clearInterval(interval),
                                        { once: true }
                                    );
                                }, 300);
                                document.addEventListener(
                                    'pointerup',
                                    () => clearTimeout(timeout),
                                    { once: true }
                                );
                            }}
                            className="text-2xl text-neutral-400 rounded-full shadow-md p-3 bg-white"
                        >
                            <FiPlus />
                        </button>
                        <button
                            onClick={() => setOffset((prev) => prev - 1)}
                            onPointerDown={() => {
                                const timeout = setTimeout(() => {
                                    const interval = setInterval(() => {
                                        setOffset((prev) => prev - 1);
                                    }, 100);
                                    document.addEventListener(
                                        'pointerup',
                                        () => clearInterval(interval),
                                        { once: true }
                                    );
                                }, 300);
                                document.addEventListener(
                                    'pointerup',
                                    () => clearTimeout(timeout),
                                    { once: true }
                                );
                            }}
                            className="text-2xl text-neutral-400 rounded-full shadow-md p-3 bg-white"
                        >
                            <FiMinus />
                        </button>
                    </div>
                    {offset !== 0 && (
                        <button
                            onClick={announceHandler}
                            className="font-bold text-white bg-primary-500 px-6 py-2 rounded-xl shadow-md text-sm"
                        >
                            ประกาศ
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Edit;
