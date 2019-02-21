import React, { Component } from 'react'
import {Mutation, Query} from 'react-apollo'
import {ARTICLE_QUERY, CREATE_ARTICLE_MUTATION} from "../gqlqueries/articles";


class CreateArticle extends Component {

    state = {
        title: '',
        body: '',
    }

    constructor(props) {
        super(props)
        this.handleArticleAdded = this.handleArticleAdded.bind(this)
    }

    handleArticleAdded(cache, addedArticle) {
        this.props.onArticleAdd(cache, addedArticle)
    }

    render() {

        if (this.props.article_id) {

            const id = this.props.article_id
            return (<Query query={ARTICLE_QUERY} variables={{ id }}>
                {({ loading, error, data }) => {
                    if (loading) return <div>Chargement...</div>
                    if (error) return <div>Erreur {error.message}</div>

                    return (
                        <ArticleForm
                            title={data.article.title}
                            body={data.article.body}
                            onArticleAdd={this.handleArticleAdded}
                        />
                    )
                }}
            </Query>)
        }

        return (
            <ArticleForm
                onArticleAdd={this.handleArticleAdded}
            />
        )
    }
}

class ArticleForm extends Component {

    state = {
        title: '',
        body: '',
    }

    constructor(props) {
        super(props)

        this.handleArticleAdded = this.handleArticleAdded.bind(this)

        this.state.title = this.props.title
        this.state.body = this.props.body
    }

    handleArticleAdded(cache, { data: { createArticle }}) {
        this.props.onArticleAdd(cache, createArticle)
    }

    render() {
        const { title, body } = this.state

        return (
            <div>
                <div>
                    <input
                        value={title}
                        onChange={e => this.setState({ title: e.target.value })}
                        type="text"
                        placeholder="Titre de l'article"
                    /><br/>
                    <textarea
                        value={body}
                        onChange={e => this.setState({ body: e.target.value })}
                        type="text"
                        placeholder="Contenu de l'article"
                        cols="50"
                        rows="10"
                    />
                </div>
                <Mutation
                    mutation={CREATE_ARTICLE_MUTATION}
                    variables={{ title, body }}
                    update={this.handleArticleAdded}
                >
                    {CreateArticleMutation =>
                        <button onClick={CreateArticleMutation}>Enregistrer</button>
                    }
                </Mutation>
            </div>
        )
    }
}

export default CreateArticle