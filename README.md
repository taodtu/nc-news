# A Express + Knex + PSQL Northcoders-News Sever

The client App is hosted on [here](https://tao-nc-news-rest-client.netlify.com/) and the client app code is hosted on [Github](https://github.com/taodtu/nc-news-rest-client/tree/master/nc-news-rest-client)

Northcoders News is a social news aggregation, web content rating, and discussion website. Northcoders News has articles which are divided into topics. Each article has user curated ratings and can be up or down voted using the API. Users can also add comments about an article. Comments can also be up or down voted. A user can add comments and remove any comments which they have added.

This app builds the server with raw data from Northcoders using express, and stores data with PSQL.You can consume the built API via [here](https://nc-news-rest-api.herokuapp.com/), the endpoint can be consumed as below:
 "GET /api/topics": "get all the topics",
 "GET /api/users/:username": "get the user by username",
 "GET /api/articles/:article_id": "get the article by its ID",
 "PATCH /api/articles/:article_id": "update the votes of the article",
 "POST /api/articles/:article_id/comments": "Post a comment to the article by ID",
 "GET /api/articles/:article_id/comments": "get all comments to a article by article-ID",
 "GET /api/users/:username/comments": "get all comments to a author by username",
 "GET /api/articles": "get all articles in this resource",
 "PATCH /api/comments/:comment_id": "update the votes to a comment by its ID",
 "DELETE /api/comments/:comment_id": "delete a comment by its ID",
 "GET /api": "get the api endpoint instruction"


