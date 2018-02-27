GQL:

* Lang
  * Operations
    * Query
    * Mutation
  * Subsc
  * Fragment
* Runtime

  > translates gql to sql

  * Types (schema)
  * Valid
  * Introspect?
  * Exec

How?

1. Server parse `query` => AST
2. Check every type using Schema
3. resolve can return scalar or other types (recurively)
4. Merge data

GQL Lan

* [Graphql Hub](https://www.graphqlhub.com/)

Why:

* performance
* server/client sclae independent (client takes control)
