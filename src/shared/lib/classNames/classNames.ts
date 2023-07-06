export type Mode = Record<string, boolean | string | undefined>;

export function classNames(
    cls: string,
    mods: Mode = {},
    additional: Array<string | undefined> = [],
): string {
    //! тут кароче возвращаем массив который в итоге склеим в строку с пробелом между эл-ми , в него разворачиваем первый класс потом дополнительные не обязательные и дальше надо перебрать объект mods у объектов есть метод энтрис он возвращает кортеж(массив с двумя элементами) в котором ключ и значение тоже лежат в массиве. дальше этот массив мы фильтруем и оставляем те кортежи в массиве в которых значение тру. дальше по оставшемуся массиву мапимся и оставляем только ключи и в конце все эти ключи записываем строкой через пробел. это и возвращаем
    return [
        cls,
        ...additional.filter(Boolean),
        ...Object.entries(mods)
            //! идём фильтром по массиву и возвращаем только те кортежи у которых значение тру
            .filter(([className, value]) => Boolean(value))
            //! потом по оставшимся кортежам идём и возвращаем только названия классов и в конце склеиваем их в строку
            .map(([className, value]) => className),
    ].join(' ');
}

//! например спускаем в компонент флаг коллапсед который переключает сохранённое в стейте состояние с тру на фолс с фолс на тру. и получается по условию навешиваем класс коллапсед. если в этом пропсе лежит тру то мод в функции класснеймс вернет этот класс вместе с остальной строкой классов. и для него в стилях уже прописаны стили. а из адишинал массива возвращается любой пропс туда переданный лишь бы не был андефайнд
// todo classNames('remove-btn', { [cls.collapsed]: collapsed }, ['btn']);
