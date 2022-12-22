import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Buffer } from "buffer";

const Callback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const code = urlParams.get('code');
        const state = urlParams.get('state');
        const redirect_uri = "http://localhost:3000/callback"
    }, [])

    return (
        <div>
            <h1>Callback</h1>
        </div>
    )
}

export default Callback;