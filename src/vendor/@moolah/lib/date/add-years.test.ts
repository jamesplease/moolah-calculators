import addYears from './add-years';

describe('addYears', () => {
  it('should work as expected', () => {
    expect(
      addYears(
        {
          month: 10,
          year: 1991,
        },
        5
      )
    ).toEqual({
      month: 10,
      year: 1996,
    });
  });
});
