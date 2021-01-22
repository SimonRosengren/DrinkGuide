import React, { useState } from 'react';
import './header.scss';

function Header() {
    const [content, setContent] = useState();
    return (
        <div className="header">
            im a menu
        </div>
    );
}

export default Header;