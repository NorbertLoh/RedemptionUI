import { React, useEffect, useState } from "react";
// import bg from './cafe.png';
import bg from './cafe3.png';
import { container } from "bootstrap";
import { DisplayDate } from "../functions/functions";



const CafeTemplate = (props) => {
    const [windowWidth, setWindowWidth] = useState(0);
    const [windowHeight, setWindowHeight] = useState(0);
    let resizeWindow = () => {
        setWindowWidth(window.innerWidth);
        setWindowHeight(window.innerHeight);
    };

    useEffect(() => {
        resizeWindow();
        window.addEventListener("resize", resizeWindow);
        return () => window.removeEventListener("resize", resizeWindow);
    }, []);

    var itemsFont = props.picRef.current != undefined ? props.picRef.current.offsetWidth / 50 : 0
    var itemsMarginSide = props.picRef.current != undefined ? props.picRef.current.offsetWidth / 150 : 0
    var itemsMarginTop = props.picRef.current != undefined ? props.picRef.current.offsetWidth / 400 : 0
    var itemsWidth = props.picRef.current != undefined ? props.picRef.current.offsetWidth / 3.3 : 0
    var itemsStyle = {
        fontSize: itemsFont,
        marginLeft: itemsMarginSide,
        marginTop: itemsMarginTop,
        marginBottom: itemsMarginTop
    }
    var headerStyle = {
        fontSize: props.picRef.current != undefined ? props.picRef.current.offsetWidth / 42.8 : 0,
        marginLeft: itemsMarginSide
    }
    var priceStyle = {
        fontSize: itemsFont,
        marginTop: itemsMarginTop,
        marginBottom: itemsMarginTop
    }
    const renderHeaders = (header) => {
        return (
            <div style={{
                // border: "1px solid",
                width: itemsWidth
            }}>
                <div style={headerStyle} className="cafeHeader">{header}</div>
            </div>
        )
    }

    const renderArtists = () => {
        var artists = props.data.artists
        return (
            <div style={{
                // border: "1px solid",
                width: itemsWidth
            }}>
                {artists.map((val, i) => {
                    return <div key={"a" + i} style={{ display: "flex" }}>
                        <span style={itemsStyle} className="cafeItems cafeArtist line-clamp2" key={"n" + i}>{val[0]}</span>
                        <span style={priceStyle} className="cafeItems cafePrice" key={"p" + i}>${val[1]}.00</span>
                    </div>
                })}

            </div>
        )
    }

    const renderTracks = () => {

        var tracks = props.data.tracks

        return (
            <div style={{
                // border: "1px solid",
                width: itemsWidth
            }}
            >
                {tracks.map((val, i) => {

                    return <div id={"t" + i} key={"d" + i} style={{ display: "flex" }}>
                        <span style={itemsStyle} className="cafeItems cafeTracks line-clamp2" key={"n" + i}>{val[0]}</span>
                        <span style={priceStyle} className="cafeItems cafePrice" key={"p" + i}>${val[1]}</span>
                    </div>
                })}

            </div>
        )
    }

    const renderGenre = () => {
        var genre = props.data.genre
        return (
            <div style={{
                // border: "1px solid",
                width: itemsWidth
            }}>
                {genre.map((val, i) => {

                    return <div key={"d" + i} style={{ display: "flex" }}>
                        <span style={itemsStyle} className="cafeItems cafeGenre line-clamp2" key={"n" + i}>{val[0]}</span>
                        <span style={priceStyle} className="cafeItems cafePrice" key={"p" + i}>${val[1]}.00</span>
                    </div>


                })}

            </div>
        )
    }

    var itemsTop = props.picRef.current != undefined ? props.picRef.current.offsetWidth / 3.14 : 0
    var headersTop = props.picRef.current != undefined ? props.picRef.current.offsetWidth / 3.98 : 0
    var imageBorder = props.picRef.current != undefined ? props.picRef.current.offsetWidth / 400 : 0

    return (
        <div ref={props.picRef} className="templateContainer" style={{ border: `${imageBorder}px solid #393939` }}>
            <img className="img" src={bg} />
            <div className="container">
                <span className="absolute" style={{
                    fontFamily: "Bevan",
                    // fontSize: 60,
                    fontSize: props.picRef.current != undefined ? props.picRef.current.offsetWidth / 25 : 0,

                    // top: 140,
                    top: props.picRef.current != undefined ? props.picRef.current.offsetWidth / 10.85 : 0,

                    // left: 220,
                    left: props.picRef.current != undefined ? props.picRef.current.offsetWidth / 6.818 : 0,

                    fontWeight: 500,
                    color: "#393939"
                }}>{props.name}</span>
                <span className="absolute" style={{
                    fontFamily: "Lexend",
                    // fontSize: 40,
                    fontSize: props.picRef.current != undefined ? props.picRef.current.offsetWidth / 37.5 : 0,

                    // left: 220,
                    // top: 215,
                    top: props.picRef.current != undefined ? props.picRef.current.offsetWidth / 7.02 : 0,
                    left: props.picRef.current != undefined ? props.picRef.current.offsetWidth / 6.818 : 0,

                }}>Baking since {DisplayDate(props.time)}</span>

                {/* breads - artist */}
                <div className="absolute" style={{
                    left: props.picRef.current != undefined ? props.picRef.current.offsetWidth / 21.42 : 0,
                    top: headersTop,
                }}>{renderHeaders("Breads")}</div>
                <div className="absolute" style={{
                    left: props.picRef.current != undefined ? props.picRef.current.offsetWidth / 21.42 : 0,
                    top: itemsTop,
                }}>{renderArtists()}</div>



                {/* pastries - tracks */}
                <div className="absolute" style={{
                    left: props.picRef.current != undefined ? props.picRef.current.offsetWidth / 2.803 : 0,
                    top: headersTop,
                }}>{renderHeaders("Pastries")}</div>
                <div className="absolute" style={{
                    left: props.picRef.current != undefined ? props.picRef.current.offsetWidth / 2.803 : 0,
                    top: itemsTop,
                }}>{renderTracks()}</div>

                {/* drinks - genre */}
                <div className="absolute" style={{
                    left: props.picRef.current != undefined ? props.picRef.current.offsetWidth / 1.5299 : 0,
                    top: headersTop,
                }}>{renderHeaders("Drinks")}</div>
                <div className="absolute" style={{
                    left: props.picRef.current != undefined ? props.picRef.current.offsetWidth / 1.5299 : 0,
                    top: itemsTop,
                }}>{renderGenre()}</div>
            </div>
        </div>
    )
}

export default CafeTemplate;