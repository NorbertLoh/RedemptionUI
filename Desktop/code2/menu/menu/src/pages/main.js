import React, { useEffect, useState, useLayoutEffect } from "react";
import { useNavigate } from 'react-router-dom';
import html2canvas from "html2canvas";
import { toPng } from 'html-to-image';

import TextInput from "../components/TextInput";

import CafeTemplate from '../templates/cafe/cafe';
import DinerTemplate from "../templates/diner/diner";
import PubTemplate from "../templates/pub/pub";
import BusTemplate from "../templates/bus/bus";

import domtoimage from 'dom-to-image';

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

    const [windowWidth, setWindowWidth] = useState(0);
    const [windowHeight, setWindowHeight] = useState(0);
    let resizeWindow = () => {
        setWindowWidth(window.innerWidth);
        setWindowHeight(window.innerHeight);
    };

    // useEffect(() => {
    //     resizeWindow();
    //     window.addEventListener("resize", resizeWindow);
    //     return () => window.removeEventListener("resize", resizeWindow);
    //   }, []);

    const [width, setWidth] = useState(0)
    const [height, setHeight] = useState(0)

    useEffect(() => {
        setWidth(1500)
        setHeight(1620)

    }, [])

    const [name, setName] = useState("");
    const [title, setTitle] = useState("")
    const [token, setToken] = useState();
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

    const [busColor1, setBusColor1] = useState("#FF918C");
    const [busColor2, setBusColor2] = useState("#F0F44A");
    const [busColor3, setBusColor3] = useState("#80CAF8");
    // onload
    useEffect(() => {
        let search = window.location.search;
        let params = new URLSearchParams(search);
        let error = params.get('error');
        if (error) {
            window.location.href = global.config.baseURL
        }

        const hash = window.location.hash;

        const tokenTemp = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

        setToken(tokenTemp);

        GetData(tokenTemp, time)

        GetMe(tokenTemp).then(data => {
            setName(data)
            setTitle(data + "'s Grill")
        })

    }, [])

    // on time change
    useEffect(() => {
        if (token) {
            switch (time) {
                case 0:
                    if (shortArtist.length == 0) {
                        GetData(token, time)
                    }
                    break;
                case 1:
                    if (mediumArtist.length == 0) {
                        GetData(token, time)
                    }
                    break;
                case 2:
                    if (longArtist.length == 0) {
                        GetData(token, time)
                    }
                    break;
                default:
                    break;
            }
        }

    }, [time])

    // on menu change
    useEffect(() => {

        switch (template) {
            case 0:
                setTitle(name + "'s Grill")
                break;
            case 1:
                setTitle(name + "'s Pub")
                break;
            case 2:
                setTitle(name + "'s Oven")
                break;
            case 3:
                setTitle(name + "'s Stn")
                break;
            default:
                break;
        }
    }, [template])

    const GetData = (token, time) => {
        // get default with default time
        GetTopArtist(token, time).then(data => {
            var topArtist = IdentifyTopArtist(data)
            GetTopTracks(token, time).then(data => {
                var topTracks = IdentifyTopTracks(data)
                AssignData(topArtist.artist, topArtist.genre, topTracks, time)
            });
        });
    }

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

    const AssignData = (artist, genre, tracks, time) => {

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



    const picRef = React.useRef()
    const renderContainerRef = React.useRef()
    const bigPicRef = React.useRef()
    const menuContainer = React.useRef()
    const smallPicRef = React.useRef()

    const [picUrl, setPicURl] = React.useState("")
    function delay(milliseconds) {
        return new Promise(resolve => {
            setTimeout(resolve, milliseconds);
        });
    }


    async function handleDownloadImage() {
        const element = smallPicRef.current;
        renderContainerRef.current.style.width = "1500px";
        renderContainerRef.current.style.height = "1620px";
        // toPng(element, { cacheBust: true, canvasWidth:1500, canvasHeight: 1620 })
        //     .then((dataUrl) => {
        //         const link = document.createElement('a')
        //         link.download = 'my-image-name.png'
        //         link.href = dataUrl
        //         link.click()
        //     })
        //     .catch((err) => {
        //         console.log(err)
        //     })
        // await delay(3000);
        const scale = 1500 / (element.offsetWidth * 1.25);
        html2canvas(element, {scale:scale})
             .then(canvas => {

            const data = canvas.toDataURL('image.jpg');

            const link = document.createElement('a');

            link.href = data
            link.download = title
            link.click()
        })
        // const scale = 1500 / (element.offsetWidth * 1.25);
        // console.log("Csale" + scale)
        // console.log(scale * element.offsetWidth)

        // domtoimage.toPng(element, {
        //     height: element.offsetHeight * scale,
        //     width: element.offsetWidth * scale,
        //     style: {
        //     transform: "scale(" + scale + ")",
        //     transformOrigin: "top left",
        //     width: element.offsetWidth + "px",
        //     height: element.offsetHeight + "px"
        //     }
        // }
        // )
        //     .then(dataUrl => {
        //         const link = document.createElement('a');

        //         link.href = dataUrl
        //         link.download = title
        //         link.click()
        //     })
        //     .catch(function (error) {
        //         console.error('oops, something went wrong!', error);
        //     });

    }

    // useEffect(() => {
    //     handleDownloadImage()
    // })

    const renderBusColor = () => {
        return (
            <>
                <h1 className="menuLabel">Bus Track Color</h1>
                <div className="busColorPickerContainer">
                    <input type="color" value={busColor1} onChange={(e) => { setBusColor1(e.target.value) }}></input>
                    <input type="color" value={busColor2} onChange={(e) => { setBusColor2(e.target.value) }}></input>
                    <input type="color" value={busColor3} onChange={(e) => { setBusColor3(e.target.value) }}></input>
                </div>
            </>
        )
    }

    const renderTemplate = () => {
        switch (template) {
            case 0:

                return (
                    <DinerTemplate
                        picRef={picRef}
                        name={title}
                        time={time}
                        data={ConsolidateData()}
                    />
                )
            case 1:
                return (
                    <PubTemplate
                        picRef={picRef}
                        name={title}
                        time={time}
                        data={ConsolidateData()}
                    />
                )
            case 2:
                return (
                    <CafeTemplate
                        picRef={picRef}
                        name={title}
                        time={time}
                        data={ConsolidateData()}
                    />
                )
            case 3:
                return (
                    <BusTemplate
                        picRef={picRef}
                        name={title}
                        time={time}
                        data={ConsolidateData()}
                        color1={busColor1}
                        color2={busColor2}
                        color3={busColor3}
                    />
                )
            default:
                return ""
        }
    }

    const bigTemplate = () => {
        switch (template) {
            case 0:

                return (
                    <DinerTemplate
                        picRef={bigPicRef}
                        name={title}
                        time={time}
                        data={ConsolidateData()}
                    />
                )
            case 1:
                return (
                    <PubTemplate
                        picRef={bigPicRef}
                        name={title}
                        time={time}
                        data={ConsolidateData()}
                    />
                )
            case 2:
                return (
                    <CafeTemplate
                        picRef={bigPicRef}
                        name={title}
                        time={time}
                        data={ConsolidateData()}
                    />
                )
            case 3:
                return (
                    <BusTemplate
                        picRef={bigPicRef}
                        name={title}
                        time={time}
                        data={ConsolidateData()}
                        color1={busColor1}
                        color2={busColor2}
                        color3={busColor3}
                    />
                )
            default:
                return ""
        }
    }
    const aspectRatio = 1.08;
    var imgWidth = menuContainer.current ? menuContainer.current.offsetWidth * 0.8 : 0;
    var imgHeight = imgWidth > 0 ? imgWidth * aspectRatio : 0
    return (
        <div className="mainContainer">
            {/* <div >
                <div ref={renderContainerRef} style={{ width: width, height: height }} className="canvasRender">
                    {bigTemplate()}
                </div>
            </div> */}

            <div className="container">
                <div className="col">
                    <div className="row">
                        <div ref={menuContainer} className="col-12 col-lg-6 smallRender">

                            <div ref={smallPicRef} style={{ width: imgWidth, height: imgHeight }}>
                                {renderTemplate()}
                            </div>
                        </div>
                        <div className="col-12 col-lg-6">
                            <div className="inputContainer">
                                {template == 3 ? renderBusColor() : ""}
                                <h1 className="menuLabel">Name</h1>
                                <TextInput changeFunc={setTitle} value={title} />
                                <h1 className="menuLabel">Menu</h1>
                                <div className="menuButtonContainer">
                                    <div className={`menuButton noselect ${template == 0 ? "menuButtonActive" : ""}`} onClick={() => setTemplate(0)}>Diner</div>
                                    <div className={`menuButton noselect ${template == 1 ? "menuButtonActive" : ""}`} onClick={() => setTemplate(1)}>Pub</div>
                                    <div className={`menuButton noselect ${template == 2 ? "menuButtonActive" : ""}`} onClick={() => setTemplate(2)}>Cafe</div>
                                    <div className={`menuButton noselect ${template == 3 ? "menuButtonActive" : ""}`} onClick={() => setTemplate(3)}>Singapore Bus Guide</div>

                                </div>
                                <h1 className="menuLabel">Timeframe</h1>
                                <div className="menuButtonContainer">
                                    <div className={`menuButton noselect ${time == 0 ? "menuButtonActive" : ""}`} onClick={() => setTime(0)}>1 Month</div>
                                    <div className={`menuButton noselect ${time == 1 ? "menuButtonActive" : ""}`} onClick={() => setTime(1)}>6 Months</div>
                                    <div className={`menuButton noselect ${time == 2 ? "menuButtonActive" : ""}`} onClick={() => setTime(2)}>All Time</div>
                                </div>
                                <div className="noselect button buttonDownload" onClick={handleDownloadImage}>DOWNLOAD IMAGE</div>

                            </div>


                        </div>
                    </div>
                </div>

            </div>


        </div>
    )
}

export default Main;