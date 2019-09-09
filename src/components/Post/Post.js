import React, { Component } from 'react'
import {connect} from 'react-redux'
import './Post.css'
import axios from 'axios'

import {selectPost} from '../../redux/reducer'

class Post extends Component {
    componentDidMount(){
        console.log(this.props.match)
        axios.get(`/api/post/${this.props.match.params.postid}`).then(res => {
            console.log(res.data)
            this.props.selectPost(res.data)
        })
    }
    render() {
        const {currentPost} = this.props
        return (
            <div className='article-container'>
                <div className="article">
                    <div className='title-user'>
                        <h2 className='title'>{currentPost.title}</h2>
                        <div className='user'>
                            <h6>{currentPost.username}</h6>
                            <img className='small-profile' src={currentPost.profileimage} alt='profile'/>
                        </div>
                    </div>
                    <div className='content-image'>
                        <img className='image' src={currentPost.imageurl} alt={currentPost.imageurl}/>
                        <div className='content'>{currentPost.content}</div>
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
export default connect(mapStateToProps, {selectPost})(Post)
