//import logo from './logo.svg';
import {
  BrowserRouter as Router,
  Routes, Route
 } from "react-router-dom";
import './App.css';
import React, { useState, useEffect } from 'react';
import ArticleListPage from './ArticleListPage/ArticleListPage';
import ArticlePage from './ArticleListPage/ArticlePage';
function App () {
  return (
    <Router>
      <div className ='container dark'>
        <div className="app">
      
          <Routes>
            <Route path="/" element={<ArticleListPage />} />
            <Route path="/Article/:ArticlePageID" element={<ArticlePage />}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
