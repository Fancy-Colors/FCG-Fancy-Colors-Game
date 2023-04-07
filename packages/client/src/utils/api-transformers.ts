import { UserDTO, GamesListDTO } from 'api/types';

export function transformUser(data: UserDTO): User {
  return {
    id: data.id,
    login: data.login,
    firstName: data.first_name,
    secondName: data.second_name,
    displayName: data.display_name,
    avatar: data.avatar,
    phone: data.phone,
    email: data.email,
  };
}

export function transformGameList(data: GamesListDTO): GamesListDTO {
  return data.map((game) => {
    return {
      ...game,
      preview: `https://fancy-api.kurkov.online/${game.preview}`,
    };
  });
}
