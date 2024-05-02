// DashboardPage.jsx
import React, { useState } from 'react';
import Layout from '../../components/DashComponents/Layout'
import styles from './DashboardPage.module.css'; // Importing CSS module

const DashboardPage = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <h2 className={styles.heading}>Dashboard Main Content</h2>;
      case 'users':
        return <h2 className={styles.heading}>User Management</h2>;
      case 'settings':
        return <h2 className={styles.heading}>Settings</h2>;
      case 'analytics':
        return <h2 className={styles.heading}>Analytics</h2>;
      default:
        return <h2 className={styles.heading}>Welcome to the Admin Dashboard</h2>;
    }
  };

  return (
    <Layout>
      <div className={styles.dashboardLayout}>
        {renderPage()}
      </div>
    </Layout>
  );
};

export default DashboardPage;
