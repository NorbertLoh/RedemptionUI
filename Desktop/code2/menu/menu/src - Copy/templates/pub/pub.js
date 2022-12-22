import { React } from "react";
import bg from './pub3.png';
import { container } from "bootstrap";
import { DisplayDate } from "../functions/functions";



const PubTemplate = (props) => {
    const renderArtists = () => {
        var artists = props.data.artists
        return (
            <div style={{
                // border: "1px solid white",
                width: 400
                }}>
                {artists.map((val, i) => {
                    return <div key={"a" + i} style={{ display: "flex" }}>
                        <span className="PubItems PubArtist line-clamp2" key={"n" + i}>{val[0]}</span>
                        <span className="PubItems PubPrice" key={"p" + i}>{val[1]}</span>
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
                width: 400
            }}
            >
                {tracks.map((val, i) => {
                    if (i < 10) {
                        return <div id={"t" + i} key={"d" + i} style={{ display: "flex" }}>
                        <span className="line-clamp2 PubItems PubTracks" key={"n" + i}>{val[0]}</span>
                        <span className="PubItems PubPrice" key={"p" + i}>{val[1]}</span>
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
                // border: "1px solid white",
                width: 400
            }}>
                {genre.map((val, i) => {

                    return <div key={"d" + i} style={{ display: "flex" }}>
                        <span className="PubItems PubGenre" key={"n" + i}>{val[0]}</span>
                        <span className="PubItems PubPrice" key={"p" + i}>{val[1]}</span>
                    </div>


                })}

            </div>
        )
    }

    return (
        <div ref={props.picRef} className="templateContainer container" style={{ backgroundImage: `url(${bg})` }}>
            <span className="absolute" style={{
                fontFamily: "BebasNeue-Regular",
                fontSize: 130,
                top: 70,
                left: 85,
                fontWeight: 500,
                color: "#FF918C",
                textAlign: "center",
                width: 1332,
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
            }}>{props.name}'s PUB</span>
            <span className="absolute" style={{
                fontFamily: "BebasNeue-Regular",
                fontSize: 40,
                left: 470,
                top: 295,
                color: "#FF918C",
                width: 560,
                fontWeight: 500,
                textAlign: "center"
            }}>EST. {DisplayDate(props.time)}</span>

            {/* cocktails - artist */}
            <div className="absolute" style={{
                left: 70,
                top: 520,
            }}>{renderArtists()}</div>



            {/* Beer - tracks */}
            <div className="absolute" style={{
                left: 550,
                top: 520,
            }}>{renderTracks()}</div>

            {/* wine - genre */}
            <div className="absolute" style={{
                left: 1035,
                top: 520,
            }}>{renderGenre()}</div>
        </div>
    )
}

export default PubTemplate;