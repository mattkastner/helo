import React, { Component } from 'react'

import axios from 'axios'
import {connect} from 'react-redux'

import * as Icon from 'react-feather'

import './Dashboard.css'
import PostListing from './PostListing/PostListing'

//account builders
import {searchUsers, addUser} from '../../redux/reducer'

class Dashboard extends Component {
    constructor(){
        super()

        this.state = {
            search: '',
            includeMyPosts: true,
            displayPosts: []
        }
    }

    componentDidMount(){
        console.log(this.props)
        axios.get('api/post/getAll').then((res) => {
            console.log(res.data)
            this.props.addUser(res.data)
            this.setState({displayPosts: this.props.allPosts})
        })
    }

    handleInput = (e) => {
        console.log(e.target.value)
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    clickedSubmit = () => {
        this.props.searchUsers(this.state.search)
    }

    resetSearch = () =>{
        this.setState({
            displayPosts: this.props.allPosts,
            search: ''
        })
    }

    handleSearchInput = (e) => {
        console.log(e.target.value)
        this.setState({
            [e.target.name]: e.target.value
        })
        const filteredPosts = this.props.allPosts.filter(post => post.title.includes(e.target.value))
        console.log(filteredPosts)
        this.setState({
            displayPosts: filteredPosts
        })
    }

    render() {
        // console.log(this.props.user)
        // console.log(this.props.allPosts)
        let posts = []
        this.state.includeMyPosts ? 
            posts = this.state.displayPosts
            :
            posts = this.state.displayPosts.filter(post => post.user_id !== this.props.user.id)

        const listedPosts = posts.map((post, i) => {
            // console.log(post)
            // console.log(post.id)
            return <PostListing key={i} post={post}/>
        })
        return (
            <div className="dashboard-container">
                <div className='top-nav-container'>
                    <div className="top-nav">
                        <div className="searchbar-feature">
                            <div className="searchbar-container">
                                <input value={this.state.search} className="searchbar" name='search' onChange={this.handleSearchInput} placeholder="Search..."/><Icon.Search color='gray' className='icon' size="20"/>
                            </div>
                            <button className="reset" onClick={this.resetSearch}>X</button>
                        </div>
                        <div className='my-posts-container'>
                            <label>Exclude My Posts</label>
                            <input className='input-checkbox' onClick={() => this.setState({includeMyPosts: !this.state.includeMyPosts})} type="checkbox"/>
                        </div>
                    </div>
                </div>
                <div className='posts-container'>
                    {listedPosts}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state
}

//we are curring the Auth component
export default connect(mapStateToProps, {searchUsers, addUser})(Dashboard)