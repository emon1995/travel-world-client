import { HashLoader } from "react-spinners";

const Spinner = () => {
    return (
        <div className="h-[70vh] flex flex-col justify-center items-center">
            <HashLoader size={100} color="#47B1E2" />
        </div>
    );
};

export default Spinner;