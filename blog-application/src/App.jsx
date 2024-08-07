import "./App.css";
import { Route, Routes } from "react-router-dom";
import { UserContextProvider } from "./UserContext.jsx";

import IndexPage from "./pages/IndexPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import CreatePost from "./pages/CreatePost.jsx";
import Header from "./components/Header.jsx";
import PostPage from "./pages/PostPage.jsx";
import EditPost from "./pages/EditPost.jsx";
import Example from "./components/Blog.jsx";
import Footer from "./components/Footer.jsx";
import NewSignUpPage from "./pages/NewSignUpPage.jsx";

function App() {
  return (
    <UserContextProvider>
      <Routes>
        {/* Default route to IndexPage */}
        <Route path="/" element={
          <>
            <IndexPage />
            <Example />
            <Footer />
          </>
        } />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/newsignup" element={<NewSignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/create" element={
          <>
            <Header />
            <CreatePost />
          </>
        } />
        <Route path="/post/:id" element={
          <>
            <Header />
            <PostPage />
          </>
        } />
        <Route path="/edit/:id" element={
          <>
            <Header />
            <EditPost />
          </>
        } />
      </Routes>
    </UserContextProvider>
  );
}

export default App;
