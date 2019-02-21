import React, { Component } from 'react'
import ArticleList from './ArticleList'
import CreateArticle from './CreateArticle'
import { isUserLogged } from '../utils'
import { ARTICLES_QUERY } from "../gqlqueries/articles"
import Header from "./Header"


class ArticlesView extends Component {

    render() {
        if (isUserLogged()) {
            return (
                <div>
                    <Header />
                    <ArticleList onArticleDelete={this.handleArticleDelete} />
                    <CreateArticle
                        onArticleAdd={this.handleArticleAdd}
                        article_id={this.props.match.params.id}
                    />
                </div>
            )
        } else {
            this.props.history.push(`/login`)
            return null
        }
    }

    handleArticleDelete(cache, deletedArticleId) {

        try {
            const data = cache.readQuery({query: ARTICLES_QUERY})
            let deletedIndex = data.articles
                .map(function (e) {
                    return e.id
                })
                .indexOf(deletedArticleId)

            data.articles.splice(deletedIndex, 1)
            cache.writeQuery({
                query: ARTICLES_QUERY,
                data
            })
        } catch (e) {}

    }

    handleArticleAdd(cache, addedArticle) {

        try {
            const data = cache.readQuery({query: ARTICLES_QUERY})

            data.articles.unshift(addedArticle)
            cache.writeQuery({
                query: ARTICLES_QUERY,
                data
            })
        } catch (e) {}
    }
}

export default ArticlesView