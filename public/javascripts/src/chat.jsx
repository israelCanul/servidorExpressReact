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
			<div>
				<div className='row'>
					<div className='col s12 m10 offset-m1'>
						<h4>Mensajes</h4>
						<CommentList mensajes={this.state.coments}/>
						<FormComment submitComment={this.submitComment}/>
					</div>
				</div>
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
						<li>
							<div>
								<label>{msj.author}</label>
								<span><small>{" "+msj.time+" : "}</small>{msj.message}</span>
						    </div>
						</li>
					);
			});	
		}
		return(
			<ul  className='mensajes'>
				{comentarios}
			</ul>
			);

	}
});

var FormComment=React.createClass({
	handleSubmit:function(e){
		e.preventDefault();
		var that=this;
		var author='mismo';
		var text= that.refs.text.getDOMNode().value;
		var color=that.refs.confColor.getDOMNode().value;
		var author= that.refs.author.getDOMNode().value;
		var comment=text;
		var mensaje={
			author:author,
			mensaje:comment,
			conf:{
				color:color
			},
		};
		this.props.submitComment(mensaje, function (err) {
			that.refs.text.getDOMNode().value='';
		}); 
	},
	render:function(){
		return(
		<form className="commentForm" onSubmit={this.handleSubmit}>
			<div className='row'>
				<div className='col s12'>
					<div className='col s6'>
						<input className='author' type='texto' name="author" ref="author" placeholder="Nombre" required />
					</div>
					<div className='col s3' >
						<input name='color' ref='confColor' type="color" onChange={this.handleChange} /> 
					</div>
				</div>
				<div className='col s8'>
					<input type='text' name="text" ref="text" placeholder="Mensaje" required />
				</div>
				<div className='col s4'>
					<button className='waves-effect waves-light btn' type="submit" ref="submitButton">Enviar</button>
				</div>
			</div>
		</form>
		);
	}
});

var Color=React.createClass({
	getInitialState: function() {
	    return {value: 'setColor'};
	},
	handleChange: function(event) {
	    this.setState({value: event.target.value});
	},
	render:function(){
	   var value = this.state.value;
	   return <input name='color' refs='confColor' type="color" value={value} onChange={this.handleChange} />;
	}
});



ReactDOM.render(
	<ChatBox />,
	document.getElementById('example')
);