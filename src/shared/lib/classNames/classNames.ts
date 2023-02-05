type Mode = Record<string, boolean | string>;

export function classNames(
  cls: string,
  mods: Mode,
  additional: string[]
): string {
  //? тут кароче возвращаем массив который в итоге склеим в строку с пробелом между эл-ми , в него разворачиваем первый класс потом дополнительные не обязательные и дальше надо перебрать объект mods у объектов есть метод энтрис он возвращает кортеж в котором ключ и значение тоже лежат в массиве. дальше этот массив мы фильтруем и оставляем те кортежи в массиве в которых значение тру. дальше по оставшемуся массиву мапимся и оставляем только ключи и в конце все эти ключи записываем строкой через пробел. это и возвращаем
  return [
    cls,
    ...additional,
    Object.entries(mods)
      .filter(([className, value]) => Boolean(value))
      .map(([className, value]) => className),
  ].join(" ");
}

//! например
classNames("remove-btn", { hovered: true, selectable: true, red: false }, [
  "btn",
]);
