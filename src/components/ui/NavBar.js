import React, {Component} from 'react'
import { Link, NavLink } from 'react-router-dom'

export class NavBar extends Component {
   render() {
       return(
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
                
                <Link 
                    className="navbar-brand" 
                    to="/"
                >
                    Vehicle App
                </Link>

                <div className="navbar-collapse">
                    <div className="navbar-nav">

                        <NavLink 
                            className={({isActive}) => "nav-item nav-link " +(isActive && "active")} 
                            to="/home"
                        >
                            Home
                        </NavLink>

                        <NavLink 
                            className={({isActive}) => "nav-item nav-link " +(isActive && "active")} 
                            to="/modellist"
                        >
                            Vehicle Model
                        </NavLink>
                        <NavLink 
                            className={({isActive}) => "nav-item nav-link " +(isActive && "active")} 
                            to="/vehiclelist"
                        >
                            Vehicle
                        </NavLink>
                    </div>
                </div>
        </nav>
       )
   }
}