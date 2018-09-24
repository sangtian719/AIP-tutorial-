import React, { Component } from "react";
import io from "socket.io-client";

class App extends Component {
    constructor() {
        super();
        this.state = {
            room: 'room 1',
            endpoint: "http://127.0.0.1:5000",
            message: '',
            rMsg: [],
            color: 'white'
        };

          this.socket = io(this.state.endpoint);
         // initiate socket

        this.socket.on('chat message', msg =>
        {
            // receive message from server side and set it to the state
            console.log(msg);
            // add new message in the rMsg array
            this.setState({rMsg:[...this.state.rMsg,msg]})
        });

        this.socket.on('change color', (col) => {
            document.body.style.backgroundColor = col
        });
    }



    // sending sockets
    send = () => {
        // post data to server socket event 'change color'
        this.socket.emit('change color', this.state.color)
    };

    ///

    // adding the function
    setColor = (color) => {
        this.setState({ color })
    };


    onChangeHandler= (e)=>
    {
        this.setState({message : e.target.value});
    };


    onSubmitMessage= (e)=>
    {
        e.preventDefault();
        // post data to server socket event 'chat message'
        this.socket.emit('chat message', this.state.message);

    };




    render() {
        // testing for socket connections
        const messageBoxStyle =
            {
                height: 300,
            };



        return (
            <div style={{ textAlign: "center" }}>
                <button onClick={() => this.send() }>Change Color</button>

                <button id="blue" onClick={() => this.setColor('blue')}>Blue</button>
                <button id="red" onClick={() => this.setColor('red')}>Red</button>
                <button id="white" onClick={() => this.setColor('white')}>White</button>



                <form action="">
                    <div className="container">
                        <div className="card mx-auto w-50 m-2">
                            <div className="card-header">
                                {this.state.room}
                            </div>

                            <div className="card-body"
                                 id="messageBox"
                                 style={messageBoxStyle}>
                                <ul>{this.state.rMsg.map((message)=>
                                {
                                    return <li>{message}</li>
                                })}</ul>
                            </div>

                        </div>
                    </div>
                </form>

                <form onSubmit={this.onSubmitMessage}>

                    <div className="input-group  mx-auto mb-3 w-50">

                        <input type="text"
                               className="form-control"
                               id="inputMessage"
                               placeholder="Please enter message"
                               value={this.state.message}
                               onChange={this.onChangeHandler}/>

                        <div className="input-group-prepend">

                            <button className="btn btn-outline-secondary"
                                    type="submit">
                                Send
                            </button>
                        </div>

                    </div>
                </form>
            </div>
        )
    }
}
export default App;