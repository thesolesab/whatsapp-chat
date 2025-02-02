import { useCallback, useState } from 'react';
import axios from 'axios';

const useHttp = () => {
    const [loadingSend, setLoadingSend] = useState(false); // Для отправки сообщений
    const [loadingFetch, setLoadingFetch] = useState(false); // Для получения уведомлений
    const [error, setError] = useState(null);

    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        // Определяем, какой тип запроса выполняется
        const isSendRequest = method === 'POST';
        const isFetchRequest = method === 'GET';

        if (isSendRequest) setLoadingSend(true);
        if (isFetchRequest) setLoadingFetch(true);

        setError(null);

        const config = {
            url,
            method,
            data: body,
            headers: {
                ...(method !== 'DELETE' && { 'Content-Type': 'application/json' }),
                ...headers,
            },
        };

        try {
            const response = await axios(config);

            // Пытаемся распарсить ответ как JSON, если это возможно
            let data;
            try {
                data = JSON.parse(response.data);
            } catch (e) {
                // Если ответ не JSON, возвращаем его как есть
                data = response.data;
            }

            if (isSendRequest) setLoadingSend(false);
            if (isFetchRequest) setLoadingFetch(false);

            return data;
        } catch (error) {
            if (isSendRequest) setLoadingSend(false);
            if (isFetchRequest) setLoadingFetch(false);

            setError(error.message);
            throw error;
        }
    }, []);

    const clearError = useCallback(() => {
        setError(null);
    }, []);

    return { loadingSend, loadingFetch, request, error, clearError };
};

export default useHttp;