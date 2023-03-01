import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'shared/UI/Button/ui/Button';
import { getCounterValue } from '../modal/selectors/getCounterValue/getCounterValue';
import { counterActions } from '../modal/slice/counterSlice';

export function Counter() {
    const dispatch = useDispatch();

    const counterValue = useSelector(getCounterValue);

    function increment() {
        dispatch(counterActions.increment());
    }
    function decrement() {
        dispatch(counterActions.decrement());
    }

    return (
        <div>
            <h1 data-testid="value-title">
                value =
                {counterValue}
            </h1>
            <Button data-testid="increment-btn" onClick={increment}>
                increment
            </Button>
            <Button data-testid="decrement-btn" onClick={decrement}>
                decrement
            </Button>
        </div>
    );
}
