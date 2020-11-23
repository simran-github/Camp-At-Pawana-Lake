// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyD_hgXBq7bicX92jwuQTuZaZZOTouSTN2E",
    authDomain: "camping-contact-form-entries.firebaseapp.com",
    databaseURL: "https://camping-contact-form-entries.firebaseio.com",
    projectId: "camping-contact-form-entries",
    storageBucket: "camping-contact-form-entries.appspot.com",
    messagingSenderId: "1061327326725",
    appId: "1:1061327326725:web:ee284bba283ffbcbdd566c"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

//Reference messages collections

var messagesref = firebase.database().ref('messages');

//Listen for form submit

document.getElementById('contactForm').addEventListener('submit',submitForm);

//Submit Form
function submitForm(e){
  e.preventDefault();

  //Get values

  var name = getInputVal('name');
  var email = getInputVal('email');
  var phoneno = getInputVal('phoneno');
  var payment = getInputVal('payment');
  var numberofadults = getInputVal('numberofadults');
  var numberofchildren = getInputVal('numberofchildren');
  var indate = getInputVal('indate');
  var outdate = getInputVal('outdate');
  var message = getInputVal('message');
  var total = Number(numberofadults)+Number(numberofchildren);


 //Save Message
  saveMessage(name,email,phoneno,payment,numberofadults,numberofchildren,indate,outdate,message);

//Show Alert

document.querySelector('.alert').style.display = 'block' ;

//Show user entries
document.querySelector('.yourOutput').style.display = 'block' ;

document.getElementById('displayname').innerHTML="Name: "+name;
document.getElementById('displayemail').innerHTML="Email: "+email;
document.getElementById('displayphoneno').innerHTML="Phone no: "+phoneno;
document.getElementById('displaypayment').innerHTML="Payment Method: "+payment;
document.getElementById('displaynumberofadults').innerHTML="Number of adults: "+numberofadults;
document.getElementById('displaynumberofchildren').innerHTML="Number of children: "+numberofchildren;
document.getElementById('displayindate').innerHTML="Check-in Date: "+indate;
document.getElementById('displayoutdate').innerHTML="Check-out Date: "+outdate;
document.getElementById('displaymessage').innerHTML="Message: "+message;

if(total<10){
  document.getElementById('advance').innerHTML="Amount to be paid in advance: Rs."+Number(Number(total)*500);
  document.getElementById('amount').innerHTML="Total amount: Rs."+Number(Number(numberofadults)*1500+Number(numberofchildren)*750)+"/-";
}
else{

  document.getElementById('discount').innerHTML="Yay! You get a dicount of 10%off/per head as you have 10 or more than 10 people in your group.Enjoy Camping!"
  document.getElementById('advance').innerHTML="Amount to be paid in advance: Rs."+Number(Number(total)*500)+"/-";
  document.getElementById('amount').innerHTML="Total amount: Rs."+Number(Number(numberofadults)*1350+Number(numberofchildren)*675)+"/-";
}


//Hide alert after 3 seconds

setTimeout(function(){
 document.querySelector('.alert').style.display = 'none' ;
},3000);

//Reset Form
document.getElementById('contactForm').reset();
}

//Function to get form values

function getInputVal(id){
  return document.getElementById(id).value;
}

//Save message to firebasejs

function saveMessage(name,email,phoneno,payment,numberofadults,numberofchildren,indate,outdate,message){
  var newMessageRef = messagesref.push();

  newMessageRef.set({
    Name:name,
    Email:email,
    Phoneno:phoneno,
    numberofadults: numberofadults,
    numberofchildren:numberofchildren,
    indate:indate,
    outdate:outdate,
    payment:payment,
    message:message
  });
}

var people =0;
people = numberofadults+numberofchildren;
console.log(numberofadults+numberofchildren);
