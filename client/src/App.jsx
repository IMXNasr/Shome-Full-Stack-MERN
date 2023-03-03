import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components';
import { AddShowPage, AdminPage, AllShowsPage, HomePage, LoginPage, MoviePage, MoviesPage, NotFoundPage, ProfilePage, RegisterPage } from './pages';
import { appName } from './utils/constants';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* User Pages */}
        <Route path="/" element={<HomePage title={`${appName}`} />} />
        {/* Auth Pages */}
        <Route path="/register" element={<RegisterPage title={`Register - ${appName}`} />} />
        <Route path="/login" element={<LoginPage title={`Login - ${appName}`} />} />
        <Route path="/profile" element={<ProfilePage title={`Profile - ${appName}`} />} />
        {/* Admin Pages */}
        <Route path="/admin" element={<AdminPage title={`Admin - ${appName}`} />} />
        <Route path="/admin/add-show" element={<AddShowPage title={`Add Show - ${appName}`} />} />
        {/* Shows Pages */}
        <Route path="/all" element={<AllShowsPage title={`All Shows - ${appName}`} />} />
        <Route path="/:type" element={<MoviesPage title={`Movies - ${appName}`} />} />
        <Route path="/:type/:id" element={<MoviePage title={`Movie - ${appName}`} />} />
        {/* 404 Error */}
        <Route path="*" element={<NotFoundPage title={`404 Not Found - ${appName}`} />} />
      </Routes>
    </Router>
  )
}

export default App;