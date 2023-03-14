import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tabs } from './tabs';

describe('components/Tabs', () => {
  const tabs = [
    {
      key: 'test-1',
      label: 'Test 1',
    },
    {
      key: 'test-2',
      label: 'Test 2',
    },
  ];

  it('should render tabs', () => {
    const view = render(
      <Tabs tabs={tabs} activeTab="test-1" onChange={jest.fn} />
    );

    expect(view.getByRole('button', { name: 'Test 1' })).toBeInTheDocument();
    expect(view.getByRole('button', { name: 'Test 2' })).toBeInTheDocument();
    expect(view.getAllByRole('button')).toHaveLength(2);
  });

  it('should fire `onChange` event', async () => {
    const user = userEvent.setup();
    const onChangeFn = jest.fn();
    const view = render(
      <Tabs tabs={tabs} activeTab="test-1" onChange={onChangeFn} />
    );

    await user.click(view.getByRole('button', { name: 'Test 2' }));

    expect(onChangeFn).toHaveBeenCalledTimes(1);
    expect(onChangeFn).toHaveBeenCalledWith('test-2');
  });

  it('should render active tab', () => {
    const view = render(
      <Tabs tabs={tabs} activeTab="test-2" onChange={jest.fn} />
    );

    expect(view.getByRole('button', { name: 'Test 2' })).toHaveClass('active');
  });

  it('should change active tab', () => {
    const mockFn = jest.fn();
    const view = render(
      <Tabs tabs={tabs} activeTab="test-2" onChange={mockFn} />
    );

    expect(view.getByRole('button', { name: 'Test 2' })).toHaveClass('active');

    view.rerender(<Tabs tabs={tabs} activeTab="test-1" onChange={mockFn} />);

    expect(view.getByRole('button', { name: 'Test 1' })).toHaveClass('active');
    expect(view.getByRole('button', { name: 'Test 2' })).not.toHaveClass(
      'active'
    );
  });
});
