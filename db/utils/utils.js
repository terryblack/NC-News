exports.formatDates = list => {
  return list.map(elem => {
    let newElem = { ...elem };
    newElem.created_at = new Date(newElem.created_at);
    return newElem;
  });
};

exports.makeRefObj = list => {
  const refObj = {};

  list.forEach(item => {
    refObj[item.title] = item.article_id;
  });
  return refObj;
};

exports.formatComments = (comments, articleRef) => {
  return comments.map(comment => {
    const formattedComment = { ...comment };
    formattedComment.author = formattedComment.created_by;
    formattedComment.article_id = articleRef[formattedComment.belongs_to];
    formattedComment.created_at = new Date(formattedComment.created_at);
    delete formattedComment.created_by;
    delete formattedComment.belongs_to;

    return formattedComment;
  });
};
