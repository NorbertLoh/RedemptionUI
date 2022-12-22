import { React, useState, useEffect } from "react";
import bg from './pub3.png';
import { container } from "bootstrap";
import { DisplayDate } from "../functions/functions";



const PubTemplate = (props) => {
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
    var itemsMarginSide = props.picRef.current != undefined ? props.picRef.current.offsetWidth / 50 : 0
    var itemsMarginTop = props.picRef.current != undefined ? props.picRef.current.offsetWidth / 400 : 1
    var itemsWidth = props.picRef.current != undefined ? props.picRef.current.offsetWidth / 3.76 : 0
    var itemsStyle = {
        fontSize: itemsFont,
        marginTop: itemsMarginTop,
        marginBottom: itemsMarginTop
    }
    var priceStyle = {
        marginTop: itemsMarginTop,
        fontSize: itemsFont
    }
    const renderArtists = () => {
        var artists = props.data.artists
        return (
            <div style={{
                // border: "1px solid white",
                width: itemsWidth
            }}>
                {artists.map((val, i) => {
                    return <div key={"a" + i} style={{ display: "flex" }}>
                        <span style={itemsStyle} className="PubItems PubArtist line-clamp2" key={"n" + i}>{val[0]}</span>
                        <span style={priceStyle} className="PubItems PubPrice" key={"p" + i}>{val[1]}</span>
                    </div>
                })}

            </div>
        )
    }

    const renderTracks = () => {

        var tracks = props.data.tracks

        return (
            <div style={{
                // border: "1px solid white",
                width: itemsWidth
            }}
            >
                {tracks.map((val, i) => {
                    return <div id={"t" + i} key={"d" + i} style={{ display: "flex" }}>
                        <span style={itemsStyle} className="PubItems PubArtist line-clamp2" key={"n" + i}>{val[0]}</span>
                        <span style={priceStyle} className="PubItems PubPrice" key={"p" + i}>{val[1]}</span>
                    </div>
                })}

            </div>
        )
    }

    const renderGenre = () => {
        var genre = props.data.genre
        return (
            <div style={{
                // border: "1px solid white",
                width: itemsWidth
            }}>
                {genre.map((val, i) => {

                    return <div key={"d" + i} style={{ display: "flex" }}>
                        <span style={itemsStyle} className="PubItems PubArtist line-clamp2" key={"n" + i}>{val[0]}</span>
                        <span style={priceStyle} className="PubItems PubPrice" key={"p" + i}>{val[1]}</span>
                    </div>


                })}

            </div>
        )
    }
    var itemsTop = props.picRef.current != undefined ? props.picRef.current.offsetWidth / 2.88 : 0
    var imageBorder = props.picRef.current != undefined ? props.picRef.current.offsetWidth / 400 : 0
    return (
        <div ref={props.picRef} className="templateContainer" style={{ border: `${imageBorder}px solid white` }}>
            <img className="img" src={bg} />
            <div className="container">
                <span className="absolute" style={{
                    fontFamily: "BebasNeue-Regular",
                    // fontSize: 130,
                    fontSize: props.picRef.current != undefined ? props.picRef.current.offsetWidth / 11.5 : 0,
                    // top: 70,
                    // left: 85,
                    top: props.picRef.current != undefined ? props.picRef.current.offsetWidth / 21.2 : 0,
                    left: props.picRef.current != undefined ? props.picRef.current.offsetWidth / 17.5 : 0,
                    fontWeight: 500,
                    color: "#FF918C",
                    textAlign: "center",
                    // width: 1332,
                    width: props.picRef.current != undefined ? props.picRef.current.offsetWidth / 1.126 : 0,
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                }}>{props.name}</span>
                <span className="absolute" style={{
                    fontFamily: "BebasNeue-Regular",
                    // fontSize: 40,
                    fontSize: props.picRef.current != undefined ? props.picRef.current.offsetWidth / 37 : 0,
                    // left: 470,
                    left: props.picRef.current != undefined ? props.picRef.current.offsetWidth / 3.19 : 0,
                    // top: 295,
                    top: props.picRef.current != undefined ? props.picRef.current.offsetWidth / 5.12 : 0,
                    color: "#FF918C",
                    // width: 560,
                    width: props.picRef.current != undefined ? props.picRef.current.offsetWidth / 2.675 : 0,
                    fontWeight: 500,
                    textAlign: "center"
                }}>EST. {DisplayDate(props.time)}</span>

                {/* cocktails - artist */}
                <div className="absolute" style={{
                    // left: 70,
                    // top: 520,
                    top: itemsTop,
                    left: props.picRef.current != undefined ? props.picRef.current.offsetWidth / 21.4 : 0
                }}>{renderArtists()}</div>



                {/* Beer - tracks */}
                <div className="absolute" style={{
                    // left: 550,
                    left: props.picRef.current != undefined ? props.picRef.current.offsetWidth / 2.727 : 0,
                    top: itemsTop,
                }}>{renderTracks()}</div>

                {/* wine - genre */}
                <div className="absolute" style={{
                    // left: 1035,
                    left: props.picRef.current != undefined ? props.picRef.current.offsetWidth / 1.4492 : 0,
                    top: itemsTop,
                }}>{renderGenre()}</div>
            </div>
        </div>
    )
}

export default PubTemplate;