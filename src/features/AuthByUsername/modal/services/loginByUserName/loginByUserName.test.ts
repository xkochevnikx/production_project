import { userActions } from 'entities/User';
import { TestAsyncThunk } from 'shared/lib/tests/testAsyncThunk/TestAsyncThunk';
import { loginByUserName } from './loginByUserName';

describe('loginByUserName.test', () => {
    test('fake succes login', async () => {
        //! тут фейковые ожидаемые нами данные от метода пост
        const userValue = { username: 'qwe', id: '1' };
        //! тут результат вызова фанка который вызывается с помощью функции хелпера. он возвращаем все замоканные внутри хелпера функции
        const thunk = TestAsyncThunk(loginByUserName);
        //! тут мы из возвращаемых хелпером функций вытаскиваем из екстра метод пост и мокаем его, по сути перехватываем вызов и говорим что ПОСЛЕ ВЫЗОВА callThunk с данными для регистрации в ответ ожидаем промис с моими фейковыми данными.
        thunk.api.post.mockReturnValue(Promise.resolve({ data: userValue }));
        //! ниже вызываем уже сам фанк
        const result = await thunk.callThunk({
            username: 'admin',
            password: '123',
        });
        //! ожидаем что диспатч вызовется три раза первый когда вызываем фанк, второй когда вернулся ответ и его передаём в userAction где храниться информация об авторизованном пользователе и третий раз когда происходит fulfilled
        expect(thunk.dispatch).toHaveBeenCalledTimes(3);
        //! проверяем что диспатч вызвался с аргументом который возвращает нам мокретёрнвалуе)
        expect(thunk.dispatch).toHaveBeenCalledWith(
            userActions.setAuthData(userValue),
        );
        //! что метод пост был вызван
        expect(thunk.api.post).toBeCalled();
        //! что результат выполенения fulfilled
        expect(result.meta.requestStatus).toBe('fulfilled');
        //! и что пейлоад это возвращаемый объект
        expect(result.payload).toEqual(userValue);
    });

    test('error login', async () => {
        const thunk = TestAsyncThunk(loginByUserName);
        thunk.api.post.mockReturnValue(Promise.resolve({ status: 403 }));
        const action = await thunk.callThunk({
            username: '123',
            password: '123',
        });
        expect(thunk.dispatch).toHaveBeenCalledTimes(2);
        expect(action.meta.requestStatus).toBe('rejected');
        expect(action.payload).toEqual('error');
    });
});
