import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context";
import axios from "axios";
import classess from './styles.module.css';
import { FaTrash, FaEdit } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';

export default function Blogs() {
    const { blogList, setBlogList, pending, setPending } = useContext(GlobalContext);
    const navigate = useNavigate()

    async function fetchListOfBlogs() {
        setPending(true);
        try {
            const response = await axios.get('http://localhost:5000/api/blogs');
            const result = await response.data;

            if (result && result.blogList && result.blogList.length) {
                setBlogList(result.blogList);
            } else {
                setBlogList([]);
            }
        } catch (error) {
            console.error('Error fetching list of blogs:', error);
        } finally {
            setPending(false);
        }
    }

    async function handleDeleteBlog(getCurrentId) {
        setPending(true);
        try {
            const response = await axios.delete(`http://localhost:5000/api/blogs/delete/${getCurrentId}`);
            const result = await response.data;

            if (result?.message) {
                fetchListOfBlogs();
                //navigate(0);
            } else {
                console.error('Unexpected response:', result);
            }
        } catch (error) {
            console.error('Error deleting blog:', error);
        } finally {
            setPending(false);
        }
    }


    async function handleEditBlog(getCurrentBlogItem) {
        navigate("/add-blog", { state: { getCurrentBlogItem } });
    }

    useEffect(() => {
        fetchListOfBlogs();
    }, []);

    return (
        <div className={classess.wrapper}>
            <h1>Blog List</h1>
            {pending ? <h1>Loading...</h1> :
                <div className={classess.blogList}>
                    {blogList && blogList.length
                        ? blogList.map((blogItem) => (
                            <div key={blogItem._id}>
                                <p>{blogItem.title}</p>
                                <p>{blogItem.description}</p>
                                <FaEdit onClick={() => handleEditBlog(blogItem)} size={30} />
                                <FaTrash onClick={() => handleDeleteBlog(blogItem._id)} size={30} />
                            </div>
                        ))
                        : <h3>No Blogs Added!</h3>
                    }
                </div>
            }
        </div>
    );
}
