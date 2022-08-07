var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

function getvals(){
    return fetch('http://localhost:8100/user/login',
     {
      method: 'POST',
      body: JSON.stringify({
        email: 'test@test.com',
        secret: 'test'
      }), 
      headers: myHeaders
      //mode: 'no-cors'
    })
    .then((response) => response.json())
    .then((responseData) => {
      return responseData;
    })
    .catch(error => console.warn(error));
}
  
function login() {
  window.location.href = './home.html';
}

function createEvent() {
  window.location.href = './event_create.html';
}