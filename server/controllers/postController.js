const getPost = async (req, res) => {
    let {id} = req.params
    const db = req.app.get('db')
    const foundPost = await db.get_post([id])
    req.session.currentpost = id
    return res.status(200).send(foundPost[0])
}

const getPosts = async (req, res) => {
    const db = req.app.get('db')
    const foundPosts = await db.get_all_posts()
    console.log("here")
    console.log(req.session.user)
    return res.status(200).send({allPosts:foundPosts, user:req.session.user})
}

const addPost = async (req, res) => {
    let {id, title, imageURL, content} = req.body
    const db = req.app.get('db')
    const updatedPosts = await db.add_post([id, title, imageURL, content])
    return res.status(200).send(updatedPosts)
}

module.exports = {
    getPost,
    getPosts,
    addPost
}