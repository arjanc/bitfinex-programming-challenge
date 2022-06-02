import React, { useState } from 'react';

import './collapsible.css';

const Collapsible = ({ title, children }) => {
    const [ open, setOpen] = useState(true)

    return (
        <div className="collapsible">
            <div onClick={() => setOpen(!open)} className='header'>
                {title}
            </div>
            {open ? (
                <div className='content'>
                    {children}
                </div>
            ) : null}
        </div>
    )
}

export default Collapsible;
