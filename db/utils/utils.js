exports.formatDates = list => {
  return list.map(elem => {
    let newElem = { ...elem };
    newElem.created_at = new Date(newElem.created_at)
    return newElem;
  });
};

exports.makeRefObj = list => {
  const refObj = {};

  list.forEach(item => {
      refObj[item.title] = item.article_id;
  })
  return refObj;
};

exports.formatComments = (comments, articleRef) => {};
