import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { DELETE_ARTICLE_MUTATION } from "../gqlqueries/articles";

class Article extends Component {

    constructor(props) {
        super(props)
        this.handleDelete = this.handleDelete.bind(this)
    }

    handleDelete(cache, { data: { deleteArticle: { id }}}) {
        this.props.onArticleDelete(cache, id)
    }

    render() {
        const id = this.props.article.id

        return (
            <div>
                <Link to={'/article/' + id}>{this.props.article.title}</Link>

                <Mutation
                    mutation={DELETE_ARTICLE_MUTATION}
                    variables={{ id }}
                    update={this.handleDelete}
                >
                    {DeleteArticleMutation => <button onClick={DeleteArticleMutation}>Supprimer</button>}
                </Mutation>
            </div>
        )
    }
}

export default withRouter(Article)