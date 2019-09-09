import React, { Component } from 'react'

import axios from 'axios'
import {connect} from 'react-redux'

import './Form.css'

import {updatePosts} from '../../redux/reducer'

class Form extends Component {
    constructor(){
        super()

        this.state = {
            title:'',
            imageURL:'',
            content:''
        }
    }

    handleInput = (e) => {
        console.log(e.target.value)
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submitPost = () => {
        const {title, imageURL, content} = this.state
        const addPost = {...this.props.user, title, imageURL, content}
        console.log(addPost)
        axios.post('/api/post/add', addPost).then(res => {
            console.log(res.data)
            this.props.updatePosts(res.data)
            this.props.history.push('/dashboard')
        })
    }

    render() {
        return (
            <div className='form-background'>
                <div className='form-container'>
                    <h3 className="new-post">NEW POST</h3>
                    <div className="form">
                        <div className='form-input'>
                            <label>Title</label>
                            <input type="text" name="title" onChange={this.handleInput}></input>
                        </div>
                        <div className='form-input'>
                            <label>Image URL</label>
                            <input type="text" name="imageURL" onChange={this.handleInput}></input>
                        </div>
                        <div className='form-input'>
                            <label>Content</label>
                            <textarea type="text" name="content" onChange={this.handleInput}></textarea>
                        </div>
                    </div>
                    <div className="submit-btn">
                        <button onClick={this.submitPost}>Post</button>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state
}

//we are curring the Auth component
export default connect(mapStateToProps, {updatePosts})(Form)