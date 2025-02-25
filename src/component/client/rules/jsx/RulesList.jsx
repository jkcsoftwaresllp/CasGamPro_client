import React, { useEffect, useState } from "react";
import style from "../style/Rules.module.css";
import { apiCall } from "../../../common/apiCall";

export const RulesList = ({ language }) => {
  const [rules, setRules] = useState([]); // Default to Hindi

  useEffect(() => {
    const lang = language === "hindi" ? "HIN" : "ENG";

    const fetchRules = async () => {
      const response = await apiCall(
        `/auth-api/client/user/rules?language=${lang}`,
        "GET"
      );
      response?.data && setRules(response.data);
    };

    fetchRules();
  }, [language]);

  return (
    <div className={style.rulesContainer}>
      <h2>{language === "hindi" ? "नियम" : "Rules"}</h2>
      <ol>
        {rules.map((rule, index) => (
          <li key={index}>{rule.rule}</li>
        ))}
      </ol>
    </div>
  );
};
