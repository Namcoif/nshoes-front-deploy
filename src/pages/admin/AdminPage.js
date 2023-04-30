import React from 'react';
import Header from '../homepage/header/Header';
import AccountsManagement from '../../container/admin/AccountsManagement';

function AdminPage(props) {
    return (
        <div className='flex flex-col'>
            <div>
                <div className='sticky'>
                    <Header />

                </div>
            </div>
            <div className='mt-28'>
                <AccountsManagement />
            </div>
            <div></div>
        </div>
    );
}

export default AdminPage;