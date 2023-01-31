describe('get names', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('gets the list of names', async () => {
    jest.doMock('../name', () => ({
      __esModule: true,
      names: ['Carol', 'Dave'],
    }));
    const { getNames } = await import('../getName');
    expect(getNames()).toEqual(['Carol', 'Dave']);
    expect(getNames()).toHaveLength(2);
  });
});

describe('get Persons', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('gets the list of names', async () => {
    jest.doMock('../name', () => ({
      __esModule: true,
      persons: [
        { Name: 'Carol', age: '15' },
        { name: 'Dave', age: '18' },
      ],
    }));
    const { getPersons } = await import('../getName');
    expect(getPersons()).toEqual([
      { Name: 'Carol', age: '15' },
      { name: 'Dave', age: '18' },
    ]);
    expect(getPersons()).toHaveLength(2);
  });
});
