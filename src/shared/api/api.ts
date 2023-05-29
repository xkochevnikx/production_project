import axios from 'axios';
import { USER_LOCALSTORAGE_KEY } from 'shared/consts/localstorage';

//! это инстанс для работы с url что бы каждый раз не тащить в асинкфанк аксиос и не писать адрес с заголовком. его мы передадим в глобальный стор и будем получать через эекстра аргументы и подставлять в запрос на бэк
export const $api = axios.create({
    //! используем глобальную переменную которая доступна благодаря плагину. Если при сборке мы не задали переменную окружения env то берётся дефолтное значение и передаётся в плагин
    baseURL: __API__,
    //! заголовки имитируют проверку авторизации пользователя и передают в запросе имя, бэк откажет на сложные запросы без него.
    // headers: {
    //     authorization: localStorage.getItem(USER_LOCALSTORAGE_KEY) || '',
    // },
});

//! interceptor это паттерн который перед любым запросом будет добавлять ключи в хедерс
$api.interceptors.request.use((config) => {
    if (config.headers) {
        config.headers.Authorization = localStorage.getItem(USER_LOCALSTORAGE_KEY) || '';
    }
    return config;
});
