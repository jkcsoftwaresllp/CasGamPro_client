import { useState } from "react";
import style from "../style/Rules.module.css";
import { LangSelector } from "../jsx/rules/LangSelector";
import { NotificationBox } from "../jsx/rules/NotificationBox";
import { RulesList } from "../jsx/rules/RulesList";

export const Rules = () => {
  const [isNotificationVisible, setNotificationVisible] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState("hindi"); // Default to Hindi

  const hideNotification = () => {
    setNotificationVisible(false);
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };

  return (
    <div className={style.container}>
      <div className={style.rotateContainer}>
        <div className={style.rotating}>
          Welcome : This is an important notification! Please take note of the
          following rules and guidelines.
        </div>
      </div>

      {/* Language Selector */}
      <LangSelector
        selectedLanguage={selectedLanguage}
        onLanguageChange={handleLanguageChange}
      />
      <RulesList language={selectedLanguage} />

      {/* Notification Modal */}
      {isNotificationVisible && <NotificationBox onClose={hideNotification} />}
    </div>
  );
};
