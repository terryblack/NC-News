const { expect } = require("chai");
const {
  formatDates,
  makeRefObj,
  formatComments
} = require("../db/utils/utils");

describe("formatDates", () => {
  it("Check mutation: Should return a *new* array when passed an empty array", () => {
    expect(formatDates([])).to.not.equal([]);
  });
  it("Check mutation: should return a *new* object within the array if passed an object at index 0", () => {
    const input = [{}];
    const output = formatDates(input);
    expect(output[0]).to.not.equal(input[0]);
  });
  it('Should return an updated date format object (from UNIX) when passed an array with one item containing "crated_at" key', () => {
    const input = [
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1542284514171,
        votes: 100
      }
    ];
    const output = formatDates(input);
    expect(output[0].created_at).to.be.instanceOf(Date);
  });
  it("Should return an updated date format on multiple objects in a passed array", () => {
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

describe("makeRefObj", () => {
  it("Check mutation: should return a *new* array when passed an empty array", () => {
    expect(makeRefObj([])).to.not.equal([]);
  });
  it("Check mutation: should return a *new* object within the array if passed an object at index 0", () => {
    const input = [{}];
    const output = formatDates(input);
    expect(output[0]).to.not.equal(input[0]);
  });
  it("Functionality should work for one object passed in the array", () => {
    const input = [
      {
        title: "Test",
        article_id: 1
      }
    ];
    const output = makeRefObj(input);
    expect(output).to.deep.equal({ Test: 1 });
  });
  it("Functionality should work for more than one object passed in an array", () => {
    const input = [
      {
        title: "Test",
        article_id: 1
      },
      {
        title: "Test2",
        article_id: 2
      }
    ];
    const output = makeRefObj(input);
    expect(output).to.deep.equal({ Test: 1, Test2: 2 });
  });
});

describe("formatComments", () => {
  it("it returns a new empty array when passed an empty array", () => {
    expect(formatComments([])).to.eql([]);
    expect(formatComments([])).to.not.equal([]);
  });
  it("returns new object with all correctly formatted required keys from array when passed single object in array", () => {
    const input = [
      {
        comment_id: 1,
        body: "test body",
        created_by: "random_user",
        belongs_to: "belong",
        created_at: 1511354163389
      }
    ];
    const articleRef = { belong: 1 };
    const output = formatComments(input, articleRef);
    expect(output[0]).to.have.keys(
      "author",
      "comment_id",
      "created_at",
      "article_id",
      "body"
    );
    expect(output[0].created_at).to.be.instanceOf(Date);
    expect(output[0].author).to.equal("random_user");
    expect(output[0].article_id).to.equal(1);
  });
  it("Check mutation: Should not mutate any objects in the array", () => {
    const input = [
      {
        comment_id: 1,
        body: "test body",
        created_by: "random_user",
        belongs_to: "belong",
        created_at: 1511354163389
      }
    ];
    const articleRef = { belong: 1, random_topic: 2 };
    const output = formatComments(input, articleRef);
    expect(input).to.not.equal(output);
  });
  it("returns new object with all correctly formatted required keys from array when passed multiple objects in the array", () => {
    const input = [
      {
        comment_id: 1,
        body: "test body",
        created_by: "random_user",
        belongs_to: "belong",
        created_at: 1511354163389
      },
      {
        comment_id: 2,
        body: "test body",
        created_by: "random_author",
        belongs_to: "random_topic",
        created_at: 1511354163389
      }
    ];
    const articleRef = { belong: 1, random_topic: 2 };
    const output = formatComments(input, articleRef);
    expect(output[1]).to.have.keys(
      "author",
      "comment_id",
      "created_at",
      "article_id",
      "body"
    );
    expect(output[1].created_at).to.be.instanceOf(Date);
    expect(output[1].author).to.equal("random_author");
  });
  it("Check mutation: Should not mutate any objects in the array", () => {
    const input = [
      {
        comment_id: 1,
        body: "test body",
        created_by: "random_user",
        belongs_to: "belong",
        created_at: 1511354163389
      }
    ];
    const articleRef = { belong: 1, random_topic: 2 };
    const output = formatComments(input, articleRef);
    expect(input).to.not.equal(output);
  });
});
