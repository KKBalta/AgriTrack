import React from 'react';
import Sidebar from './Sidebar';
import Content from './Content';

function Dashboard() {
    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <Content />
        </div>
    );
}

export default Dashboard;