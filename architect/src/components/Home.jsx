import { useNavigate } from 'react-router-dom';
import Lottie from 'react-lottie';
import animationData from '../assets/animations/loader.json';
// import { useState } from 'react';

const Home = () => {
    // const [text, setText] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/result');
    };

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        animationSpeed: 1.8,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };

    return (
        <div className="flex flex-col items-center mt-20">
            <Lottie options={defaultOptions} height={250} width={250} speed={1.8}/>
            <div className="flex flex-col items-center justify-center w-5/6 mt-10">
                <div className="w-full text-center max-w-lg bg-gray-800 rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-bold text-white mb-4">Enter Software Details</h2>
                    <form onSubmit={handleSubmit} className="flex flex-col">
                        <textarea 
                            placeholder="Enter details here..." 
                            className="bg-gray-700 text-gray-100 border-0 rounded-md p-2 mb-4 mt-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" 
                            name="feedback">
                        </textarea>
                        <button 
                            className="bg-gradient-to-r from-indigo-500 to-blue-700 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-700 hover:to-blue-800 transition ease-in-out duration-150" 
                            type="submit">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Home;
