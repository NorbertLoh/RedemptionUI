import { React, useEffect, useState } from "react";
import bg from './diner3.png';
import { container } from "bootstrap";
import { DisplayDate } from "../functions/functions";



const DinerTemplate = (props) => {
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

    const [BusNumber, setBusNumber] = useState(["", "", ""])

    var itemsFont = props.picRef.current != undefined ? props.picRef.current.offsetWidth / 50 : 0
    var itemsMarginSide = props.picRef.current != undefined ? props.picRef.current.offsetWidth / 50 : 0
    var itemsMarginTop = props.picRef.current != undefined ? props.picRef.current.offsetWidth / 300 : 1
    var itemsWidth = props.picRef.current != undefined ? props.picRef.current.offsetWidth / 3.3 : 0
    var itemsStyle = {
        fontSize: itemsFont,
        marginLeft: itemsMarginSide,
        marginTop: itemsMarginTop,
        marginBottom: itemsMarginTop
    }
    var priceStyle = {
        marginTop: itemsMarginTop,
        fontSize: itemsFont
    }
    console.log(itemsMarginTop)
    // var itemsFont = 30
    const renderHeaders = (header) => {
        return (
            <div style={{
                // border: "1px solid",
            }}>
                {/* <span style={{
                    fontSize: itemsFont
                }} className="dinerHeader">{header}</span> */}
                <div style={{ display: "flex" }}>
                    <span style={itemsStyle} className="dinerItems dinerArtist line-clamp2"></span>
                    <span className="dinerHeader" style={{
                        fontSize: itemsFont,
                        textAlign: "center",
                        width: "20%",
                        marginBottom: props.picRef.current != undefined ? props.picRef.current.offsetHeight / 100 : 1
                        // marginBottom: 
                    }}>PRICE</span>
                </div>
            </div >
        )
    }

    const renderArtists = () => {
        var artists = props.data.artists
        return (
            <div style={{
                // border: "1px solid",
                width: itemsWidth,
            }}>
                {artists.map((val, i) => {
                    return <div key={"a" + i} style={{ display: "flex" }}>
                        <span style={itemsStyle} className="dinerItems dinerArtist line-clamp2" key={"n" + i}>{val[0]}</span>
                        <span style={priceStyle} className="dinerItems dinerPrice" key={"p" + i}>${val[1]}.00</span>
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
                        <span style={itemsStyle} className="line-clamp2 dinerItems dinerTracks" key={"n" + i}>{val[0]}</span>
                        <span style={priceStyle} className="dinerItems dinerPrice" key={"p" + i}>${val[1]}</span>
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
                        <span style={itemsStyle} className="dinerItems dinerGenre" key={"n" + i}>{val[0]}</span>
                        <span style={priceStyle} className="dinerItems dinerPrice" key={"p" + i}>${val[1]}.00</span>
                    </div>


                })}

            </div>
        )
    }

    // const [width, setWidth] = useState(0);
    // const [height, setHeight] = useState(0);

    // const ref = useRef(null);

    // useEffect(() => {
    //     setWidth(ref.current.offsetWidth);
    //     setHeight(ref.current.offsetHeight);
    // }, []);
    console.log(props.picRef)
    if (props.picRef.current) {
        console.log(props.picRef.current.offsetWidth)
        console.log(props.picRef.current.offsetHeight)
        console.log(props.picRef.current.offsetWidth / 15)
    }

    var itemsTop = props.picRef.current != undefined ? props.picRef.current.offsetWidth * 0.22 : 0

    return (
        <div ref={props.picRef} className="templateContainer" >
            <img className="img" src={bg} />
            <div className="container">
                <span className="absolute" style={{
                    fontFamily: "Yellowtail-Regular",
                    fontSize: props.picRef.current != undefined ? props.picRef.current.offsetWidth / 16 : 0,
                    top: props.picRef.current != undefined ? props.picRef.current.offsetWidth / 99 : 0,
                    left: props.picRef.current != undefined ? props.picRef.current.offsetWidth / 20 : 0,
                    fontWeight: 500,
                    color: "#094B29",
                    transform: "rotate(-3deg)",
                    textAlign: "center",
                    width: props.picRef.current != undefined ? props.picRef.current.offsetWidth / 2 : 0,
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    // border: "1px solid"
                    // }}>{props.name}'s Grill</span>
                }}>{props.name}</span>
                <span className="absolute" style={{
                    fontFamily: "Neucha-Regular",
                    fontSize: props.picRef.current != undefined ? props.picRef.current.offsetWidth / 50 : 0,
                    left: props.picRef.current != undefined ? props.picRef.current.offsetWidth / 5.4 : 0,
                    top: props.picRef.current != undefined ? props.picRef.current.offsetWidth / 10.2 : 0,
                    color: "#FA4C48",
                    transform: "rotate(-4deg)",
                    width: props.picRef.current != undefined ? props.picRef.current.offsetWidth / 4.3 : 0,
                    fontWeight: 700,
                    textAlign: "center",
                    // border: "1px solid"
                }}>Open since {DisplayDate(props.time)}</span>

                {/* burgers - artist */}
                {/* <div className="absolute" style={{
                left: props.picRef.current != undefined ? props.picRef.current.offsetWidth / 3.88 : 0,
                top: priceTop,
            }}></div> */}
                <div className="absolute" style={{
                    left: props.picRef.current != undefined ? props.picRef.current.offsetWidth / 45 : 0,
                    top: itemsTop,
                }}>{renderHeaders("PRICE")}{renderArtists()}</div>



                {/* sides - tracks */}
                {/* <div className="absolute" style={{
                left: props.picRef.current != undefined ? props.picRef.current.offsetWidth / 1.7 : 0,
                top: priceTop,
            }}>{renderHeaders("PRICE")}</div> */}
                <div className="absolute" style={{
                    left: props.picRef.current != undefined ? props.picRef.current.offsetWidth / 2.84 : 0,
                    top: itemsTop,
                }}>{renderHeaders("PRICE")}{renderTracks()}</div>

                {/* drinks - genre */}
                {/* <div className="absolute" style={{
                left: props.picRef.current != undefined ? props.picRef.current.offsetWidth / 1.096 : 0,
                top: priceTop,
            }}>{renderHeaders("PRICE")}</div> */}
                <div className="absolute" style={{
                    left: props.picRef.current != undefined ? props.picRef.current.offsetWidth / 1.478 : 0,
                    top: itemsTop,
                }}>{renderHeaders("PRICE")}{renderGenre()}</div>
            </div>
        </div>
    )
}

export default DinerTemplate;