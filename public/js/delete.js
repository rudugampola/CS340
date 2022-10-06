function deleteCustomer(customerID) {
  // Put our data we want to send in a javascript object
  let data = {
    id: customerID,
  };

  // Setup our AJAX request
  var xhttp = new XMLHttpRequest();
  xhttp.open('DELETE', '/delete-customer-ajax', true);
  xhttp.setRequestHeader('Content-type', 'application/json');

  // Tell our AJAX request how to resolve
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 204) {
      // Add the new data to the table
      deleteCustomerRow(customerID);
    } else if (xhttp.readyState == 4 && xhttp.status != 204) {
      console.log('There was an error with the input.');
    }
  };
  // Send the request and wait for the response
  xhttp.send(JSON.stringify(data));

  // Reload the page
  location.reload();
}

function deleteCustomerRow(customerID) {
  let table = document.getElementById('customers-table');
  for (let i = 0, row; (row = table.rows[i]); i++) {
    //iterate through rows
    //rows would be accessed using the "row" variable assigned in the for loop
    if (table.rows[i].getAttribute('data-value') == customerID) {
      table.deleteRow(i);
      break;
    }
  }
}

function deleteGuide(guideID) {
  // Put our data we want to send in a javascript object
  let data = {
    id: guideID,
  };

  // Setup our AJAX request
  var xhttp = new XMLHttpRequest();
  xhttp.open('DELETE', '/delete-guide-ajax', true);
  xhttp.setRequestHeader('Content-type', 'application/json');

  // Tell our AJAX request how to resolve
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 204) {
      // Add the new data to the table
      deleteGuideRow(guideID);
    } else if (xhttp.readyState == 4 && xhttp.status != 204) {
      console.log('There was an error with the input.');
    }
  };

  // Send the request and wait for the response
  xhttp.send(JSON.stringify(data));

  // Reload the page
  location.reload();
}

function deleteGuideRow(guideID) {
  let table = document.getElementById('guides-table');
  for (let i = 0, row; (row = table.rows[i]); i++) {
    //iterate through rows
    //rows would be accessed using the "row" variable assigned in the for loop
    if (table.rows[i].getAttribute('data-value') == guideID) {
      table.deleteRow(i);
      break;
    }
  }
}

function deleteTour(tourID) {
  // Put our data we want to send in a javascript object
  let data = {
    id: tourID,
  };

  // Setup our AJAX request
  var xhttp = new XMLHttpRequest();
  xhttp.open('DELETE', '/delete-tour-ajax', true);
  xhttp.setRequestHeader('Content-type', 'application/json');

  // Tell our AJAX request how to resolve
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 204) {
      // Add the new data to the table
      deleteTourRow(tourID);
    } else if (xhttp.readyState == 4 && xhttp.status != 204) {
      console.log('There was an error with the input.');
    }
  };

  // Send the request and wait for the response
  xhttp.send(JSON.stringify(data));

  // Reload the page
  location.reload();
}

function deleteTourRow(tourID) {
  let table = document.getElementById('tours-table');
  for (let i = 0, row; (row = table.rows[i]); i++) {
    //iterate through rows
    //rows would be accessed using the "row" variable assigned in the for loop
    if (table.rows[i].getAttribute('data-value') == tourID) {
      table.deleteRow(i);
      break;
    }
  }
}
