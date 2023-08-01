import { useSelector } from 'react-redux';
import { IStateSchema } from '@/app/providers/StoreProviders';

type Selector<T> = (state: IStateSchema) => T;
type Result<T> = [() => T, Selector<T>];
/**
 * Хелпер, упрощает работу с селекторами
 * @selector аргумент на вход
 *
 */

export function buildSelector<T>(
    selector: Selector<T>,
): Result<T> {
    const useSelectorHook = () => useSelector(selector);

    return [useSelectorHook, selector];
}
