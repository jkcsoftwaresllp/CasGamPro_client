import React from "react";
import style from "../../style/Rules.module.css";

export const RulesList = ({ language }) => {
  const rules = {
    hindi: [
      "नियम 1: कृपया नियमों को समझने के लिए यहां कुछ मिनट दें, और अपने अनुसार समझ लें।",
      "नियम 2: लॉग इन करने के बाद अपना पासवर्ड बदल लें |",
    ],
    english: [
      "Rule 1: Please give a few minutes to understand rules here, as best as you can.",
      "Rule 2: Change your password after you log in.",
    ],
  };

  return (
    <div className={style.rulesContainer}>
      <h2>{language === "hindi" ? "नियम" : "Rules"}</h2>
      <ul>
        {rules[language].map((rule, index) => (
          <li key={index}>{rule}</li>
        ))}
      </ul>
    </div>
  );
};
