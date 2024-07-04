import { useNavigate } from "react-router-dom";
import Lottie from "react-lottie";
import animationData from "../assets/animations/loader.json";
import { useState } from "react";
import { useGeneratedArchitecture } from "../context/ArchitectureContext";
import Loader from "react-loaders";

const Home = () => {
  let loader = <Loader type="ball-grid-pulse" active={true} />;
  const navigate = useNavigate();
  const { setGeneratedArchitecture, isLoading, setIsLoading } =
    useGeneratedArchitecture();

  const [requirements, setRequirements] = useState("");
  const prompt = `
You are an Expert Software Architecture Advisor. I will provide you with a detailed set of project requirements, and I need you to analyze them and provide the following:

Architecture Pattern Recommendation: Suggest suitable architecture patterns and justify your recommendations based on the project requirements.
Technology Stack Suggestion: Recommend appropriate technologies, frameworks, and tools, including the pros and cons of each suggestion.
Security Practices suggestions: How to achieve security 
Best Practices and Guidelines: Offer best practices for the chosen architecture and technologies, along with guidelines for implementation and deployment.`;
  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    setGeneratedArchitecture(
      "Loading your answer... \n It might take up to 10 seconds"
    );

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
      console.error("Error fetching data:", error);
      setGeneratedArchitecture(
        "Sorry - Something went wrong. Please try again!"
      );
    }
  };

  const defaultOptions = {
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
      <Lottie options={defaultOptions} height={250} width={250} speed={1.8} />
      <div className="flex flex-col items-center justify-center w-5/6 mt-10">
        {isLoading ? (
          loader
        ) : (
          <div
            className={`w-full text-center max-w-6xl bg-gray-800 rounded-lg shadow-md p-6`}
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Enter Your Project Details
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col">
              <textarea
                placeholder="Enter details here..."
                className="bg-gray-700 h-full text-2xl text-gray-100 border-0 rounded-md p-2 mb-4 mt-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                name="feedback"
                onChange={(e) => {
                  setRequirements(e.target.value);
                }}
              ></textarea>
              <button
                className="bg-gradient-to-r text-2xl from-indigo-500 to-blue-700 text-white font-bold py-3 px-4 rounded-md mt-4 hover:bg-indigo-700 hover:to-blue-800 transition ease-in-out duration-150"
                type="submit"
              >
                Submit
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
