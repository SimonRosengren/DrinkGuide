import React, { useState } from 'react';
import './main.scss';
import Button from '../button/button';

function Main() {
    const [content, setContent] = useState();
    return (
        <div className="main">
            <h1>Im a h1</h1>
            <h2>Im a h2</h2>
            <h3>Im a h3</h3>

            <Button onClick={testfunction} text='Click me' />
        </div>
    );
}

const testfunction = () => {
    console.log('Helo world')
}

export default Main;