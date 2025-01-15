import React from "react";
import style from "../../style/Rules.module.css";

export const RulesList = ({ language }) => {
  const rules = {
    hindi: ["नियम 1: कृपया स्वच्छता बनाए रखें।", "नियम 2: समय का पालन करें।"],
    english: [
      "Rule 1: Please maintain cleanliness.",
      "Rule 2: Be punctual at all times.",
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
