import gql from 'graphql-tag'

export const ARTICLES_QUERY = gql`
    {
        articles {
            id
            createdAt
            title
            body
        }
    }
`

export const ARTICLE_QUERY = gql`
    query GetArticle($id: ID!) {
        article(id: $id) {
            id
            createdAt
            title
            body
        }
    }
`

export const DELETE_ARTICLE_MUTATION = gql`
    mutation DeleteArticleMutation($id: ID!) {
        deleteArticle(id: $id) {
            id
            createdAt
            title
            body
        }
    }
`

export const CREATE_ARTICLE_MUTATION = gql`
    mutation CreateArticleMutation($title: String!, $body: String!) {
        createArticle(title: $title, body: $body) {
            id
            createdAt
            title
            body
        }
    }
`