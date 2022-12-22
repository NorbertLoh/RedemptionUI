import { React, useEffect, useState, useLayoutEffect } from "react";
import bg from './busURL.png';
import { container } from "bootstrap";
import { PadString, GetBusDate, RandomBusNumber } from "../functions/functions";

const BusTemplate = (props) => {
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

    useEffect(() => {
        console.log(itemsFont)
        console.log(itemsMarginSide)
        console.log(itemsMarginTop)
        console.log(itemsWidth)
        console.log(priceBorder)
        console.log("changes")
    }, [props.picRef.current ? props.picRef.current.offsetWidth : ""]);
    var itemsFont = props.picRef.current != undefined ? props.picRef.current.offsetWidth / 50 : 0
    var itemsMarginSide = props.picRef.current != undefined ? props.picRef.current.offsetWidth / 50 : 0
    var itemsMarginTop = props.picRef.current != undefined ? props.picRef.current.offsetWidth / 380 : 1
    var itemsWidth = props.picRef.current != undefined ? props.picRef.current.offsetWidth / 3.27 : 0
    var priceBorder = props.picRef.current != undefined ? props.picRef.current.offsetWidth / 100 : 0
    var itemsPaddingLeft = props.picRef.current != undefined ? props.picRef.current.offsetWidth / 150 : 0
    var itemsStyle = {
        fontSize: itemsFont,
        // marginLeft: itemsMarginSide,
        marginTop: itemsMarginTop,
        marginBottom: itemsMarginTop,
        paddingLeft: itemsPaddingLeft,
        marginRight: itemsMarginSide
    }
    var priceStyle = {
        fontSize: itemsFont,
        alignSelf: "center",
        display: "flex",
        marginTop: itemsMarginTop * 2,
    }
    var priceBorderLeft = `${priceBorder}px solid #DB354D`
    console.log(itemsMarginTop)
    // var itemsFont = 30


    const renderHeaders = () => {
        return (
            <div style={{
                display: "flex",
                fontFamily: "Oswald",
                textAlign: "center",
                lineHeight: props.picRef.current != undefined ? props.picRef.current.offsetWidth * 0.0172 + "px" : 0,
                fontSize: props.picRef.current != undefined ? props.picRef.current.offsetWidth / 60 : 0,
                borderBottom: `0.1em solid grey`,
                marginTop: props.picRef.current != undefined ? props.picRef.current.offsetWidth * 0.015 + "px" : 0,
                paddingBottom: props.picRef.current != undefined ? props.picRef.current.offsetWidth * 0.005 + "px" : 0,
                paddingLeft: priceBorder,
                // height: props.picRef.current != undefined ? props.picRef.current.offsetHeight / 22.2 : 0,
            }}>
                <div className="busStopCode">
                    Bus Stop<br />Code
                </div>
                <div style={{
                    // border: "1px solid",
                    width: "70%",
                    alignSelf: "end"
                }}>Description</div>
            </div>
        )
    }



    const renderArtists = () => {
        var artists = props.data.artists
        return (
            <div style={{
                // border: "1px solid",
                width: itemsWidth,
                // borderLeft: priceBorderLeft,
            }}>
                {artists.map((val, i) => {
                    let price = BusPriceFormat(val[1])
                    return <div key={"a" + i} style={{ display: "flex" }}>
                        {/* v */}
                        <div className="busBorderLeft"></div>
                        <div style={{ backgroundColor: props.color1 }} className="busPriceContainer">
                            <div style={priceStyle} className="busItems busPrice" key={"p" + i}>{price}</div></div>
                        <span style={itemsStyle} className="busItems busArtist line-clamp2 busItemsPadding" key={"n" + i}>{val[0]}</span>

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
                width: itemsWidth,
            }}
            >
                {tracks.map((val, i) => {
                    let price = BusPriceFormat(val[1])
                    return <div id={"t" + i} key={"d" + i} style={{ display: "flex" }}>
                        <div className="busBorderLeft"></div>
                        <div style={{ backgroundColor: props.color2 }} className="busPriceContainer"><div style={priceStyle} className="busItems busPrice" key={"p" + i}>{price}</div></div>
                        <span style={itemsStyle} className="busItems busArtist line-clamp2 busItemsPadding" key={"n" + i}>{val[0]}</span>
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
                width: itemsWidth,
            }}>
                {genre.map((val, i) => {
                    let price = BusPriceFormat(val[1])
                    return <div id={"t" + i} key={"d" + i} style={{ display: "flex" }}>
                        <div className="busBorderLeft"></div>
                        <div style={{ backgroundColor: props.color3 }} className="busPriceContainer"><div style={priceStyle} className="busItems busPrice" key={"p" + i}>{price}</div></div>
                        <span style={itemsStyle} className="busItems busArtist line-clamp2 busItemsPadding" key={"n" + i}>{val[0]}</span>
                    </div>
                })}

            </div>
        )
    }

    const renderBusNumber = (index) => {
        var number = BusNumber[index]
        return (
            <>
                <div style={{
                    width: props.picRef.current != undefined ? props.picRef.current.offsetWidth / 6 : 0,
                    // border: "1px solid",
                }}>
                    <div style={{
                        fontFamily: "WendyOne",
                        // border: "1px solid",
                        fontSize: props.picRef.current != undefined ? props.picRef.current.offsetWidth / 20 : 0,
                        paddingTop: props.picRef.current != undefined ? props.picRef.current.offsetWidth / 370 : 0,
                        textAlign: "center",
                        width: props.picRef.current != undefined ? props.picRef.current.offsetWidth / 6 : 0,
                        height: props.picRef.current != undefined ? props.picRef.current.offsetWidth / 13.9 : 0,

                    }}>{number}</div>
                </div>
                {renderHeaders}
            </>
        )
    }

    useEffect(() => {
        setBusNumber(RandomBusNumber())
    }, [])

    console.log(props.picRef)
    if (props.picRef.current) {
        console.log(props.picRef.current.offsetWidth)
        console.log(props.picRef.current.offsetHeight)
        console.log(props.picRef.current.offsetWidth / 15)
    }

    var itemsTop = props.picRef.current != undefined ? props.picRef.current.offsetWidth * 0.151 : 0
    const BusPriceFormat = (trackPrice) => {
        var noColon = trackPrice.toString().replace(":", "")
        return PadString(noColon, 6)
    }
    return (
        <div ref={props.picRef} className="templateContainer">
            <img className="img" src={bg} />
            <div className="container">
                <div className="absolute" style={{
                    width: props.picRef.current != undefined ? props.picRef.current.offsetWidth : 0,
                    height: props.picRef.current != undefined ? props.picRef.current.offsetWidth / 6.6 : 0,

                    left: 0,
                    paddingLeft: props.picRef.current != undefined ? props.picRef.current.offsetWidth / 30 : 0,
                    // border: "1px solid",
                    top: props.picRef.current != undefined ? props.picRef.current.offsetWidth / 36.5 : 0,
                }}>

                    <span className="absolute" style={{
                        fontFamily: "WendyOne",
                        fontSize: props.picRef.current != undefined ? props.picRef.current.offsetWidth / 16 : 0,
                        // top: props.picRef.current != undefined ? props.picRef.current.offsetHeight / 99 : 0,
                        // left: props.picRef.current != undefined ? props.picRef.current.offsetWidth / 20 : 0,
                        fontWeight: 500,
                        color: "var(--text)",
                        width: "55%",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        // border: "1px solid"
                        // }}>{props.name}'s Grill</span>
                    }}>{props.name}</span>
                    <span className="absolute" style={{
                        fontFamily: "WendyOne",
                        fontSize: props.picRef.current != undefined ? props.picRef.current.offsetWidth / 50 : 0,
                        // top: props.picRef.current != undefined ? props.picRef.current.offsetHeight / 99 : 0,
                        left: props.picRef.current != undefined ? props.picRef.current.offsetWidth / 1.674 : 0,
                        fontWeight: 100,
                        color: "var(--text)",
                        width: "40%",
                        textAlign: "end",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        // border: "1px solid"
                        // }}>{props.name}'s Grill</span>
                    }}>Bus Stop Code:
                        <span style={{
                            fontFamily: "WendyOne",
                            paddingLeft: props.picRef.current != undefined ? props.picRef.current.offsetWidth / 99 : 0,
                            fontSize: props.picRef.current != undefined ? props.picRef.current.offsetWidth / 16 : 0,
                            paddingRight: props.picRef.current != undefined ? props.picRef.current.offsetWidth / 30 : 0,

                        }}>
                            {GetBusDate(props.time)}
                        </span>
                    </span>


                </div>

                {/* burgers - artist */}
                {/* <div className="absolute" style={{
                left: props.picRef.current != undefined ? props.picRef.current.offsetWidth / 3.88 : 0,
                top: priceTop,
            }}></div> */}
                <div className="absolute" style={{
                    left: props.picRef.current != undefined ? props.picRef.current.offsetWidth / 40 : 0,
                    top: itemsTop,
                }}>



                    {renderBusNumber(0)}
                    {renderHeaders("PRICE")}
                    {renderArtists()}
                </div>



                {/* sides - tracks */}
                {/* <div className="absolute" style={{
                left: props.picRef.current != undefined ? props.picRef.current.offsetWidth / 1.7 : 0,
                top: priceTop,
            }}>{renderHeaders("PRICE")}</div> */}
                <div className="absolute" style={{
                    left: props.picRef.current != undefined ? props.picRef.current.offsetWidth / 2.883 : 0,
                    top: itemsTop,
                }}>{renderBusNumber(1)}{renderHeaders("PRICE")}{renderTracks()}</div>

                {/* drinks - genre */}
                {/* <div className="absolute" style={{
                left: props.picRef.current != undefined ? props.picRef.current.offsetWidth / 1.096 : 0,
                top: priceTop,
            }}>{renderHeaders("PRICE")}</div> */}
                <div className="absolute" style={{
                    left: props.picRef.current != undefined ? props.picRef.current.offsetWidth / 1.493 : 0,
                    top: itemsTop,
                }}>{renderBusNumber(2)}{renderHeaders("PRICE")}{renderGenre()}</div>
            </div>
        </div>
    )
}

export default BusTemplate;