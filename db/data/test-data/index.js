exports.commentData = require('./comments').map(comment => {
 comment['created_at'] = new Date(comment['created_at']);
 return comment;
});;
exports.articleData = require('./articles').map(article => {
 article['created_at'] = new Date(article['created_at']);
 return article;
});
exports.topicData = require('./topics');
exports.userData = require('./users');
