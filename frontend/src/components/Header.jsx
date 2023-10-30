import React from "react";
import { Link } from "react-router-dom";
// import { Link, useNavigate } from "react-router-dom";
// import headerLogo from "./img/header-logo.png";
// import { setFindString } from "../store/actions/actionCreators";
// import { useSelector, useDispatch } from "react-redux";

export default function Header() {
  return <>
    <div>
      <nav>
        <div className="">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Главная
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/create">
                Создать
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link className="nav-link" to="/signin">
                Войти
              </Link>
            </li> */}
          </ul>
        </div>
      </nav>
    </div>

  </>
}
