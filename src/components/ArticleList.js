import React, { Component } from 'react'
import Article from './Article'
import { Query } from 'react-apollo'
import { ARTICLES_QUERY } from "../gqlqueries/articles";

class ArticleList extends Component {

    constructor(props) {
        super(props)
        this.handleArticleDelete = this.handleArticleDelete.bind(this)
    }

    handleArticleDelete(cache, deletedArticleId) {
        this.props.onArticleDelete(cache, deletedArticleId)
    }

    render() {
        return (
            <div>
                <Query query={ARTICLES_QUERY}>
                    {({ loading, error, data }) => {
                        if (loading) return <div>Chargement...</div>
                        if (error) return <div>Erreur {error.message}</div>

                        const articlesToRender = data.articles
                        return (
                            <div>
                                {articlesToRender.map(article =>
                                    <Article
                                        key={article.id}
                                        article={article}
                                        onArticleDelete={this.handleArticleDelete}
                                    />
                                )}
                            </div>
                        )
                    }}
                </Query>
            </div>
        )
    }
}

export default ArticleList