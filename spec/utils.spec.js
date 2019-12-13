const { expect } = require('chai');
const { formatDates, makeRefObj, formatComments } = require('../db/utils/utils');

describe('formatDates', () => {
  it('Check mutation: Should return a *new* array when passed an empty array', () => {
    expect(formatDates([])).to.not.equal([]);
  });
  it('Check mutation: should return a *new* object within the array if passed an object at index 0', () => {
    const input = [{}];
    const output = formatDates(input);
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
    const output = formatDates(input);
    expect(output[0].created_at).to.be.instanceOf(Date)
  });
  it('Should return an updated date format on multiple objects in a passed array', () => {
    const input = [
      {
        created_at: 1416140514171
      },
      {
        created_at: 1542284514171
      }
    ];
    const output = formatDates(input);
    expect(output[1].created_at).to.be.instanceOf(Date);
  });
});

describe('makeRefObj', () => {
  it('Check mutation: should return a *new* array when passed an empty array', () => {
    expect(makeRefObj([])).to.not.equal([]);
  });
  it('Check mutation: should return a *new* object within the array if passed an object at index 0', () => {
    const input = [{}];
    const output = formatDates(input);
    expect(output[0]).to.not.equal(input[0]);
  });
  it('Functionality should work for one object passed in the array', () => {
    const input = [
      {
        title: 'Test',
        article_id: 1
      }
    ];
    const output = makeRefObj(input);
    expect(output).to.have.keys('Test')
    expect(output.Test).to.equal(1);
  });
  it('Functionality should work for more than one object passed in an array', () => {
    const input = [
      {
        title: 'Test',
        article_id: 1
      },
      {
        title: 'Test2',
        article_id: 2
      }
    ];
    const output = makeRefObj(input);
    expect(output).to.have.keys("Test", "Test2");
  });
});

describe('formatComments', () => {});
