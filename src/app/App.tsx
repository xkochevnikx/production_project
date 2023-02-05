import "./styles/index.scss";
import { Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
import { Suspense } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { useTheme } from "./providers/lib/useTheme";
import { AboutPageAsync } from "pages/AboutPage";
import { MainPageAsync } from "pages/MainPage";

const App = () => {
  //? хук переключения темы
  const { theme, toggleTheme } = useTheme();

  //? suspense это крутилка из коробки для асинхронных чанков
  //? для класса вызываем функцию в которую передаём основной , в объекте дополниельный и тему в массиве.
  return (
    <div className={classNames("app", {}, [theme])}>
      <button onClick={toggleTheme}>toggle theme</button>
      <Link to={"/"}>главная</Link>
      <Link to={"/about"}>о сайте</Link>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path={"/about"} element={<AboutPageAsync />} />
          <Route path={"/"} element={<MainPageAsync />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
