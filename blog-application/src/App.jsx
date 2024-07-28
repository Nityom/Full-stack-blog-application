import "./App.css";
import IndexPage from "./pages/IndexPage";
import { Route,Routes } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import { UserContextProvider } from "./UserContext.jsx";
import CreatePost from "./pages/CreatePost.jsx";
import Header from "./components/Header.jsx";
import PostPage from "./pages/PostPage.jsx";
import EditPost from "./pages/EditPost.jsx";
import { WobbleCardDemo } from "./components/WobbleCardDemo.jsx";
import Example from "./components/Blog.jsx";
import Footer from "./components/Footer.jsx";
import NewSignUpPage from "./pages/NewSignUpPage.jsx";


function App() {
  return (
    <UserContextProvider>
  
    <Routes>
      <Route index element={<HomePage/>}/>
      <Route path="/signup" element={<SignUpPage/>}/>
      
      <Route path="/newsignup" element={<NewSignUpPage/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path = "/index" element={

        <div>
      <IndexPage/>
      <Example/>
      <Footer/>
      </div>
      
      }/>
      <Route path = "/create" element={

      <div>
        <Header/>
        <CreatePost/>
      </div>
      
      }/>
      <Route path="/post/:id" element={
        <div>
        <Header/>
        <PostPage/>
      </div>
      }/>
      <Route path="/edit/:id" element={
        <div>
        <Header/>
        <EditPost/>
      </div>
      }/>
    </Routes>
    </UserContextProvider>
  
  );
  
}

export default App;
