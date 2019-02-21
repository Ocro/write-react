import React, { Component } from 'react'
import { Query } from 'react-apollo'
import { ARTICLE_QUERY } from "../gqlqueries/articles";


class SingleArticle extends Component {

    render() {
        const id = this.props.match.params.id
        return (
            <Query query={ARTICLE_QUERY} variables={{ id }}>
                {({ loading, error, data }) => {
                    if (loading) return <div>Chargement...</div>
                    if (error) return <div>Erreur {error.message}</div>

                    return (
                        <div>
                            {data.article.title}
                            {data.article.body}
                        </div>
                    )
                }}
            </Query>
        )
    }
}

export default SingleArticle