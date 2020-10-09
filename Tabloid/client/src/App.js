import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";
import CommentList from './components/Comment/CommentList';
import { CommentProvider } from './providers/CommentProvider';
import CommentForm from './components/Comment/CommentForm'


function App() {
  return (
    <Router>
      <UserProfileProvider>
        <Header />
        <ApplicationViews />
        <CommentProvider>
          <CommentForm />
          <CommentList />
        </CommentProvider>
      </UserProfileProvider>
    </Router>
  );
}

export default App;
