import { useContext, useEffect } from 'react';
import classess from './styles.module.css';
import { GlobalContext } from '../../context';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

export default function AddBlog() {
    const { formData, setFormData, isEdit, setIsEdit } = useContext(GlobalContext);
    const navigate = useNavigate();
    const location = useLocation();

    async function handleSaveBlogToDatabase() {
        try {
            const response = isEdit
                ? await axios.put(
                    `http://localhost:5000/api/blogs/update/${location.state.getCurrentBlogItem._id}`,
                    {
                        title: formData.title,
                        description: formData.description,
                    }
                )
                : await axios.post("http://localhost:5000/api/blogs/add", {
                    title: formData.title,
                    description: formData.description,
                });
            const result = await response.data;
            if (result) {
                setIsEdit(false);
                setFormData({
                    title: '',
                    description: ''
                })
                navigate("/");
            }
        } catch (error) {
            alert('Error while adding blog:', error);
        }
    }

    useEffect(() => {
        if (location.state) {
            const { getCurrentBlogItem } = location.state;
            setIsEdit(true);
            setFormData({
                title: getCurrentBlogItem.title,
                description: getCurrentBlogItem.description
            })
        }
    }, [location])

    return (
        <div className={classess.wrapper}>
            <h1>{isEdit ? 'Edit a Blog' : 'Add a Blog'}</h1>
            <div className={classess.formWrappper}>
                <input
                    type='text'
                    placeholder='Enter Blog Title'
                    name='title'
                    id='title'
                    value={formData.title}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            title: e.target.value
                        })
                    }
                />
                <textarea
                    placeholder='Enter Blog Description'
                    name='description'
                    id='description'
                    value={formData.description}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            description: e.target.value
                        })
                    }
                />
                <button onClick={handleSaveBlogToDatabase}>
                    {isEdit ? 'Edit' : 'Add'}
                </button>
            </div>
        </div>
    );
}