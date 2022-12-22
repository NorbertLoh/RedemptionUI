import { React } from "react";
// import bg from './cafe.png';
import bg from './menubig.jpg';
import { container } from "bootstrap";
import { DisplayDate } from "../functions/functions";



const CafeTemplate = (props) => {

    const renderHeaders = (header) => {
        return (
            <div style={{
                // border: "1px solid",
                width: 455
            }}>
                <span className="cafeHeader">{header}</span>
            </div>
        )
    }

    const renderArtists = () => {
        var artists = props.data.artists
        return (
            <div style={{
                // border: "1px solid",
                width: 455
                }}>
                {artists.map((val, i) => {
                    return <div key={"a" + i} style={{ display: "flex" }}>
                        <span className="cafeItems cafeArtist line-clamp2" key={"n" + i}>{val[0]}</span>
                        <span className="cafeItems cafePrice" key={"p" + i}>${val[1]}.00</span>
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
                width: 455
            }}
            >
                {tracks.map((val, i) => {
                    if (i < 10) {
                        return <div id={"t" + i} key={"d" + i} style={{ display: "flex" }}>
                        <span className="line-clamp2 cafeItems cafeTracks" key={"n" + i}>{val[0]}</span>
                        <span className="cafeItems cafePrice" key={"p" + i}>${val[1]}</span>
                    </div>
                    } else {
                        return
                    }
                })}

            </div>
        )
    }

    const renderGenre = () => {
        var genre = props.data.genre
        return (
            <div style={{
                // border: "1px solid",
                width: 455
            }}>
                {genre.map((val, i) => {

                    return <div key={"d" + i} style={{ display: "flex" }}>
                        <span className="cafeItems cafeGenre" key={"n" + i}>{val[0]}</span>
                        <span className="cafeItems cafePrice" key={"p" + i}>${val[1]}.00</span>
                    </div>


                })}

            </div>
        )
    }

    return (
        <div ref={props.picRef} className="templateContainer container" style={{ backgroundImage: `url(${bg})` }}>
            <span className="absolute" style={{
                fontFamily: "Bevan",
                fontSize: 60,
                top: 140,
                left: 220,
                fontWeight: 500,
                color: "#393939"
            }}>{props.name}'s Oven</span>
            <span className="absolute" style={{
                fontFamily: "Lexend",
                fontSize: 40,
                left: 220,
                top: 215
            }}>Baking since {DisplayDate(props.time)}</span>

            {/* breads - artist */}
            <div className="absolute" style={{
                left: 70,
                top: 375,
            }}>{renderHeaders("Breads")}</div>
            <div className="absolute" style={{
                left: 70,
                top: 480,
            }}>{renderArtists()}</div>



            {/* pastries - tracks */}
            <div className="absolute" style={{
                left: 535,
                top: 375,
            }}>{renderHeaders("Pastries")}</div>
            <div className="absolute" style={{
                left: 535,
                top: 480,
            }}>{renderTracks()}</div>

            {/* drinks - genre */}
            <div className="absolute" style={{
                left: 980,
                top: 375,
            }}>{renderHeaders("Drinks")}</div>
            <div className="absolute" style={{
                left: 980,
                top: 480,
            }}>{renderGenre()}</div>
        </div>
    )
}

export default CafeTemplate;