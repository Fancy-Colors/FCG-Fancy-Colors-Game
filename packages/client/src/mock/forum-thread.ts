import { ForumMessageProps } from 'components/forum-message/forum-message';

export const thread: {
  title: string;
  messages: Omit<ForumMessageProps, 'handleReply'>[];
} = {
  title: 'Lorem ipsum dolor sit amet, consectetur adipiscing',
  messages: [
    {
      id: 1,
      name: 'Логин',
      date: '2023-03-05T12:00:09.337Z',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Morbi tristique senectus et netus et. Nisi lacus sed viverra tellus in hac habitasse platea. Dictum non consectetur a erat nam at lectus urna duis. Arcu dictum varius duis at. Ornare lectus sit amet est placerat in egestas erat. Dui id ornare arcu odio ut  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Morbi tristique senectus et netus et. Nisi lacus sed viverra tellus in hac habitasse platea. Dictum non consectetur a erat nam at lectus urna duis. Arcu dictum varius duis at. Ornare lectus sit amet est placerat in  ',
    },
    {
      id: 2,
      name: 'Логин',
      date: '2023-03-05T12:00:09.337Z',
      text: 'Lorem ipsum dolor sit amet,',
    },
    {
      id: 3,
      name: 'Логин',
      date: '2023-03-05T12:00:09.337Z',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Morbi tristique senectus et netus et. Nisi lacus sed viverra tellus in hac habitasse platea. Dictum non consectetur a erat nam at lectus urna duis. Arcu dictum varius duis at. Ornare lectus sit amet est placerat in egestas erat. Dui id ornare arcu odio ut  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Morbi tristique senectus et netus et. Nisi lacus sed viverra tellus in hac habitasse platea. Dictum non consectetur a erat nam at lectus urna duis. Arcu dictum varius duis at. Ornare lectus sit amet est placerat in  ',
    },
    {
      id: 4,
      name: 'Логин',
      date: '2023-03-05T12:00:09.337Z',
      text: 'Lorem ipsum dolor sit amet,',
    },
  ],
};
