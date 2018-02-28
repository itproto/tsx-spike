// API
const fetch = require("node-fetch");
const BASE_URL = "http://localhost:3000/tapi/";

function rest(route) {
  return fetch(`${BASE_URL}${route}`).then(res => res.json());
}

/*

function fetchUsers() {
  return fetchResponseByURL("/users/").then(json => json.people);
}

function fetchUserById(relativeURL) {
  return fetchResponseByURL(relativeURL).then(json => json.person);
}
*/

const {
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt
} = require("graphql");

//TYPES
// comment   { "id": 3, "content": "Comment 3", "userId": 6, "postId": 1 },
const CommentType = new GraphQLObjectType({
  name: "Comment",
  fields: () => ({
    id: {
      type: GraphQLID
    },
    content: {
      type: GraphQLString
    },
    user: {
      type: UserType,
      resolve: comment => rest(`/users/${comment.userId}`)
    },
    post: {
      type: PostType,
      resolve: comment => rest(`/posts/${comment.postId}`)
    }
  })
});

// post   { "id": 2, "title": "Post 2", "date": "2017-02-12", "userId": 2 },
const PostType = new GraphQLObjectType({
  name: "Post",
  fields: () => ({
    id: {
      type: GraphQLID
    },
    title: {
      type: GraphQLString
    },
    user: {
      type: UserType,
      resolve: post => rest(`/users/${post.userId}`)
    }
  })
});

// user { "id": 1, "name": "User 1" },
const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString,
      resolve: user => user.name
    },
    age: {
      type: GraphQLInt
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve: user => {
        return rest("posts").then(res => {
          const matchedPosts = res.filter(post => post.userId == user.id);
          return matchedPosts;
        });
      }
    }
  })
});

//Query
const QueryType = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    allUsers: {
      type: new GraphQLList(UserType),
      resolve: () => rest("/users/")
    },
    user: {
      type: UserType,
      args: {
        id: { type: GraphQLID }
      },
      resolve: (root, args) => rest(`/users/${args.id}`)
    },

    post: {
      type: PostType,
      args: {
        id: { type: GraphQLID }
      },
      resolve: (root, args) => rest(`/posts/${args.id}`)
    },

    comment: {
      type: CommentType,
      args: {
        id: { type: GraphQLID }
      },
      resolve: (root, args) => rest(`/comments/${args.id}`)
    }
  })
});

const { GraphQLSchema } = require("graphql");

//Schema
module.exports = new GraphQLSchema({
  query: QueryType
});
