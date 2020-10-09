// fetch('https://api.spacexdata.com/v4/launches/past').then(d => d.json()).then(console.log)

const chat = document.querySelector('.chat');
const chatControls = chat.querySelector('.chat__controls');
const chatBody = chat.querySelector('.chat__body');

const bot = new ChatBot();

const createMessage = (text, isOther = false) => {
  if(!text) return; // ignore if no text

  let randomRed = Math.floor(Math.random() * 255);
  let randomGreen = Math.floor(Math.random() * 255);
  let randomBlue = Math.floor(Math.random() * 255);
  // create message element
  const newMessage = document.createElement('div');
  newMessage.classList.add('message');
  newMessage.innerText = text;
  newMessage.style.backgroundColor = "rgb(" + randomRed + ", " + randomGreen +", " + randomBlue +")";

  if(isOther) {
    newMessage.classList.add('message--other');
    newMessage.style.backgroundColor = "rgb(169, 255, 184)";
  }

  // add message to body
  chatBody.appendChild(newMessage);
}

chatControls.addEventListener('submit', (e) => {
  e.preventDefault();

  // save message text
  const message = chatControls.message.value;

  // delete input text
  chatControls.message.value = '';

  // create user message
  createMessage(message);

  // create bot answer
  bot.answer(message)
    .then((answer) => {
      setTimeout(() => {
        createMessage(answer, true);
      }, 100 + Math.random() * 100);
    });
});
