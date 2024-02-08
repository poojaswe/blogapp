import classes from "./styles.module.css";

export default function Header() {
    return (
        <div className={classes.header}>
            <h1>BLOG APP</h1>
            <ul>
                <li>Blogs</li>
                <li>Add Blog</li>
            </ul>
        </div>
    );
}