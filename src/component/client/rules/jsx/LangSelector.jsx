import style from "../style/Rules.module.css";

export const LangSelector = ({ selectedLanguage, onLanguageChange }) => {
  return (
    <div className={style.btnContainer}>
      <div
        className={`${style.languageButton} ${
          selectedLanguage === "hindi" ? style.selected : ""
        }`}
        onClick={() => onLanguageChange("hindi")}
      >
        हिन्दी
      </div>
      <div
        className={`${style.languageButton} ${
          selectedLanguage === "english" ? style.selected : ""
        }`}
        onClick={() => onLanguageChange("english")}
      >
        English
      </div>
    </div>
  );
};
