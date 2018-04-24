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

export class SnackBox extends Component {
	constructor() {
		super();

    	this.state = {snacks : [], result: "", showModal: false};
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
			url: "http://localhost:8181/snack",
			datatype: 'json',
			success: function(response){
				this.setState({snacks:response});
			}.bind(this)
		});
	}

	sendForm(event) {
		const data = new FormData(event.target);
		const snacks = data.getAll('snack');
		const quantities = data.getAll('quantity');

		event.preventDefault();
		$.ajax({
			url: "http://localhost:8181/snack/order/value?snacks=" + snacks + "&quantities=" + quantities,
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
					            <th>Lanche</th>
					            <th>Ingredientes</th>
					            <th>Quantidade</th>
					        </tr>
					    </thead>

					    <tbody>
		                {
		                	this.state.snacks.map(function(snack){
			                  	return (
			                    	<tr>
			                        	<td>{snack.name}</td>
			                        	<input type="hidden" name="snack" value={snack.name} />
			                        	<td>
			                        	{snack.ingredients.map(function(ingredient){
			                        		return (
			                        			ingredient.name + " - "
			                        		);
			                        	})}
			                        	</td>
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
			          <form >
			          	<button class="button-success pure-button button-buy">Finalizar Compra</button>
			          </form>
			          <button class="button-error pure-button button-buy" onClick={this.handleCloseModal}>Fechar</button>
        		</Modal>
			</div>
		);
	}
}

export default SnackBox;