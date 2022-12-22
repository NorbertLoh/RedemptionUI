import React from "react";
import { boot } from "bootstrap";

function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


const login = () => {
    var client_id = "2c1623ce7b5c49d29a830967a4a8b6b4";
    var redirect_uri = global.config.baseURL + 'main';
    var state = makeid(16);
    var scope = "user-top-read user-read-private";

    var url = 'https://accounts.spotify.com/authorize';
    url += '?response_type=token';
    url += '&client_id=' + encodeURIComponent(client_id);
    url += '&scope=' + encodeURIComponent(scope);
    url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
    url += '&state=' + encodeURIComponent(state);
    url += '&show_dialog=' + encodeURIComponent('true');
    window.location.href = url;
}

const Index = () => {
    return (
        <div className="container maxHeight">
            <div class="row align-items-center maxHeight">
                <div class="col">
                    <div className="indexHeader">Discover your Spotify menu</div>
                    <div className="buttonLogin" onClick={login}>LOGIN WITH SPOTIFY</div>
                </div>
                
            </div>
        </div>

    )
}

export default Index;