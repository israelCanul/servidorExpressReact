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
			null,
			React.createElement(
				'div',
				{ className: 'row' },
				React.createElement(
					'div',
					{ className: 'col s12 m10 offset-m1' },
					React.createElement(
						'h4',
						null,
						'Mensajes'
					),
					React.createElement(CommentList, { mensajes: this.state.coments }),
					React.createElement(FormComment, { submitComment: this.submitComment })
				)
			)
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
					'li',
					null,
					React.createElement(
						'div',
						null,
						React.createElement(
							'label',
							null,
							msj.author
						),
						React.createElement(
							'span',
							null,
							React.createElement(
								'small',
								null,
								" " + msj.time + " : "
							),
							msj.message
						)
					)
				);
			});
		}
		return React.createElement(
			'ul',
			{ className: 'mensajes' },
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
		var color = that.refs.confColor.getDOMNode().value;
		var author = that.refs.author.getDOMNode().value;
		var comment = text;
		var mensaje = {
			author: author,
			mensaje: comment,
			conf: {
				color: color
			}
		};
		this.props.submitComment(mensaje, function (err) {
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
					{ className: 'col s12' },
					React.createElement(
						'div',
						{ className: 'col s6' },
						React.createElement('input', { className: 'author', type: 'texto', name: 'author', ref: 'author', placeholder: 'Nombre', required: true })
					),
					React.createElement(
						'div',
						{ className: 'col s3' },
						React.createElement('input', { name: 'color', ref: 'confColor', type: 'color', onChange: this.handleChange })
					)
				),
				React.createElement(
					'div',
					{ className: 'col s8' },
					React.createElement('input', { type: 'text', name: 'text', ref: 'text', placeholder: 'Mensaje', required: true })
				),
				React.createElement(
					'div',
					{ className: 'col s4' },
					React.createElement(
						'button',
						{ className: 'waves-effect waves-light btn', type: 'submit', ref: 'submitButton' },
						'Enviar'
					)
				)
			)
		);
	}
});

var Color = React.createClass({
	displayName: 'Color',

	getInitialState: function getInitialState() {
		return { value: 'setColor' };
	},
	handleChange: function handleChange(event) {
		this.setState({ value: event.target.value });
	},
	render: function render() {
		var value = this.state.value;
		return React.createElement('input', { name: 'color', refs: 'confColor', type: 'color', value: value, onChange: this.handleChange });
	}
});

ReactDOM.render(React.createElement(ChatBox, null), document.getElementById('example'));