import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/classNames/classNames";
import { Button, ThemeButton } from "../../../shared/UI/Button/ui/Button";

interface LangSwitcherProps {
   className?: string;
}

export const LanguageSwitcher = ({ className }: LangSwitcherProps) => {
   const { t, i18n } = useTranslation();

   const toggle = async () => {
      i18n.changeLanguage(i18n.language === "ru" ? "en" : "ru");
   };

   return (
      <Button
         className={classNames("", {}, [className])}
         theme={ThemeButton.CLEAR}
         onClick={toggle}
      >
         {t("Язык")}
      </Button>
   );
};
