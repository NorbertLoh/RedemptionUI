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


        // if (state === null) {
        //     navigate("404", { replace: true })
        // } else {
        //     console.log(client_id + ':' + client_secret)
        //     var auth = "Basic " + (new Buffer(client_id + ':' + client_secret).toString('base64'))
        //     console.log(auth)
        //     console.log(new URLSearchParams({
        //         grant_type: "authorization_code",
        //         code: code,
        //         redirect_uri: redirect_uri,
        //     }).toString())
        //     fetch('https://accounts.spotify.com/api/token', {
        //         method: 'POST',
        //         headers: {
        //             'Authorization': `${auth}`,
        //             'Content-Type': 'application/x-www-form-urlencoded'
        //         },
        //         body: new URLSearchParams({
        //             grant_type: "authorization_code",
        //             code: code,
        //             redirect_uri: redirect_uri,
        //         }).toString()
        //     }).then(res =>{
        //         console.log(res)
        //     })
        // }
    }, [])

    return (
        <div>
            <h1>Callback</h1>
        </div>
    )
}

export default Callback;