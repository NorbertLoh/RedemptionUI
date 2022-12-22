import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import html2canvas from "html2canvas";

import CafeTemplate from '../templates/cafe/cafe';
import DinerTemplate from "../templates/diner/diner";
import PubTemplate from "../templates/pub/pub";



function capitalizeWords(string) {
    var arr = string.split(" ");

    for (let i = 0; i < arr.length; i++) {
        arr[i] = arr[i][0].toUpperCase() + arr[i].substr(1);
    }

    arr = arr.join(" ")
    return arr
}

async function GetTopArtist(code, time) {
    var term;
    switch (time) {
        case 0:
            term = "short_term";
            break;
        case 1:
            term = "medium_term";
            break;
        case 2:
            term = "long_term";
            break;

        default:
            break;
    }
    const response = await fetch(`https://api.spotify.com/v1/me/top/artists?time_range=${term}&limit=50`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${code}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    const json = await response.json()
    return json.items
}

async function GetTopTracks(code, time) {
    var term;
    switch (time) {
        case 0:
            term = "short_term";
            break;
        case 1:
            term = "medium_term";
            break;
        case 2:
            term = "long_term";
            break;

        default:
            break;
    }
    const response = await fetch(`https://api.spotify.com/v1/me/top/tracks?time_range=${term}&limit=50`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${code}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    const json = await response.json()
    return json.items
}

function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

const IdentifyTopTracks = (items) => {
    var results = []
    items.forEach(item => {
        let title = item.name
        let artists = item.artists
        artists.forEach((artist, i) => {
            if (i == 0) {
                title += ` - ${artist.name}`
            } else {
                title += `, ${artist.name}`
            }
        })
        results.push([title, millisToMinutesAndSeconds(item.duration_ms)])
    })
    results = results.slice(0, 10)
    return results
}

async function GetMe(code) {
    const response = await fetch(`https://api.spotify.com/v1/me`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${code}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    const json = await response.json()
    return json.display_name
}

const IdentifyTopArtist = (items) => {
    var results = []
    var genreList = {}

    items.forEach((val, i) => {

        if (results.length < 10) {
            let cost = Math.ceil(val.popularity / 10)
            let temp = [val.name, cost]
            results.push(temp)
        }
        var genres = val.genres;
        genres.forEach(genre => {
            if (genreList.hasOwnProperty(genre)) {
                genreList[genre] += 1
            } else {
                genreList[genre] = 1
            }
        })
    })

    // create array from object
    var topGenre = Object.keys(genreList).map(
        (key) => { return [capitalizeWords(key), genreList[key]] });

    // sort
    topGenre.sort(
        (first, second) => { return second[1] - first[1] }
    );

    topGenre = topGenre.slice(0, 10)


    return { artist: results, genre: topGenre }
}

const Main = () => {
    const [name, setName] = useState("");
    const [code, setCode] = useState();
    const [time, setTime] = useState(0);
    const [template, setTemplate] = useState(0);

    const [shortArtist, setShortArtist] = useState([]);
    const [shortTracks, setShortTracks] = useState([]);
    const [shortGenre, setShortGenre] = useState([]);

    const [mediumArtist, setMediumArtist] = useState([]);
    const [mediumTracks, setMediumTracks] = useState([]);
    const [mediumGenre, setMediumGenre] = useState([]);

    const [longArtist, setLongArtist] = useState([]);
    const [longTracks, setLongTracks] = useState([]);
    const [longGenre, setLongGenre] = useState([]);

    const navigate = useNavigate();

    const ConsolidateData = () => {
        switch (time) {
            case 0:
                return { artists: shortArtist, tracks: shortTracks, genre: shortGenre }
            case 1:
                return { artists: mediumArtist, tracks: mediumTracks, genre: mediumGenre }
            case 2:
                return { artists: longArtist, tracks: longTracks, genre: longGenre }
            default:
                return { artists: [], tracks: [], genre: [] }
        }
    }

    const AssignData = (artist, genre, tracks) => {

        switch (time) {
            case 0:
                setShortArtist(artist)
                setShortGenre(genre)
                setShortTracks(tracks)
                break;
            case 1:
                setMediumArtist(artist)
                setMediumGenre(genre)
                setMediumTracks(tracks)
                break;
            case 2:
                setLongArtist(artist)
                setLongGenre(genre)
                setLongTracks(tracks)
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        let search = window.location.search;
        let params = new URLSearchParams(search);
        let error = params.get('error');
        if (error) {
            window.location.href = global.config.baseURL
        }

        const hash = window.location.hash;

        const token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

        setCode(token);

        // get default with default time
        GetTopArtist(token, time).then(data => {
            var topArtist = IdentifyTopArtist(data)
            GetTopTracks(token, time).then(data => {
                var topTracks = IdentifyTopTracks(data)
                AssignData(topArtist.artist, topArtist.genre, topTracks)
            });
        });

        GetMe(token).then(data => {
            setName(data)
        })

    }, [])

    const picRef = React.useRef()
    const imgRef = React.useRef()
    const [picUrl, setPicURl] = React.useState("")
    function handleDownloadImage() {
        const element = picRef.current;
        html2canvas(element).then(canvas => {
            const data = canvas.toDataURL('image.jpg');
            const link = document.createElement('a');
            setPicURl(data)
            const img = imgRef.current
            if (img != undefined) {
                img.src = data
            }

        })

    }

    // useEffect(() => {
    //     handleDownloadImage()
    // })

    const renderTemplate = () => {
        switch (template) {
            case 0:
                return (
                    <DinerTemplate
                        picRef={picRef}
                        name={name}
                        time={time}
                        data={ConsolidateData()}
                    />
                )
            case 1:
                return (
                    <PubTemplate
                        picRef={picRef}
                        name={name}
                        time={time}
                        data={ConsolidateData()}
                    />
                )
            case 2:
                return (
                    <CafeTemplate
                        picRef={picRef}
                        name={name}
                        time={time}
                        data={ConsolidateData()}
                    />
                )
            default:
                return ""
        }
    }

    return (
        <div>
            {/* <div className="canvasRender">
                {renderTemplate()}
            </div> */}
            <button type="button" onClick={handleDownloadImage}>
                Download as Image
            </button>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-lg-6 canvasRender">
                        {/* {picUrl ? <div className="imageContainer">
                            <img className="image" ref={imgRef} />
                        </div> : ''} */}
                        <div className="">
                            {renderTemplate()}
                        </div>
                    </div>
                    <div className="col-12 col-lg-6">
                        <div className="inputContainer">
                            <h1 className="menuLabel">Menu</h1>
                            <div className="menuButtonContainer">
                                <div className={`menuButton ${template == 0 ? "menuButtonActive" : ""}`} onClick={() => setTemplate(0)}>Diner</div>
                                <div className={`menuButton ${template == 1 ? "menuButtonActive" : ""}`} onClick={() => setTemplate(1)}>Pub</div>
                                <div className={`menuButton ${template == 2 ? "menuButtonActive" : ""}`} onClick={() => setTemplate(2)}>Cafe</div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>


        </div>
    )
}

export default Main;