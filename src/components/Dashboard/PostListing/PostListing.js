import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './PostListing.css'

import {connect} from 'react-redux'

import axios from 'axios'
import {selectPost} from '../../../redux/reducer'

class PostListing extends Component {

    findListing = () => {
        console.log(this.props.post.id)
        axios.get(`/api/post/${this.props.post.id}`).then(res => {
            console.log(res.data)
            this.props.selectPost(res.data)
        })
    }
    render() {
        const {post} = this.props
        const path = `/post/${post.id}`
        return (
            <Link className="post-link" to={path} onClick={this.findListing}>
                <div className="article-listing">
                    <div className='title'>
                        <h1>{post.title}</h1>
                    </div>
                    <div className='user'>
                        <h6 className="username">{post.username}</h6>
                        <img className='small-profile' src={post.profileimage} alt='profile'/>
                    </div>
                </div>
            </Link>
        )
    }
}

function mapStateToProps(state) {
    return state
}

//we are curring the Auth component
export default connect(mapStateToProps, {selectPost})(PostListing)