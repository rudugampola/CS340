// Get the objects we need to modify

let updateGuideForm = document.getElementById('update-guide-form-ajax');

// Modify the objects we need
updateGuideForm.addEventListener('submit', function (e) {
  // Prevent the form from submitting
  e.preventDefault();

  // Get the data from the form
  let inputGuideID = document.getElementById('update-name');
  let inputGuideFName = document.getElementById('update-fname');
  let inputGuideLName = document.getElementById('update-lname');
  let inputGuideEmail = document.getElementById('update-email');
  let inputGuidePhone = document.getElementById('update-phone');
  let inputGuidePhoto = document.getElementById('update-photo');
  let inputGuideTitle = document.getElementById('update-title');

  let guideIDValue = inputGuideID.value;
  let guideFNameValue = inputGuideFName.value;
  let guideLNameValue = inputGuideLName.value;
  let guideEmailValue = inputGuideEmail.value;
  let guidePhoneValue = inputGuidePhone.value;
  let guidePhotoValue = inputGuidePhoto.value;
  let guideTitleValue = inputGuideTitle.value;

  // Put our data we want to send in a javascript object
  let data = {
    id: guideIDValue,
    fname: guideFNameValue,
    lname: guideLNameValue,
    email: guideEmailValue,
    phone: guidePhoneValue,
    photo: guidePhotoValue,
    title: guideTitleValue,
  };

  // Setup our AJAX request
  var xhttp = new XMLHttpRequest();
  xhttp.open('PUT', '/put-guide-ajax', true);
  xhttp.setRequestHeader('Content-type', 'application/json');

  // Tell our AJAX request how to resolve
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      // Add the new data to the table
      updateGuideRow(xhttp.response, inputGuideID);
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

function updateGuideRow(data, guideId) {
  let parsedData = JSON.parse(data);

  let table = document.getElementById('guides-table');

  for (let i = 0, row; (row = table.rows[i]); i++) {
    //iterate through rows
    //rows would be accessed using the "row" variable assigned in the for loop
    if (table.rows[i].getAttribute('data-value') == guideId) {
      // Get the location of the row where we found the matching person ID
      let updateRowIndex = table.getElementsByTagName('tr')[i];

      // Get td of homeworld value
      let td = updateRowIndex.getElementsByTagName('td')[3];

      // Reassign homeworld to our value we updated to
      td.innerHTML = parsedData[0].name;
    }
  }
}

function updateGuide(id) {
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
  document.getElementById('update-title').value = document
    .querySelector(`tr[data-value="${id}"]`)
    .querySelectorAll('td')[5]
    .innerHTML.trim();
  document.getElementById('update-photo').value = document
    .querySelector(`tr[data-value="${id}"]`)
    .querySelectorAll('td')[6]
    .innerHTML.trim();
  return;
}
