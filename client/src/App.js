// import logo from './logo.svg';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/header';
import Blogs from './pages/blogs';
import AddBlog from './pages/blogsmodify';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route exact path="/" element={<Blogs/>}/>
        <Route exact path="/blogsmodify" element={<AddBlog/>}/>
      </Routes>
    </div>
  );
}

export default App;
