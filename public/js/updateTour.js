let updateTourForm = document.getElementById('update-tour-form-ajax');

// Modify the objects we need
updateTourForm.addEventListener('submit', function (e) {
  // Prevent the form from submitting
  e.preventDefault();

  // Get the data from the form
  let inputTourID = document.getElementById('update-tourname');
  let inputTourName = document.getElementById('update-name');
  let inputTourDifficulty = document.getElementById('update-difficulty');
  let inputTourPRice = document.getElementById('update-price');
  let inputTourDescription = document.getElementById('update-description');
  let inputTourLocation = document.getElementById('update-location');
  let inputTourDate = document.getElementById('update-date');
  let inputTourCover = document.getElementById('update-cover');

  let inputTourIDValue = inputTourID.value;
  let inputTourNameValue = inputTourName.value;
  let inputTourDifficultyValue = inputTourDifficulty.value;
  let inputTourPriceValue = inputTourPRice.value;
  let inputTourDescriptionValue = inputTourDescription.value;
  let inputTourLocationValue = inputTourLocation.value;
  let inputTourDateValue = inputTourDate.value;
  let inputTourCoverValue = inputTourCover.value;

  // Put our data we want to send in a javascript object
  let data = {
    id: inputTourIDValue,
    name: inputTourNameValue,
    difficulty: inputTourDifficultyValue,
    price: inputTourPriceValue,
    description: inputTourDescriptionValue,
    location: inputTourLocationValue,
    date: inputTourDateValue,
    cover: inputTourCoverValue,
  };

  // Setup our AJAX request
  var xhttp = new XMLHttpRequest();
  xhttp.open('PUT', '/put-tour-ajax', true);
  xhttp.setRequestHeader('Content-type', 'application/json');

  // Tell our AJAX request how to resolve
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      // Add the new data to the table
      updateTourRow(xhttp.response, inputTourID);
    } else if (xhttp.readyState == 4 && xhttp.status != 200) {
      console.log('There was an error with the input.');
    }
  };
  // Force page refresh on Submit
  xhttp.onload = function () {
    location.reload();
  };

  // Send the request and wait for the response
  xhttp.send(JSON.stringify(data));
});

function updateTourRow(data, tourID) {
  let parsedData = JSON.parse(data);

  let table = document.getElementById('tours-table');

  for (let i = 0, row; (row = table.rows[i]); i++) {
    //iterate through rows
    //rows would be accessed using the "row" variable assigned in the for loop
    if (table.rows[i].getAttribute('data-value') == tourID) {
      // Get the location of the row where we found the matching person ID
      let updateRowIndex = table.getElementsByTagName('tr')[i];

      // Get td of homeworld value
      let td = updateRowIndex.getElementsByTagName('td')[3];

      // Reassign homeworld to our value we updated to
      td.innerHTML = parsedData[0].name;
    }
  }
}

function updateTours(id) {
  document.getElementById('update-tourname').value = document
    .querySelector(`tr[data-value="${id}"]`)
    .querySelectorAll('td')[0]
    .innerHTML.trim();
  document.getElementById('update-name').value = document
    .querySelector(`tr[data-value="${id}"]`)
    .querySelectorAll('td')[1]
    .innerHTML.trim();
  document.getElementById('update-difficulty').value = document
    .querySelector(`tr[data-value="${id}"]`)
    .querySelectorAll('td')[2]
    .innerHTML.trim();
  document.getElementById('update-price').value = document
    .querySelector(`tr[data-value="${id}"]`)
    .querySelectorAll('td')[3]
    .innerHTML.trim();
  document.getElementById('update-description').value = document
    .querySelector(`tr[data-value="${id}"]`)
    .querySelectorAll('td')[4]
    .innerHTML.trim();
  document.getElementById('update-location').value = document
    .querySelector(`tr[data-value="${id}"]`)
    .querySelectorAll('td')[5]
    .innerHTML.trim();
  document.getElementById('update-date').value = document
    .querySelector(`tr[data-value="${id}"]`)
    .querySelectorAll('td')[7]
    .innerHTML.trim();
  document.getElementById('update-cover').value = document
    .querySelector(`tr[data-value="${id}"]`)
    .querySelectorAll('td')[6]
    .innerHTML.trim();

  return;
}
