import React, { useState } from 'react';
import './LoginComponent.css';

function LoginComponent({ onLoginSuccess }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showWelcome, setShowWelcome] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            alert('Please enter both email and password');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }

        try {
            const response = await fetch('http://localhost:3002/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                setShowWelcome(true); // show welcome popup
            } else {
                alert(`Login failed: ${data.message}`);
            }
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    };

    const handleWelcomeOk = () => {
        if (onLoginSuccess) onLoginSuccess(); // navigate to chat window
    };

    return (
        <div className="login-container no-blue-background">
            {!showWelcome && (
                <div className="login-box">
                    <h2>Login</h2>
                    <div className="login-form">
                        <input
                            type="email"
                            placeholder="Email ID"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button onClick={handleLogin}>Login</button>
                    </div>
                </div>
            )}

            {showWelcome && (
                <div className="welcome-popup">
                    <div className="welcome-content">
                        <h3>Welcome to ChatGPT!</h3>
                        <button onClick={handleWelcomeOk}>OK</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default LoginComponent;
