exports.formatDates = list => {
  return list.map(elem => {
    let newElem = { ...elem };
    newElem.created_at = new Date(newElem.created_at).toUTCString();
    return newElem;
  });
};

exports.makeRefObj = list => {};

exports.formatComments = (comments, articleRef) => {};
