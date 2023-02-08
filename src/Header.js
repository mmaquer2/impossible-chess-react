/*
import React from 'react';
//import Link from "next/link";
//import { useRouter } from "next/router";
import { useState } from "react";
import { FaTwitter } from 'react-icons/fa';

export default function Header() {
    const router = useRouter();
    const currentRoute = router.pathname;

    const [isActive, setActive] = useState(false);

    const toggleClass = () => {
        setActive(!isActive);
    };
    return (
        <header className="header">
            <div className='container'>
                <div className="header__logo">
                    <Link href="/">
                        <span className='header__logo__text'>Impossible Chess</span>
                    </Link>
                </div>
                <ul className="header__list">
                    <li className="header__item">
                        <Link className="header__link" href="https://twitter.com/impossiblechess">
                            <FaTwitter /> Share on Twitter
                        </Link>
                    </li>
                    <li className="header__item">
                        <Link className={currentRoute === "/about" ? "header__link active" : "header__link"} href="/about">
                            About
                        </Link>
                    </li>
                    <li className="header__item">
                        <Link className={currentRoute === "/faq" ? "header__link active" : "header__link"} href="/faq">
                            FAQ
                        </Link>
                    </li>
                </ul>
            </div>
        </header>
    );
}
*/
