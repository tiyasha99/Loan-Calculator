//Listen for submit
document.getElementById('loan-form').addEventListener('submit',function(e){
  //Hide results
  document.getElementById('results').style.display = 'none';
  //Show loader
  document.getElementById('loading').style.display = 'block';
  setTimeout(calculateResults, 2000);
  e.preventDefault();
});


//Calculate Results

function calculateResults(e){
  console.log('calcu');

  //UI vars
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthly_payment = document.getElementById('monthly-payment');
  const total_payment = document.getElementById('total-payment');
  const total_interest = document.getElementById('total-interest');

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  const x = Math.pow(1+calculatedInterest, calculatedPayments);
  const monthly = (principal*x*calculatedInterest)/(x-1);

  if(isFinite(monthly)){
    monthly_payment.value = monthly.toFixed(2);
    total_payment.value = (monthly *calculatedPayments).toFixed(2);
    total_interest.value=((monthly*calculatedPayments)-principal).toFixed(2);
    //show results
    document.getElementById('results').style.display = 'block';
    document.getElementById('loading').style.display = 'none';
  } else{
    showError('Please check your numbers')
    document.getElementById('results').style.display = 'none';
    document.getElementById('loading').style.display = 'none';
  }

 
}
//show error
function showError(error){
  //create a div
  const errorDiv = document.createElement('div');

  //Get element

  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');
  //ADD class
  errorDiv.className = 'alert alert-danger';

  //create text node and apeend to div

  errorDiv.appendChild(document.createTextNode(error));

  //insert error before heading

  card.insertBefore(errorDiv, heading);

  //Clear error after 3 seconds
  setTimeout(clearError, 3000);
}

function clearError(){
  document.querySelector('.alert').remove();
}