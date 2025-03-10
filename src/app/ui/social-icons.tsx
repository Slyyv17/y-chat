import Image from 'next/image';

export default function SocialIcons() {
    return (
        <div className="w-fit h-fit p-2 flex items-center justify-center gap-2">
            <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center">
                <span className="text-blue-600 text-xl">
                    <Image
                        src="/assets/imgs/facebook-svg.png"
                        alt="Facebook Icon"
                        width={25}
                        height={25}
                    />
                </span>
            </button>
            <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center">
                <span className="text-red-600 text-xl">
                    <Image
                        src="/assets/imgs/google-svg.png"
                        alt="Google Icon"
                        width={25}
                        height={25}
                    />
                </span>
            </button>
            <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center">
                <span className="text-black text-xl">
                    <Image
                        src="/assets/imgs/apple-svg.png"
                        alt="Apple Icon"
                        width={55}
                        height={55}
                    />
                </span>
            </button>
        </div>
    )
}