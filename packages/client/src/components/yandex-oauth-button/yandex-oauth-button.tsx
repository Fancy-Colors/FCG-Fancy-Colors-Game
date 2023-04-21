import { Button, ButtonColor } from 'components/button';
import { oAuthApi } from 'api/oauth';
import { hasApiError } from 'utils/has-api-error';

export const YandexOAuthButton = () => {
  const onClick = async () => {
    const redirect = import.meta.env.VITE_YANDEX_OAUTH_REDIRECT_URI;
    const response = await oAuthApi.getServiceID(redirect);
    if (hasApiError(response)) {
      throw new Error(response.reason);
    }
    window.location.replace(
      `https://oauth.yandex.ru/authorize?response_type=code&client_id=${response.service_id}&redirect_uri=${redirect}`
    );
  };

  return (
    <Button
      size="medium"
      color={ButtonColor.COLORED}
      type="button"
      onClick={onClick}
    >
      Вход через Яндекс
    </Button>
  );
};
