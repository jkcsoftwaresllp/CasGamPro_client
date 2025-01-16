import { useState } from "react";
import style from "../style/Rules.module.css";
import { LangSelector } from "../jsx/rules/LangSelector";
import { NotificationBox } from "../jsx/rules/NotificationBox";
import { RulesList } from "../jsx/rules/RulesList";
import { RotatingMessage } from "../jsx/rules/RotatingMessage";

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
      <RotatingMessage headerMsg="Welcome: This is an important notification! Please take note of the following rules and guidelines." />

      {/* Language Selector */}
      <LangSelector
        selectedLanguage={selectedLanguage}
        onLanguageChange={handleLanguageChange}
      />
      <RulesList language={selectedLanguage} />

      {/* Notification Modal */}
      {isNotificationVisible && (
        <NotificationBox
          onClose={hideNotification}
          notificationText="This is an important notification! Please take note of the following
        rules and guidelines carefully read kre."
        />
      )}
    </div>
  );
};
