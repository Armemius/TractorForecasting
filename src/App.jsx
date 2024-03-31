import './App.css'
import {BrowserRouter,Route, Routes} from "react-router-dom";
import {ABOUT_ROUTE, ANY_ROUTE, MAIN_ROUTE, MAP_ROUTE, REPORT_ROUTE_FULL, TABLE_ROUTE} from "./Constants.js";
import Navbar from "./components/Navbar.jsx";
import MapPage from "./routes/MapPage.jsx";
import TelemetryPage from "./routes/TelemetryPage.jsx";
import ReportPage from "./routes/ReportPage.jsx";
import MainPage from "./routes/MainPage.jsx";

function App() {
    return (
        <>

            <BrowserRouter>
                <Navbar/>
                <Routes>
                    <Route path={MAIN_ROUTE} element={<MainPage/>}/>
                    <Route path={MAP_ROUTE} element={<MapPage/>}/>
                    <Route path={TABLE_ROUTE} element={<TelemetryPage/>} />
                    <Route path={ABOUT_ROUTE} element={<div>About</div>} />
                    <Route path={REPORT_ROUTE_FULL} element={<ReportPage/>} />
                    <Route path={ANY_ROUTE} element={<div>404</div>} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
