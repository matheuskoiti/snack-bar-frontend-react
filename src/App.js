import React, { Component } from 'react';
import './css/pure-min.css';
import './css/side-menu.css';
import SnackBox from './Snack.js'
import CustomBox from './Custom.js'
import { Switch, Route } from 'react-router-dom'

class App extends Component {
  render() {
    return (
		<div id="layout">
		    <a href="#menu" id="menuLink" class="menu-link">
		        <span></span>
		    </a>

		    <div id="menu">
		        <div class="pure-menu">
		            <a class="pure-menu-heading" href="#">MENU</a>

		            <ul class="pure-menu-list">
		            	<li class="pure-menu-item"><a href="/" class="pure-menu-link">Home</a></li>
		                <li class="pure-menu-item"><a href="/order" class="pure-menu-link">Comprar lanche</a></li>
		                <li class="pure-menu-item"><a href="/custom" class="pure-menu-link">Montar lanche</a></li>
		            </ul>
		        </div>
		    </div>

		    <div id="main">
		        <div class="header">
		            <h1>SnackBar</h1>
		            <h2>Compre o seu lanche aqui!</h2>
		        </div>

		        <Switch>
					<Route path='/order' component={SnackBox}/>
					<Route path='/custom' component={CustomBox}/>
				</Switch>
		    </div>
		</div>
    );
  }
}

export default App;
