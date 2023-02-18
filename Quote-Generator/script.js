let apiQuotes=[];
quoteText=document.getElementById('quotetext');
nextQuoteBtn=document.getElementById('nextquote');
authorText=document.getElementById('author');
twitterBtn=document.getElementById('twitter');
loader=document.getElementById('loaderr');
quoteContainer=document.getElementById('quotetextid');


//Show loading
function loading(){
  loader.hidden=false;
  quoteContainer.hidden=true;
}

//Hide loading
function complete(){
  quoteContainer.hidden=false;
  loader.hidden=true;

}

function newQuotes(){
  loading();
    //Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
    //Check if author field is blank or filled
    if(!quote.author){
      authorText.textContent='Unknown';
    }else{
      authorText.textContent=quote.author;
    }
    if(quote.text.length>50){
      quoteText.classList.add('long-quote');
    }else{
      quoteText.classList.remove('long-quote');
    }
    //Set Quote,Hide Loader
    quoteText.textContent=quote.text;
    complete();
    
}

async function getQuote(){
  loading();
  const  quoteurl='https://type.fit/api/quotes';
    try{
        const response=await fetch(quoteurl);
        apiQuotes=await response.json();
        newQuotes();
        // console.log(apiQuotes);
    }catch(error){

    }
}

//Tweet Quote
function tweetQuote(){
  const twitterUrl=`https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, '_blank');
}

//Event Listeners
nextQuoteBtn.addEventListener('click',newQuotes);
twitterBtn.addEventListener('click',tweetQuote);
//on Load
getQuote();


