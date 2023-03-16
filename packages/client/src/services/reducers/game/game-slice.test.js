import reducer from './game-slice';

const state = {
  ingredients: [],
  hasError: false,
  errors: [],
  currentError: null,
  orders: [],
  socketConnected: false,
  total: null,
  totalToday: null,
};
const mockIngredients = [1, 3, 'eded', undefined];
const mockError = 'some critical error';

describe('content reducer', () => {
  it('should return init state by default', () => {
    expect(reducer(undefined, {})).toEqual(state);
  });
  it('should set ingredients', () => {
    expect(reducer(undefined, { type: 'content/setIngredients', payload: mockIngredients }))
      .toEqual(
        expect.objectContaining({
          ingredients: expect.arrayContaining([...mockIngredients]),
        }),
      );
  });
  it('should set error', () => {
    expect(reducer(state, { type: 'content/setCurrentError', payload: mockError }))
      .toEqual(
        expect.objectContaining({
          errors: expect.arrayContaining([mockError]),
          hasError: true,
          currentError: mockError,
        }),
      );
  });
  it('should reset current error', () => {
    expect(reducer({ hasError: true, errors: ['firstErr', 'exists'], currentError: 'exists' }, { type: 'content/resetCurrentError' }))
      .toEqual({ hasError: false, errors: ['firstErr', 'exists'], currentError: null });
  });
});
