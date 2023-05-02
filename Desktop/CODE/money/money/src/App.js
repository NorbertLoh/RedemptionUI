import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";

import Mainpage from "./pages/Mainpage";
import AddPage from "./pages/AddPage";
import CreateRoom from "./pages/CreateRoom";
import RoomPage from "./pages/RoomPage";
import EventPage from "./pages/EventPage";

export default function App() {
    return (
        <HashRouter>
            <Routes>
                <Route index path="/" element={<Mainpage />} />
                <Route path="/add" element={<AddPage />} />
                <Route path="/createroom" element={<CreateRoom />} />
                <Route path="/room" element={<RoomPage />} />
                <Route path="/event" element={<EventPage />} />
            </Routes>
        </HashRouter>
    );
}
