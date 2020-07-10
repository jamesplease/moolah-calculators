import smallDisplay from './small-display';

describe('smallDisplay', () => {
  it('handles 0 correctly', () => {
    expect(smallDisplay(0)).toEqual({
      value: 0,
      prefix: '',
      magnitude: '',
    });
  });

  it('handles 0.6 correctly', () => {
    expect(smallDisplay(0.6)).toEqual({
      value: 1,
      prefix: '+',
      magnitude: '',
    });

    expect(smallDisplay(-0.6)).toEqual({
      value: 1,
      prefix: '-',
      magnitude: '',
    });
  });

  it('handles 6 correctly', () => {
    expect(smallDisplay(6)).toEqual({
      value: 6,
      prefix: '+',
      magnitude: '',
    });
  });

  it('handles 60 correctly', () => {
    expect(smallDisplay(60)).toEqual({
      value: 60,
      prefix: '+',
      magnitude: '',
    });
  });

  it('handles 600 correctly', () => {
    expect(smallDisplay(600)).toEqual({
      value: 600,
      prefix: '+',
      magnitude: '',
    });

    expect(smallDisplay(600, 'medium')).toEqual({
      value: 600,
      prefix: '+',
      magnitude: '',
    });
  });

  it('handles 6,000 correctly', () => {
    expect(smallDisplay(6000)).toEqual({
      value: 6,
      prefix: '+',
      magnitude: 'k',
    });

    expect(smallDisplay(6000, 'medium')).toEqual({
      value: 6,
      prefix: '+',
      magnitude: 'k',
    });
  });

  it('handles 60,000 correctly', () => {
    expect(smallDisplay(60000)).toEqual({
      value: 60,
      prefix: '+',
      magnitude: 'k',
    });
  });

  it('handles 600,000 correctly', () => {
    expect(smallDisplay(600000)).toEqual({
      value: 600,
      prefix: '+',
      magnitude: 'k',
    });

    expect(smallDisplay(600000, { magnitude: 'medium' })).toEqual({
      value: 600,
      prefix: '+',
      magnitude: 'k',
    });
  });

  it('handles 6,000,000 correctly', () => {
    expect(smallDisplay(6000000)).toEqual({
      value: 6,
      prefix: '+',
      magnitude: 'mil',
    });

    expect(smallDisplay(6000000, { magnitude: 'medium' })).toEqual({
      value: 6,
      prefix: '+',
      magnitude: 'million',
    });
  });

  it('handles 60,000,000 correctly', () => {
    expect(smallDisplay(60000000)).toEqual({
      value: 60,
      prefix: '+',
      magnitude: 'mil',
    });

    expect(smallDisplay(60000000, { magnitude: 'medium' })).toEqual({
      value: 60,
      prefix: '+',
      magnitude: 'million',
    });
  });

  it('handles 600,000,000 correctly', () => {
    expect(smallDisplay(600000000)).toEqual({
      value: 600,
      prefix: '+',
      magnitude: 'mil',
    });
  });

  it('handles 6,000,000,000 correctly', () => {
    expect(smallDisplay(6000000000)).toEqual({
      value: 6,
      prefix: '+',
      magnitude: 'bil',
    });

    expect(smallDisplay(6000000000, 'medium')).toEqual({
      value: 6,
      prefix: '+',
      magnitude: 'billion',
    });
  });

  it('handles 60,000,000,000 correctly', () => {
    expect(smallDisplay(60000000000)).toEqual({
      value: 60,
      prefix: '+',
      magnitude: 'bil',
    });

    expect(smallDisplay(60000000000, 'medium')).toEqual({
      value: 60,
      prefix: '+',
      magnitude: 'billion',
    });
  });

  it('returns something for 6,000,000,000,000 correctly', () => {
    expect(smallDisplay(6000000000000)).toEqual({
      value: 6,
      prefix: '+',
      magnitude: '…',
    });

    expect(smallDisplay(6000000000000, 'medium')).toEqual({
      value: 6,
      prefix: '+',
      magnitude: '…',
    });
  });
});
