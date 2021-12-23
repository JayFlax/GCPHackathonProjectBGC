import React from "react"

const NavigationControl: React.FC = () => {
    return (
        <nav className="navbar is-black">
            <div className="navbar-start">
                <button className="navbar-item">
                    Home
                </button>
            </div>
            <div className="navbar-brand">
                <h1>BG Connect</h1>
            </div>
        </nav>
    )
}

export default NavigationControl;