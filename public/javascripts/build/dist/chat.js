'use strict';

var ChatBox = React.createClass({
	displayName: 'ChatBox',

	submitComment: function submitComment(comment, callback) {
		this.socket.emit('new message', comment, function (err) {
			if (err) return console.error('New comment error:', err);
			callback();
		});
	},
	getInitialState: function getInitialState() {
		return {
			coments: null
		};
	},
	componentDidMount: function componentDidMount() {
		var that = this;
		this.socket = io();
		this.socket.on('chat message', function (comments) {
			console.log("entro");
			that.setState({ coments: comments });
			console.log(that.state.coments);
		});
	},
	render: function render() {
		return React.createElement(
			'div',
			{ className: 'card-panel hoverable' },
			React.createElement(
				'h4',
				null,
				'Mensages'
			),
			React.createElement(CommentList, { mensajes: this.state.coments }),
			React.createElement(FormComment, { submitComment: this.submitComment })
		);
	}
});

var CommentList = React.createClass({
	displayName: 'CommentList',

	render: function render() {

		var comentarios = React.createElement(
			'div',
			null,
			'Cargando Comentarios'
		);
		if (this.props.mensajes) {
			comentarios = this.props.mensajes.map(function (msj) {
				return React.createElement(
					'div',
					{ className: 'cajaComentarios' },
					React.createElement(
						'ul',
						{ className: 'collection' },
						React.createElement(
							'li',
							{ className: 'collection-item avatar' },
							React.createElement(
								'span',
								{ 'class': 'title' },
								msj.author
							),
							React.createElement(
								'p',
								null,
								React.createElement(
									'small',
									null,
									msj.time
								),
								React.createElement(
									'span',
									null,
									' : '
								),
								msj.message
							)
						)
					)
				);
			});
		}
		return React.createElement(
			'div',
			{ className: 'listaComentarios' },
			comentarios
		);
	}
});

var FormComment = React.createClass({
	displayName: 'FormComment',

	handleSubmit: function handleSubmit(e) {
		e.preventDefault();
		var that = this;
		var author = 'mismo';
		var text = that.refs.text.getDOMNode().value;
		var comment = text;
		this.props.submitComment(comment, function (err) {
			that.refs.text.getDOMNode().value = '';
		});
	},
	render: function render() {
		return React.createElement(
			'form',
			{ className: 'commentForm', onSubmit: this.handleSubmit },
			React.createElement(
				'div',
				{ className: 'row' },
				React.createElement(
					'div',
					{ className: 'col-xs-8' },
					React.createElement('textarea', { name: 'text', ref: 'text', placeholder: 'Mensaje', required: true })
				),
				React.createElement(
					'div',
					{ className: 'col-xs-4' },
					React.createElement(
						'button',
						{ type: 'submit', ref: 'submitButton' },
						'Enviar'
					)
				)
			)
		);
	}
});

ReactDOM.render(React.createElement(ChatBox, null), document.getElementById('example'));