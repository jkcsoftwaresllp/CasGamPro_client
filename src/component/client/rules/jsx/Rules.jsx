import { useState } from "react";
import style from "../style/Rules.module.css";
import { LangSelector } from "./LangSelector";
import { RulesList } from "./RulesList";
import { RotatingMessage } from "./RotatingMessage";

export const Rules = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("hindi"); // Default to Hindi

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };

  return (
    <div className={style.container}>
      <RotatingMessage headerMsg="Welcome: This is an important notification! Please take note of the following rules and guidelines." />

      {/* Language Selector */}
      <LangSelector
        selectedLanguage={selectedLanguage}
        onLanguageChange={handleLanguageChange}
      />
      <RulesList language={selectedLanguage} />
    </div>
  );
};
