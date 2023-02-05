import "./styles/index.scss";
import { Counter } from "./counter";
import { Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
import { Suspense, useContext, useState } from "react";
import { AboutPageAsync } from "./pages/AboutPage/AboutPage.async";
import { MainPageAsync } from "./pages/MainPage/MainPage.async";
import { useTheme } from "./theme/useTheme";
import { classNames } from "./helpers/classNames/classNames";

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
      <Counter />
    </div>
  );
};

export default App;
