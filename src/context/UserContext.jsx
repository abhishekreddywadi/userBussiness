import React, { useState } from "react";

const UserContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [navButtonClick, setNavButtonClick] = useState(false);
  const [showCompleteProfileForm, setShowCompleteProfileForm] = useState(false);
  const [showMiForm, setShowMiForm] = useState(false);
  const [showMBForm, setShowMBForm] = useState(false);

  const handleIdBack = () => {
    setShowCompleteProfileForm(true);
  };

  return (
    <UserContext.Provider
      value={{
        navButtonClick,
        setNavButtonClick,
        showCompleteProfileForm,
        setShowCompleteProfileForm,
        handleIdBack,
        showMiForm,
        setShowMiForm,
        showMBForm,
        setShowMBForm,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
