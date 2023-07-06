import { ILoginSchema } from '../types/loginSchema';
import { loginActions, loginReducer } from './loginSlice';

describe('loginSlice.test', () => {
    test('username test', () => {
        const state: DeepPartial<ILoginSchema> = { username: '123' };
        expect(
            loginReducer(
                state as ILoginSchema,
                loginActions.setUsername('12345'),
            ),
        ).toEqual({
            username: '12345',
        });
    });

    test('password test', () => {
        const state: DeepPartial<ILoginSchema> = { password: '123' };
        expect(
            loginReducer(
                state as ILoginSchema,
                loginActions.setPassword('12345'),
            ),
        ).toEqual({
            password: '12345',
        });
    });
});
