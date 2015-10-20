var ChatBox = React.createClass({
	submitComment: function (comment, callback) {
		this.socket.emit('new message', comment, function (err) {
			if (err)
				return console.error('New comment error:', err);
			callback();
		});
	},
	getInitialState:function(){
	 	return {
        	coments: null,
            };
	},
	componentDidMount:function(){
		var that = this;
		this.socket = io();
		this.socket.on('chat message', function (comments) {
			console.log("entro");
			that.setState({ coments: comments });
			console.log(that.state.coments);
		});
	},	
	render:function(){
		return(
			<div className='card-panel hoverable'>
				<h4>Mensages</h4>
				<CommentList mensajes={this.state.coments}/>
				<FormComment submitComment={this.submitComment}/>
			</div>
			);
	}
});

var CommentList= React.createClass({
	render:function(){
		
		var comentarios=(<div>Cargando Comentarios</div>);
		if(this.props.mensajes){
			comentarios=this.props.mensajes.map(function(msj){
				return(
					<div className='cajaComentarios'>
					<ul className='collection'>
						<li className="collection-item avatar">
							<span class="title">{msj.author}</span>
							<p><small>{msj.time}</small>
							<span> : </span>
							  {msj.message}
						    </p>
						</li>
					</ul>
					</div>
					);
			});	
		}
		return(
			<div className='listaComentarios'>
			{comentarios}
			</div>
			);

	}
});

var FormComment=React.createClass({
	handleSubmit:function(e){
		e.preventDefault();
		var that=this;
		var author='mismo';
		var text= that.refs.text.getDOMNode().value;
		var comment=text;
		this.props.submitComment(comment, function (err) {
			that.refs.text.getDOMNode().value='';
		}); 
	},
	render:function(){
		return(
		<form className="commentForm" onSubmit={this.handleSubmit}>
			<div className='row'>
				<div className='col-xs-8'>
					<textarea name="text" ref="text" placeholder="Mensaje" required></textarea>
				</div>
				<div className='col-xs-4'>
					<button type="submit" ref="submitButton">Enviar</button>
				</div>
			</div>
		</form>
		);
	}
});



ReactDOM.render(
	<ChatBox />,
	document.getElementById('example')
);