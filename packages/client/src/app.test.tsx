import { render, screen } from '@testing-library/react';
import { Button } from './components/button';
const appContent = 'Меню';

// @ts-ignore
global.fetch = jest.fn(() =>
  Promise.resolve({ json: () => Promise.resolve('hey') })
);

test('Example test', async () => {
  await render(<Button>{appContent}</Button>);
  expect(screen.getByText(appContent)).toBeDefined();
});
