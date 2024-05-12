import React, { useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { DataContext } from '../store/GlobalState';
import Cookie from 'js-cookie';
import Image from "next/image";
import { AiOutlineHome } from "react-icons/ai";
import { BsPeople } from "react-icons/bs";
import { TiContacts } from "react-icons/ti";
import { FiMail } from "react-icons/fi";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { SidebarContext } from "../store/SidebarContext";
import Logo from '../public/logo.jpg'




const Sidebar = () => {
    const router = useRouter();
    const { state, dispatch } = useContext(DataContext);
     const { isCollapsed, toggleSidebarcollapse } = useContext(SidebarContext);
    const { auth } = state;

    const handleLogout = () => {
        Cookie.remove('refreshtoken', { path: 'api/auth/accessToken' });
        localStorage.removeItem('firstLogin');
        dispatch({ type: 'AUTH', payload: {} });
        dispatch({ type: 'NOTIFY', payload: { success: 'Logged out!' } });
        return router.push('/');
    };

    const loggedRouter = () => {
        return (

            <div className="sidebar__wrapper">
            <button className="button" onClick={toggleSidebarcollapse}>
                {isCollapsed ? <MdKeyboardArrowRight /> : <MdKeyboardArrowLeft />}
            </button>
            <aside className="sidebar" data-collapse={isCollapsed}>
                <div className="sidebar__top">
                    <Image
                        width={80}
                        height={80}
                        className="sidebar__logo"
                        src={Logo}
                        alt="logo"
                    />
                    <p className="sidebar__logo-name">Ecommerces</p>
                </div>
                <ul className="sidebar__list">
                    <li className="sidebar__item">
                        <Link href="/">
                            <a className={`sidebar__link ${router.pathname === '/' ? 'sidebar__link--active' : ''}`}>
                                <AiOutlineHome /> Homepage
                            </a>
                        </Link>
                    </li>
                    <li className="sidebar__item">
                        <Link href="/profile">
                            <a className={`sidebar__link ${router.pathname === '/profile' ? 'sidebar__link--active' : ''}`}>
                                <TiContacts /> Profile
                            </a>
                        </Link>
                    </li>
                    {auth.user.role === 'admin' && (
                        <>
                            <li className="sidebar__item">
                                <Link href="/create">
                                    <a className={`sidebar__link ${router.pathname === '/create' ? 'sidebar__link--active' : ''}`}>
                                        <FiMail /> Products
                                    </a>
                                </Link>
                            </li>
                            <li className="sidebar__item">
                                <Link href="/users">
                                    <a className={`sidebar__link ${router.pathname === '/users' ? 'sidebar__link--active' : ''}`}>
                                        <BsPeople /> Users
                                    </a>
                                </Link>
                            </li>
                        </>
                    )}
                    <li className="sidebar__item">
                        <a className="sidebar__link" onClick={handleLogout}>
                            Logout
                        </a>
                    </li>
                </ul>
            </aside>
        </div>
        );

    };

    return (
        <div className="sidebar">
            <ul className="nav flex-column">
                {Object.keys(auth).length !== 0 && loggedRouter()}
            </ul>
        </div>
    );
};

export default Sidebar;
