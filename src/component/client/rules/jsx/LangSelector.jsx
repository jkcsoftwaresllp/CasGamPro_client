import { Button } from "../../../common/Button";
import style from "../style/Rules.module.css";

export const LangSelector = ({ selectedLanguage: lang, onLanguageChange }) => {
  return (
    <div className={style.btnContainer}>
      <div className={`${lang === "hindi" ? style.selected : ""}`}>
        <Button label="हिन्दी" onClick={() => onLanguageChange("hindi")} />
      </div>

      <div className={`${lang === "english" ? style.selected : ""}`}>
        <Button label="English" onClick={() => onLanguageChange("english")} />
      </div>
    </div>
  );
};
