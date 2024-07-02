import { Link } from 'react-router-dom';
import { FaFilePdf } from "react-icons/fa6";

const ResultPage = () => {
    // const location = useLocation();
    // const { text } = location.state || { text: '' };

    return (
        <div className="flex flex-col items-center justify-center mt-32 mb-8">
            <div className="w-full text-center max-w-3xl bg-gray-800 rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-white mb-4">Architecture</h2>
                <div className="flex flex-col w-full">
                    <p className='text-white text-justify'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet consectetur adipiscing elit pellentesque habitant. Vulputate odio ut enim blandit volutpat maecenas volutpat. In pellentesque massa placerat duis ultricies lacus. Quis risus sed vulputate odio. Leo integer malesuada nunc vel. Urna duis convallis convallis tellus. Neque sodales ut etiam sit amet nisl. Risus feugiat in ante metus dictum at tempor commodo ullamcorper. Amet consectetur adipiscing elit ut aliquam purus sit amet. Ut tristique et egestas quis ipsum suspendisse ultrices. Lectus nulla at volutpat diam ut venenatis. Ac turpis egestas integer eget aliquet. Eget magna fermentum iaculis eu non diam phasellus vestibulum lorem. Et netus et malesuada fames ac turpis. Hendrerit gravida rutrum quisque non tellus orci ac. Tristique nulla aliquet enim tortor at. Amet consectetur adipiscing elit pellentesque.
                        <br />
                        <br />
                        Fermentum leo vel orci porta non. Orci sagittis eu volutpat odio facilisis mauris sit. Duis at tellus at urna condimentum mattis pellentesque id nibh. Faucibus et molestie ac feugiat sed lectus vestibulum. Gravida in fermentum et sollicitudin ac orci phasellus. Commodo elit at imperdiet dui accumsan sit amet nulla. Non nisi est sit amet facilisis. Et odio pellentesque diam volutpat commodo sed egestas egestas. Viverra ipsum nunc aliquet bibendum enim facilisis gravida neque. Mauris a diam maecenas sed enim ut sem viverra. Ut porttitor leo a diam sollicitudin tempor id eu. In egestas erat imperdiet sed. Tristique senectus et netus et malesuada fames ac turpis. Enim neque volutpat ac tincidunt. Condimentum vitae sapien pellentesque habitant morbi. Consectetur adipiscing elit ut aliquam purus. Morbi tristique senectus et netus et malesuada fames ac turpis.
                    </p>
                    <Link to="/" >
                        <button className="w-full bg-gradient-to-r from-indigo-500 to-blue-700 text-xl text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-700 hover:to-blue-800 transition ease-in-out duration-150">
                            Go Back
                        </button>
                    </Link>
                    <button className="bg-gradient-to-r from-indigo-500 to-blue-700 text-xl text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-700 hover:to-blue-800 transition ease-in-out duration-150">
                        Download
                        <FaFilePdf className="inline ml-2" size={22} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ResultPage;
