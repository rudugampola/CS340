// Get the objects we need to modify

let updateCustomerForm = document.getElementById('update-customer-form-ajax');

// Modify the objects we need
updateCustomerForm.addEventListener('submit', function (e) {
  // Prevent the form from submitting
  e.preventDefault();

  // Get the data from the form
  let inputCustomerID = document.getElementById('update-name');
  let inputCustomerFName = document.getElementById('update-fname');
  let inputCustomerLName = document.getElementById('update-lname');
  let inputCustomerEmail = document.getElementById('update-email');
  let inputCustomerPhone = document.getElementById('update-phone');
  let inputCustomerPhoto = document.getElementById('update-photo');

  let customerIDValue = inputCustomerID.value;
  let customerFNameValue = inputCustomerFName.value;
  let customerLNameValue = inputCustomerLName.value;
  let customerEmailValue = inputCustomerEmail.value;
  let customerPhoneValue = inputCustomerPhone.value;
  let customerPhotoValue = inputCustomerPhoto.value;

  //   console.log(customerIDValue);
  //   console.log(customerFNameValue);
  //   console.log(customerLNameValue);
  //   console.log(customerEmailValue);
  //   console.log(customerPhoneValue);
  //   console.log(customerPhotoValue);

  // Put our data we want to send in a javascript object
  let data = {
    id: customerIDValue,
    fname: customerFNameValue,
    lname: customerLNameValue,
    email: customerEmailValue,
    phone: customerPhoneValue,
    photo: customerPhotoValue,
  };

  // Setup our AJAX request
  var xhttp = new XMLHttpRequest();
  xhttp.open('PUT', '/put-customer-ajax', true);
  xhttp.setRequestHeader('Content-type', 'application/json');

  // Tell our AJAX request how to resolve
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      // Add the new data to the table
      updateRow(xhttp.response, inputCustomerID);
    } else if (xhttp.readyState == 4 && xhttp.status != 200) {
      console.log('There was an error with the input.');
    }
  };

  // Send the request and wait for the response
  xhttp.send(JSON.stringify(data));
});

function updateRow(data, personID) {
  let parsedData = JSON.parse(data);

  let table = document.getElementById('customers-table');

  for (let i = 0, row; (row = table.rows[i]); i++) {
    //iterate through rows
    //rows would be accessed using the "row" variable assigned in the for loop
    if (table.rows[i].getAttribute('data-value') == personID) {
      // Get the location of the row where we found the matching person ID
      let updateRowIndex = table.getElementsByTagName('tr')[i];

      // Get td of homeworld value
      let td = updateRowIndex.getElementsByTagName('td')[3];

      // Reassign homeworld to our value we updated to
      td.innerHTML = parsedData[0].name;
    }
  }
}

function updateCustomer(id) {
  document.getElementById('update-fname').value = document
    .querySelector(`tr[data-value="${id}"]`)
    .querySelectorAll('td')[1]
    .innerHTML.trim();
  document.getElementById('update-lname').value = document
    .querySelector(`tr[data-value="${id}"]`)
    .querySelectorAll('td')[2]
    .innerHTML.trim();
  document.getElementById('update-phone').value = document
    .querySelector(`tr[data-value="${id}"]`)
    .querySelectorAll('td')[3]
    .innerHTML.trim();
  document.getElementById('update-email').value = document
    .querySelector(`tr[data-value="${id}"]`)
    .querySelectorAll('td')[4]
    .innerHTML.trim();
  document.getElementById('update-photo').value = document
    .querySelector(`tr[data-value="${id}"]`)
    .querySelectorAll('td')[5]
    .innerHTML.trim();
  return;
}
