const mongoose = require('mongoose');
const Blog = require('../model/blog');

//fetch list of blogs
//add a new blog
//delete a blog
//update a blog

const fetchBlogs = async (req, res) => {
    let blogList;
    try {
        blogList = await Blog.find();
    } catch (e) {
        console.log(e);
    }

    if (!blogList) {
        return res.status(404).json({ message: 'No Blogs Found' })
    }
    return res.status(200).json({ blogList });
}


const addNewBlog = async (req, res) => {
    const { title, description } = req.body;
    const currentDate = new Date();

    const newlyCreateBlog = new Blog({
        title, description, date: currentDate
    })

    try {
        await newlyCreateBlog.save()
    } catch (e) {
        console.log(e);
    }

    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await newlyCreateBlog.save(session);
        session.commitTransaction();
    } catch (e) {
        return res.send(500).json({ message: e });
    }

    return res.status(200).json({ newlyCreateBlog });
}

const deleteABlog = async (req, res) => {
    const id = req.params.id;

    try {
        const findCurrentBlog = await Blog.findByIdAndDelete(id);
        if (!findCurrentBlog) {
            return res.status(404).json({ message: 'Blog Not Found' })
        }

        return res.status(200).json({ message: 'Sucessfully Deleted!' })
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Unable to delete! Try again!' })
    }
}

const updateABlog = async (req, res) => {
    const id = req.params.id;

    const { title, description } = req.body;
    let currentBlogUpdate;

    try {
        currentBlogUpdate = await Blog.findByIdAndUpdate(id, { title, description });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Something went wrong on Updating! Try again!' })
    }

    if (!currentBlogUpdate) {
        return res.status(500).json({ message: 'Unable to Update! Try again!' })
    }
    return res.status(200).json({ currentBlogUpdate });
}

module.exports = { fetchBlogs, deleteABlog, updateABlog, addNewBlog };