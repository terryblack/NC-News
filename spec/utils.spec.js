const { expect } = require('chai');
const { formatDates, makeRefObj, formatComments } = require('../db/utils/utils');

describe('formatDates', () => {
  it('Should return a *new* array when passed an empty array', () => {
    expect(formatDates([])).to.not.equal([]);
  });
  it('should return a *new* object within the array if passed an object at index 0', () => {
    const input = [
      {
        title: 'Living in the shadow of a great man',
        topic: 'mitch',
        author: 'butter_bridge',
        body: 'I find this existence challenging',
        created_at: 1542284514171,
        votes: 100
      }
    ];
    const output = formatDates(input)
    expect(output[0]).to.not.equal(input[0]);
  });
    it('Should return an updated date format object (from UNIX) when passed an array with one item containing "crated_at" key', () => {
    const input = [
      {
        title: 'Living in the shadow of a great man',
        topic: 'mitch',
        author: 'butter_bridge',
        body: 'I find this existence challenging',
        created_at: 1542284514171,
        votes: 100
      }
    ];
    const output = formatDates(input)
    expect(output[0].created_at).to.equal('Thu, 15 Nov 2018 12:21:54 GMT')
  });
});

describe('makeRefObj', () => {});

describe('formatComments', () => {});
