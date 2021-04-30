import React from 'react'

function Navbar() {
    return (
        <div className="Navbar">
            <ul className="Navbar-Categories">
                <li>Women</li>
                <li>Men</li>
                <li>Kids</li>
            </ul>
            <div className="Navbar-ShopIcon">Icon</div>
            <div className="Navbar-Handlers">
                <div className="Navbar-Handlers__currency">Currency</div>
                <div className="Navbar-Handlers__cart">Cart</div>
            </div>
        </div>
    )
}

export default Navbar
