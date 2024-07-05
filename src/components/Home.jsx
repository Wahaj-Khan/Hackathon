import { useNavigate } from "react-router-dom";
import Lottie from "react-lottie";
import animationData from "../assets/animations/loader.json";
import cubeLoader from "../assets/animations/cube.json";
import { FaArrowLeft } from "react-icons/fa6";
import { useState } from "react";
import { useGeneratedArchitecture } from "../context/ArchitectureContext";
import dummyProjects from "../assets/DummyProjects.json";

const Home = () => {
  const navigate = useNavigate();
  const {
    setGeneratedArchitecture,
    isLoading,
    setIsLoading,
    errorFlag,
    setErrorFlag,
  } = useGeneratedArchitecture();
  const [requirements, setRequirements] = useState("");

  const prompt = `
    You are an Expert Software Architecture Advisor. I will provide you with a detailed set of project requirements, and I need you to analyze them and provide the following:

    Architecture Pattern Recommendation: Suggest suitable architecture patterns and justify your recommendations based on the project requirements.
    Technology Stack Suggestion: Recommend appropriate technologies, frameworks, and tools.
    Security Practices suggestions: How to achieve security 
    Best Practices and Guidelines: Offer best practices for the chosen architecture and technologies, along with guidelines for implementation and deployment.

    Note: If the below provided text is not project requirements then reply "Please provide a valid requirements". (important)
  `;

  const handleRandomDetailsHandler = () => {
    const randomIndex = Math.floor(Math.random() * dummyProjects.length);
    const randomProject = dummyProjects[randomIndex];
    setRequirements(randomProject.description);
    setErrorFlag(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (requirements !== "") {
      setIsLoading(true);

      try {
        const apiKey = "AIzaSyAnyVKbfXMf-yJDrWuf7Z2iDnkr9yUEFBc";
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;

        const requestData = {
          contents: [{ parts: [{ text: prompt + requirements }] }],
        };

        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        const architecture = responseData.candidates[0].content.parts[0].text;

        setGeneratedArchitecture(architecture);
        setIsLoading(false);
        navigate("/result");
      } catch (error) {
        console.error("Error fetching response:", error);
        setGeneratedArchitecture(
          "Sorry - Something went wrong. Please try again!"
        );
      }
    } else {
      setErrorFlag(true);
    }
  };

  const defaultOptions1 = {
    loop: true,
    autoplay: true,
    animationData: cubeLoader,
    animationSpeed: 1.8,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const defaultOption2 = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    animationSpeed: 1.8,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="flex flex-col items-center mt-20">
      {isLoading ? (
        <div className="mt-40">
          <Lottie
            options={defaultOptions1}
            height={250}
            width={250}
            speed={1.5}
            isClickToPauseDisabled={true}
          />
        </div>
      ) : (
        <>
          <div className="relative w-[70%] sm:w-full flex justify-between sm:justify-center mt-14 sm:mt-0">
            <button className="relative" onClick={handleRandomDetailsHandler}>
              <Lottie
                options={defaultOption2}
                height={150}
                width={150}
                speed={1.5}
                isClickToPauseDisabled={true}
              />
            </button>
            <div className="absolute top-16 transform translate-y-1/2 left-[55%] text-white px-2 py-1 animate-bounce cursor-pointer">
              <FaArrowLeft className="inline mr-2" size={22} /> Generate random
              details
            </div>
          </div>
          <div className="flex flex-col items-center justify-center w-5/6 mt-3">
            <div
              className="w-full text-center max-w-xl bg-gray-800 rounded-lg mt-6 sm:mt-0 p-6"
            >
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
                Enter Your Project Details
              </h2>
              <form onSubmit={handleSubmit} className="flex flex-col">
                <textarea
                  placeholder="Enter details like: Your business problem statement, functional and non-functional requirements, scope, expected traffic, budget and timeline, examples and references or any other information related to your project."
                  className="bg-gray-700 h-52 text-gray-100 border-0 rounded-md p-2 mb-4 mt-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                  name="feedback"
                  value={requirements}
                  onChange={(e) => {
                    setRequirements(e.target.value);
                    setErrorFlag(false);
                  }}
                ></textarea>
                <button
                  className="bg-gradient-to-r from-indigo-500 to-blue-700 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-700 hover:to-blue-800 transition ease-in-out duration-150"
                  type="submit"
                >
                  Submit
                </button>
              </form>
              {errorFlag && (
                <p className="text-red-600 text-sm sm:text-base mt-4">
                  Please provide the project requirements
                </p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
