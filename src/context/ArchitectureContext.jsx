import { createContext, useContext, useState } from "react";

const ArchitectureContext = createContext();

export const useGeneratedArchitecture = () => useContext(ArchitectureContext);

export const GeneratedArchitectureProvider = ({ children }) => {
  const [generatedArchitecture, setGeneratedArchitecture] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <ArchitectureContext.Provider
      value={{
        generatedArchitecture,
        setGeneratedArchitecture,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </ArchitectureContext.Provider>
  );
};
