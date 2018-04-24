import React, { Component } from 'react';
import './css/pure-min.css';
import './css/style.css';
import $ from 'jquery';
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

export class CustomBox extends Component {
	constructor() {
		super();
    	this.state = {ingredients : [], result: "", showModal: false};
    	this.sendForm = this.sendForm.bind(this);
    	this.handleOpenModal = this.handleOpenModal.bind(this);
	    this.handleCloseModal = this.handleCloseModal.bind(this);
	}

	handleOpenModal () {
		this.setState({ showModal: true });
	}

	handleCloseModal () {
		this.setState({ showModal: false });
	}

	componentWillMount() {
		$.ajax({
			url: "http://localhost:8181/ingredient",
			datatype: 'json',
			success: function(response){
				this.setState({ingredients:response});
			}.bind(this)
		});
	}

	sendForm(event) {
		const data = new FormData(event.target);
		const ingredients = data.getAll('ingredient');
		const quantities = data.getAll('quantity');

		event.preventDefault();
		$.ajax({
			url: "http://localhost:8181/snack/custom/value?ingredients=" + ingredients + "&quantities=" + quantities,
			datatype: 'json',
			success: function(response) {
				this.setState({result:response});
				this.handleOpenModal();
			}.bind(this)
		});
	}

	render() {
		return (
			<div class="main">
				<form className="pure-form pure-form-aligned" onSubmit={this.sendForm}>
					<table class="center pure-table">
					    <thead>
					        <tr>
					            <th>Ingrediente</th>
					            <th>Quantidade</th>
					        </tr>
					    </thead>

					    <tbody>
		                {
		                	this.state.ingredients.map(function(ingredient){
			                  	return (
			                    	<tr>
			                        	<td>{ingredient.name}</td>
			                        	<input type="hidden" name="ingredient" value={ingredient.name} />
			                        	<td><input type="number" name="quantity" min="0" max="99"/></td>
			                      	</tr>
			                    );
		                	})
		                }
					    </tbody>
					</table>
					<button class="pure-button pure-button-primary button-buy">Comprar</button>
				</form>
				<Modal 
		           isOpen={this.state.showModal}
		           style={customStyles}>
		              <h2>Obrigado por realizar o pedido</h2>
			          <div>O resultado do seu pedido foi: </div>
			          <div> R$ {this.state.result} </div>
			          <form>
			          	<button class="button-success pure-button button-buy">Finalizar Compra</button>
			          </form>
			          <button class="button-error pure-button button-buy" onClick={this.handleCloseModal}>Fechar</button>
        		</Modal>
			</div>
		);
	}
}

export default CustomBox;