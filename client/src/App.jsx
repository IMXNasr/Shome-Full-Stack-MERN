import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components';
import { HomePage, LoginPage, ShowsPage, NotFoundPage, ProfilePage, RegisterPage, OneShowPage } from './pages';
import { AddShowPage, AdminPage, ShowsPage as AdminShowsPage } from './pages/admin';
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
        <Route path="/admin/shows" element={<AdminShowsPage title={`Admin Shows - ${appName}`} />} />
        <Route path="/admin/shows/add" element={<AddShowPage title={`Add Show - ${appName}`} />} />
        {/* Shows Pages */}
        <Route path="/:type" element={<ShowsPage title={`Shows - ${appName}`} />} />
        <Route path="/:type/:id" element={<OneShowPage title={`Movie - ${appName}`} />} />
        {/* 404 Error */}
        <Route path="*" element={<NotFoundPage title={`404 Not Found - ${appName}`} />} />
      </Routes>
    </Router>
  )
}

export default App;