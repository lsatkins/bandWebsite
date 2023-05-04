let form = document.querySelector('form')

form.addEventListener('submit', async (e) => {

    //prevent the default for the form submission
    e.preventDefault()

    //make a fetch call with a payload
    // name, title, message
    let newMessage = {
        name: document.querySelector('#feedback-form-name').value,
        title: document.querySelector('#feedback-form-title').value,
        message: document.querySelector('#feedback-form-message').value
    }

    // reconfigure fetch to accept a post and a payload

    let results = await fetch('/api', {
        method: 'POST',
        headers: {'Content-type': 'application/json; charset=UTF-8'},
        body: JSON.stringify(newMessage)
    })

    let messages = await results.json();

    console.log(messages);

    //display our messages on the screen

    updateFeedback(messages);
})

const updateFeedback = (messagesArr) => {

    let htmlBlock = "";

    messagesArr.forEach((item, index) => {
        
        htmlBlock += '     <div class="feedbackItem">';
        htmlBlock += '       <div class="feedbackItemContents">';
        htmlBlock += '       <div class="leftSide"><button class="xButton" id="' + index + '">&times;</button></div>';
        htmlBlock += '         <div class="feedbackBody">';
        htmlBlock += '           <div class="feedbackHead">';
        htmlBlock += '             <div class="feedbackTitle">' + item.title + ' <div class="feedbackNameLabel">' + item.name + '</div></div>';
        htmlBlock += '           </div>';
        htmlBlock += '           <div class="feedbackMessage">' + item.message + '</div>';
        htmlBlock += '         </div>'; 
        htmlBlock += '       </div>';
        htmlBlock += '     </div>';
    })

    //atach to the dom element

    let feedbackMessages = document.querySelector('.feedback-messages');

    feedbackMessages.innerHTML = htmlBlock;

}

const displayMessages = async () => {
    
    try{
    let result = await fetch('/api')

    let messages = await result.json()

    updateFeedback(messages)
    }
    catch{
        
    }
}

let deleteObj = async (i) => {

    try {

        let indexObj = {
            index: i
        }
        let results = await fetch(`/api/${i}`, {
            method: 'DELETE',
            headers: {'Content-type': 'application/json; charset=UTF-8'},
            body: JSON.stringify(indexObj)
        })
    
        let messages = await results.json();
        console.log(messages);
        displayMessages();
        
    } catch (error) {
        
    }
}

let feedbackMessages = document.querySelector('.feedback-messages');
console.log(feedbackMessages);

feedbackMessages.addEventListener('click', (e) => {
    let buttonClicked = e.target;
    let clickIndex = buttonClicked.getAttribute('id');
    deleteObj(clickIndex);

})

displayMessages()