import React, { Component } from "react";
import { InputGroup, FormControl } from "react-bootstrap";

import "./styles.css";

import api from "../../services/api";
import send from "../../images/send-icon.png";
import melissa from "../../images/melissa-updated-icon.png";
import close from "../../images/close-icon.png";
import chat from "../../images/chat-icon.png";

export default class ChatPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      style: {
        display: "block",
      },
      messageList: [],
    };
    this.handlePopoutClick = this.handlePopoutClick.bind(this);
  }

  componentDidMount() {
    this.welcomeMessage();
  }

  welcomeMessage = async () => {
    const messages = document.getElementById("message-list");
    const welcomeMessage = `<div class="server-message">
    Oi Mega Hack 3.0! Bem vindo(a) ao Mercado Livre. Meu nome é Melissa, e tô aqui pra te ajudar. Em que posso ser útil?
    </div>`;
    this.state.messageList.push(welcomeMessage);
    messages.innerHTML = this.state.messageList[0];
  };

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

  handleMessage = async () => {
    const input = document.getElementById("message-input");
    const messages = document.getElementById("message-list");

    var message = input.value;
    if (message === "null" || message === "") {
      return;
    } else {
      const response = await api.post("/api/client", {
        message,
      });

      const addedMessage = document.createElement("div");
      const serverMessage = document.createElement("div");

      var userMessage = `<div class="user-message">${message}</div>`;
      var melissaMessage = `<div class="server-message">${response.data.answer}</div>`;

      addedMessage.innerHTML = userMessage;
      serverMessage.innerHTML = melissaMessage;

      this.state.messageList.concat(userMessage);
      this.state.messageList.concat(melissaMessage);

      messages.appendChild(addedMessage);
      messages.appendChild(serverMessage);

      if (response.data.map) {
        const map = document.createElement("img");
        map.src = response.data.map;
        messages.appendChild(map);
      }

      if (response.data.answer2) {
        const evaluation = document.createElement("div");
        var evaluationMessage = `<div class="server-message">${response.data.answer2}</div>`;
        evaluation.innerHTML = evaluationMessage;
        messages.appendChild(evaluation);
      }

      input.value = "";
    }
  };

  renderChat = () => {
    return (
      <div className="chat">
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
        <div className="button-container" onClick={this.handlePopoutClick}>
          <img id="chat-icon" src={close} alt="Chat icon" />
        </div>
      </div>
    );
  };

  render() {
    return <>{this.renderChat()}</>;
  }
}
