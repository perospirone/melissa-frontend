import React, { Component } from "react";
import { InputGroup, FormControl } from "react-bootstrap";
import axios from "axios";

import "./styles.css";

import api from "./../services/api"
import send from "../../images/send-icon.png";
import melissa from "../../images/melissa-icon.png";
import close from "../../images/close-icon.png";
import chat from "../../images/chat-icon.png";

export default class ChatPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      style: {
        display: "none",
      },
      messageList: [],
      optionsList: [],
    };
    this.handlePopoutClick = this.handlePopoutClick.bind(this);
  }

  componentDidMount() {
    this.welcomeMessage();
  }

  welcomeMessage() {
    const messageList = document.getElementById("message-list");
    const welcomeMessage = `<div id="server-message">
    Oi Mega Hack 3.0! Bem vindo(a) ao Mercado Livre. Meu nome é Melissa, e tô aqui pra te ajudar. Em que posso ser útil?
    </div>`;
    this.state.messageList.push(welcomeMessage);
    messageList.innerHTML = this.state.messageList[0];
  }

  handlePopoutClick() {
    const icon = document.getElementById("chat-icon");
    if (this.state.style.display === "none") {
      this.setState({
        style: {
          display: "block",
        },
      });
      icon.src = close;
    } else {
      this.setState({
        style: {
          display: "none",
        },
      });
      icon.src = chat;
    }
  }

  /* NEED FIX */
  handleMessage = () => {
    const input = document.getElementById("message-input");
    const messages = document.getElementById("message-list");

    var message = input.value;
    if (message === "null" || message === "") {
      return;
    } else {
      var userMessage = `<div id="user-message">${message}</div>`;
      this.state.messageList.concat(userMessage);
      messages.appendChild(userMessage);
      input.value = "";
    }
    console.log(userMessage);
  };

  renderChat = () => {
    return (
      <div className="chat">
        <div className="button-container" onClick={this.handlePopoutClick}>
          <img id="chat-icon" src={chat} alt="Chat icon" />
        </div>
        <div className="container" style={this.state.style}>
          <header id="chat-header">
            <div className="header-info">
              <img src={melissa} alt="Melissa icon" />
              <span>Melissa</span>
            </div>
          </header>
          <div id="message-list"></div>
          <footer>
            <InputGroup className="message-box">
              <FormControl
                id="message-input"
                placeholder="Digite algo..."
                aria-label="Message"
              />
              <img src={send} alt="Send button" onClick={this.handleMessage} />
            </InputGroup>
          </footer>
        </div>
      </div>
    );
  };

  render() {
    return <>{this.renderChat()}</>;
  }
}
