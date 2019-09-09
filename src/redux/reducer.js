
//create the initial state
const initialState = {
    user:{},
    allPosts: [],
    currentPost: {}
}

//action types
const ADD_USER = 'ADD_USER'
const SEARCH_USERS = 'SEARCH_USERS'
const SELECT_POST = 'SELECT_POST'
const UPDATE_POSTS = 'UPDATE_POSTS'
const RELOAD_USER = 'RELOAD_USER'

//actions builder {dispatchers}
export function addUser(userInfo){
    return {
        type: ADD_USER,
        payload: userInfo
    }
}

export function selectPost(post){
    console.log(SELECT_POST)
    return {
        type: SELECT_POST,
        payload: post
    }
}

export function updatePosts(posts){
    console.log(UPDATE_POSTS)
    return {
        type: UPDATE_POSTS,
        payload: posts
    }
}

export function searchUsers(input){
    return {
        type: SEARCH_USERS,
        payload: input
    }
}

export function reloadUser(user){
    return {
        type: RELOAD_USER,
        payload: user
    }
}

//reducer
export default function reducer(state = initialState, action){
    console.log(action)
    switch(action.type){
        case ADD_USER:
            const {user, allPosts} = action.payload
            console.log(user, allPosts)
            return {...state, user, allPosts}
        case RELOAD_USER:
            return {...state, user:action.payload}
        case UPDATE_POSTS:
                return {...state, allPosts:action.payload}
        case SELECT_POST:
            return {...state, currentPost: action.payload}
        case SEARCH_USERS:
            return state
        default:
            return state
    }
}

