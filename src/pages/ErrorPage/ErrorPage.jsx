import { Link, useRouteError } from "react-router-dom";
import { HiArrowNarrowLeft } from "react-icons/hi";
import Lottie from "lottie-react";
import errorImg from "../../assets/error-page.json";

const ErrorPage = () => {
    const { error } = useRouteError();

    return (
        <section className="flex items-center h-screen p-16 bg-gray-100 text-gray-900 bg-[url('src/assets/404-Page.png')] bg-cover">
            <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">

                <div className="max-w-md text-center">

                    <Lottie animationData={errorImg} loop={true} />
                    <p className="text-2xl font-semibold md:text-3xl text-red-800 mb-8">
                        {error?.message}
                    </p>
                    <Link to="/" className="btn btn-error text-white">
                        <HiArrowNarrowLeft />
                        Back to homepage
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ErrorPage;