import "./styles/index.scss";
import { classNames } from "shared/lib/classNames/classNames";
import { useTheme } from "./providers/lib/useTheme";
import { AppRouter } from "./router";
import { Navbar } from "widgets/Navbar";
import { Sidebar } from "widgets/Sidebar";
import { Suspense } from "react";
import { useTranslation } from "react-i18next";

const App = () => {
  //? хук переключения темы
  const { theme } = useTheme();

  //? suspense это крутилка из коробки для асинхронных чанков
  //? для класса вызываем функцию в которую передаём основной , в объекте дополниельный и тему в массиве.
  return (
    <div className={classNames("app", {}, [theme])}>
      <Suspense fallback="">
        <Navbar />
        <div className="content-page">
          <Sidebar />
          <AppRouter />
        </div>
      </Suspense>
    </div>
  );
};

export default App;
