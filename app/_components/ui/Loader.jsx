import { RingLoader } from "react-spinners";

const Loader = () => {
    return (
        <div
            className={`flex items-center flex-col gap-4 justify-center min-h-screen`}
        >
            <RingLoader size={64} />
            <p className="text-lg font-semibold animate-ping">
                Loading...
            </p>
        </div>
    );
};

export default Loader;
