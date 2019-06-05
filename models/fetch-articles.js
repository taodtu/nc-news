const connection = require("../db/connection");

exports.fetchArticles = async ({ sort_by = 'created_at', order = 'desc', author, topic }) => {

 if (!['asc', 'desc'].includes(order)) return await Promise.reject({ status: 400, msg: 'Wrong Order Query' });

 return await connection
  .select('articles.*')
  .count({ comment_count: 'comment_id' })
  .from('articles')
  .modify(query => {
   if (author) query.where({ "articles.author": author });
   else if (topic) query.where({ "articles.topic": topic })
  })
  .leftJoin('comments', 'comments.article_id', '=', 'articles.article_id')
  .groupBy('articles.article_id')
  .orderBy(sort_by, order)
  .then(articles => articles.map(article => {
   article.comment_count = +article.comment_count;
   return article
  }));
}

exports.checkExist = async (member, tables, key) => {
 if (!member) return true

 else {
  const memberDB = await connection
   .select('*')
   .from(tables)
   .where({ [key]: member })
   .returning('*')

  return memberDB[0] ? true : Promise.reject({ status: 404, msg: 'Not Found' })
 }
}


// exports.fetchArticles = async ({ sort_by = 'created_at', order = 'desc' }) => {
//  if (!['asc', 'desc'].includes(order)) return await Promise.reject({ status: 400, msg: 'Wrong Order Query' })

//  const articles = await connection.select('*').from('articles').orderBy(sort_by, order).returning('*');

//  const result = await Promise.all(articles.map(async article => {
//   const comments = await connection.select('article_id').from('articles').where({ article_id: article.article_id }).returning('*');
//   return { ...article, comment_count: comments.length }
//  }))
//  if (order = 'desc') { return result.sort((a, b) => b[sort_by] - a[sort_by]) }
//  if (order = 'asc') { return result.sort((a, b) => a[sort_by] - b[sort_by]) }
// };