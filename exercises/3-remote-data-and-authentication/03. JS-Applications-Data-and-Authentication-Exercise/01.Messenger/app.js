function attachEvents() {
    const sendButton = document.getElementById('submit');
    const refreshButton = document.getElementById('refresh');
    
    let messageArea = document.getElementById('messages');

    refreshButton.addEventListener('click', () => {
        messageArea.textContent = '';

        let url = 'http://localhost:3030/jsonstore/messenger';

        fetch(url)
            .then(res => res.json())
            .then(messages => {
                Object.values(messages).forEach(message => {
                    messageArea.textContent += `${message.author}: ${message.content}\n`;
                })
            })
    })

    sendButton.addEventListener('click', () => {
        let authorElement = document.querySelector('[name="author"]');
        let messageElement = document.querySelector('[name="content"]');

        let url = 'http://localhost:3030/jsonstore/messenger';

        let content = {
            author: authorElement.value,
            content: messageElement.value,
        }

        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(content)
        })
            .then(res => res.json())
            .then(message => {
                console.log(message)
                messageArea.textContent += `${message.author}: ${message.content}\n`;
            })
    })
}


attachEvents();


