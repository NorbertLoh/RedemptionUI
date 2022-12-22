import { React } from "react";
import bg from './diner3.png';
import { container } from "bootstrap";
import { DisplayDate } from "../functions/functions";



const DinerTemplate = (props) => {

    const renderHeaders = (header) => {
        return (
            <div style={{
                // border: "1px solid",
                width: 455
            }}>
                <span className="dinerHeader">{header}</span>
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
                        <span className="dinerItems dinerArtist line-clamp2" key={"n" + i}>{val[0]}</span>
                        <span className="dinerItems dinerPrice" key={"p" + i}>${val[1]}.00</span>
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
                        <span className="line-clamp2 dinerItems dinerTracks" key={"n" + i}>{val[0]}</span>
                        <span className="dinerItems dinerPrice" key={"p" + i}>${val[1]}</span>
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
                        <span className="dinerItems dinerGenre" key={"n" + i}>{val[0]}</span>
                        <span className="dinerItems dinerPrice" key={"p" + i}>${val[1]}.00</span>
                    </div>


                })}

            </div>
        )
    }

    return (
        <div ref={props.picRef} className="templateContainer container" style={{ backgroundImage: `url(${bg})` }}>
            <span className="absolute" style={{
                fontFamily: "Yellowtail-Regular",
                fontSize: 90,
                top: 30,
                left: 100,
                fontWeight: 500,
                color: "#094B29",
                transform: "rotate(-3deg)",
                textAlign: "center",
                width: 700,
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap"
            }}>{props.name}'s Grill</span>
            <span className="absolute" style={{
                fontFamily: "Neucha-Regular",
                fontSize: 30,
                left: 280,
                top: 145,
                color: "#FA4C48",
                transform: "rotate(-4deg)",
                width: 350,
                fontWeight: 700,
                textAlign: "center",
            }}>Open since {DisplayDate(props.time)}</span>

            {/* burgers - artist */}
            <div className="absolute" style={{
                left: 380,
                top: 340,
            }}>{renderHeaders("PRICE")}</div>
            <div className="absolute" style={{
                left: 30,
                top: 400,
            }}>{renderArtists()}</div>



            {/* sides - tracks */}
            <div className="absolute" style={{
                left: 878,
                top: 340,
            }}>{renderHeaders("PRICE")}</div>
            <div className="absolute" style={{
                left: 528,
                top: 400,
            }}>{renderTracks()}</div>

            {/* drinks - genre */}
            <div className="absolute" style={{
                left: 1365,
                top: 340,
            }}>{renderHeaders("PRICE")}</div>
            <div className="absolute" style={{
                left: 1015,
                top: 400,
            }}>{renderGenre()}</div>
        </div>
    )
}

export default DinerTemplate;