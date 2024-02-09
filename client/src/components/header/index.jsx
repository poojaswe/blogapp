import { Link } from "react-router-dom";
import classes from "./styles.module.css";

export default function Header() {
    return (
        <div className={classes.header}>
            <h2>BLOG APP</h2>
            <ul>
                <Link to={"/"}>
                    <li>Blogs</li>
                </Link>
                <Link to={"/blogsmodify"}>
                    <li>Add Blog</li>
                </Link>
            </ul>
        </div>
    );
}
