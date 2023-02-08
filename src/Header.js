import React from 'react';
import { useState } from "react";
import { FaTwitter } from 'react-icons/fa';

export default function Header() {
    return (
        <>
            <div className='header__ad'>AD HERE</div>
            <header className="header">
                <div className='container'>
                    <div className="header__logo">
                        <a href="/">
                            <span className='header__logo__text'>Impossible Chess</span>
                        </a>
                    </div>
                    <ul className="header__list">
                        <li className="header__item">
                            <a className='header__link' href="/about">
                                About
                            </a>
                        </li>
                        <li className="header__item">
                            <a className="header__link" href="https://twitter.com/intent/tweet?text=Look%20how%20hard%20this%20Chess%20game%20is%3A%20impossiblechess.com.%20%23chess%20%23impossiblechess" target="_blank" rel="nofollow">
                                <FaTwitter /> Share on Twitter
                            </a>
                        </li>
                    </ul>
                </div>
            </header>
        </>
    );
}