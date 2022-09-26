class MessageHandler {
  constructor(div) {
    this.messagesDiv = div;
    this.timeOut = 5000;
    this.idPrefix = 'msg-';
  }

  showMessage(message = '', classType = 'error') {
    const timeOutId = setTimeout(() => {
      clearTimeout(timeOutId);
      document.querySelector(`#${this.idPrefix}${timeOutId}`).remove();
    }, this.timeOut);
    const nodeText = `<div id="${this.idPrefix}${timeOutId}" class="${classType}" >${message}</div>`;
    this.messagesDiv.innerHTML += nodeText; // message needs to be appended
  }
}

export default MessageHandler;
