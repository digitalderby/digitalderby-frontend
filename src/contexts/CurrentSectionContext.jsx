import { createContext, useContext, useState } from 'react';

const CurrentSectionContext = createContext();

export const useCurrentSection = () => useContext(CurrentSectionContext);

export const CurrentSectionProvider = ({ children }) => {
  const [currentSection, setCurrentSection] = useState('dashboard');

  return (
    <CurrentSectionContext.Provider value={{ currentSection, setCurrentSection }}>
      {children}
    </CurrentSectionContext.Provider>
  );
};
