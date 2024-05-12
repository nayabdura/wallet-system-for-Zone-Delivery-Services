import React from 'react';
import NavBar from './NavBar';
import Notify from './Notify';
import Modal from './Modal';
import Sidebar from './Sidebar';


function Layout({ children }) {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-2 col-md-2 layout">
                    <Sidebar />
                </div>
                <div className="col-lg-9 col-md-8 layout__main-content">
                    <div className="container">
                        <NavBar />
                        <Notify />
                        <Modal />
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Layout;
