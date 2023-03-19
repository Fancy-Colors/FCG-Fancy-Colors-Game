import reducer from './game-slice';

const state = {
  completedGame: null,
  gamesHistory: [],
};

const mockGameData = [
  {
    movesHistory: ['1213213', '12321314'],
    points: 100,
    time: 200,
    id: 'id-1',
  },
  {
    movesHistory: [],
    points: 0,
    time: 0,
    id: 'id-100500',
  },
];

describe('Редьюсер game', () => {
  it('должен записывать данные завершенной игры', () => {
    expect(
      reducer(state, {
        type: 'game/setGameCompleted',
        payload: mockGameData[0],
      })
    ).toEqual(
      expect.objectContaining({
        completedGame: expect.objectContaining({
          movesHistory: expect.arrayContaining([
            ...mockGameData[0].movesHistory,
          ]),
          points: 100,
        }),
      })
    );
  });

  it('должен сохранять и дополнять игровую историю, записывая в т.ч. время', () =>
    expect(
      reducer(state, {
        type: 'game/setGameCompleted',
        payload: mockGameData[1],
      })
    ).toEqual(
      expect.objectContaining({
        gamesHistory: expect.arrayContaining([
          expect.objectContaining({
            ...mockGameData[1],
            id: expect.stringMatching('id-100500'),
            completedAt: expect.stringMatching(
              /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/
            ),
          }),
        ]),
      })
    ));
});
