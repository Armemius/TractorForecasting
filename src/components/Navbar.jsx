import { FaTractor } from "react-icons/fa";
import {Link} from "react-router-dom";
import {MAIN_ROUTE, MAP_ROUTE, TABLE_ROUTE} from "../Constants.js";
// import TractorLogo from "../assets/tractor.webp";

const Navbar = () => {
    return (
        <nav>
            <h1 className="logo">
                <FaTractor />
                <span>Tractor Forecasting</span>
            </h1>
            <Link to={MAIN_ROUTE}>
                <div className="link">
                    На главную
                </div>
            </Link>
            <Link to={MAP_ROUTE}>
                <div className="link">
                    Карта
                </div>
            </Link>
            <Link to={TABLE_ROUTE}>
                <div className="link">
                    Телеметрия
                </div>
            </Link>
            <Link to={TABLE_ROUTE}>
                <div className="link">
                    О нас
                </div>
            </Link>
        </nav>
    );
};

export default Navbar;