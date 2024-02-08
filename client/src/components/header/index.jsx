import { Link } from 'react-router-dom';
import classes from "./styles.module.css";

export default function Header() {
    return (
        <div className={classes.header}>
            <h1>BLOG APP</h1>
            <ul>
                <Link to={'/'}>
                    <li>Blogs</li></Link>
                <Link to={'/add-blog'}>
                    <li>Add Blog</li>
                </Link>
            </ul>
        </div>
    );
}