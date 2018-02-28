// API
const fetch = require("node-fetch");
const BASE_URL = "http://localhost:3000/tapi/";

function fetchApi(route) {
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
// user { "id": 1, "name": "User 1" },
// post   { "id": 2, "title": "Post 2", "date": "2017-02-12", "userId": 2 },
// comment   { "id": 3, "content": "Comment 3", "userId": 6, "postId": 1 },
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
    }
  })
});

/*
const PersonType = new GraphQLObjectType({
  name: "Person",
  description: "Somebody that you used to know",
  fields: () => ({
    firstName: {
      type: GraphQLString,
      resolve: person => person.first_name
    },
    lastName: {
      type: GraphQLString,
      resolve: person => person.last_name
    },
    email: { type: GraphQLString },
    id: { type: GraphQLString },
    username: { type: GraphQLString },
    friends: {
      type: new GraphQLList(PersonType),
      resolve: person => {
        person;
      } // Fetch the friends with the URLs `person.friends`,
    }
  })
});*/

//Query
const QueryType = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    allUsers: {
      type: new GraphQLList(UserType),
      resolve: () => fetchApi("/users/")
    },
    user: {
      type: UserType,
      args: {
        id: { type: GraphQLID }
      },
      resolve: (root, args) => fetchApi(`/users/${args.id}`)
    }
  })
});

const { GraphQLSchema } = require("graphql");

//Schema
module.exports = new GraphQLSchema({
  query: QueryType
});
