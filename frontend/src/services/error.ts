import { AxiosError } from 'axios';

interface ErrorInterface {
  error?: AxiosError;
  message?: TErrorMessage;
  errorTitle: string;
  errorText: string;
}

type TErrorMessage = {
  title: string;
  text: string;
};

/**
 * Custom class for api errors.
 * @param error AxiosError
 */
class ApiError implements ErrorInterface {
  error: AxiosError;

  constructor(error: AxiosError) {
    this.error = error;
  }

  get errorTitle() {
    if (this.error?.response) {
      return `Ошибка ${this.error.response.status}`;
    } else if (this.error?.code) {
      return axiosErrorTitle[this.error.code] || 'Ошибка';
    } else {
      return 'Ошибка';
    }
  }

  get errorText() {
    if (this.error?.response) {
      return responseText[this.error.response.status] || 'Неизвестная ошибка';
    } else if (this.error?.code) {
      return axiosErrorText[this.error.code] || 'Неизвестная ошибка';
    } else {
      return 'Неизвестная ошибка';
    }
  }
}

/**
 * Custom class for app errors.
 * @param message TErrorMessage
 */
class AppError implements ErrorInterface {
  message: TErrorMessage;

  constructor(message: TErrorMessage) {
    this.message = message;
  }

  get errorTitle() {
    return this.message.title;
  }

  get errorText() {
    return this.message.text;
  }
}

const axiosErrorTitle: { [key: string]: string } = {
  'ACCESS_TOKEN_REFRESH_ERROR': 'Ошибка токена',
  'ERR_NETWORK': 'Ошибка сети',
  'ECONNABORTED': 'Тайм-аут запроса',
};

const axiosErrorText: { [key: string]: string } = {
  'ACCESS_TOKEN_REFRESH_ERROR': 'Ошибка при обновлении токена доступа',
  'ERR_NETWORK': 'Ошибка получения данных от сервера',
  'ECONNABORTED': 'Ожидание ответа от сервера истекло',
};

const responseText: { [key: number]: string } = {
  400: 'Некорректный запрос',
  401: 'Требуется аутентификация',
  403: 'Запрещено',
  404: 'Ресурс не найден',
  408: 'Тайм-аут запроса',
  429: 'Слишком много запросов',
  500: 'Внутренняя ошибка сервера',
  501: 'Не реализовано',
  502: 'Плохой шлюз',
  503: 'Служба недоступна',
  504: 'Тайм-аут шлюза',
};

export { type ErrorInterface, ApiError, AppError };