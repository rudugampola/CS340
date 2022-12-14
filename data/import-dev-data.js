const fs = require('fs');
var db = require('../db-connector.js');

const customers = JSON.parse(
  fs.readFileSync(`${__dirname}/customers.json`, 'utf-8')
);
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));
const guides = JSON.parse(fs.readFileSync(`${__dirname}/guides.json`, 'utf-8'));
const triplogs = JSON.parse(
  fs.readFileSync(`${__dirname}/triplogs.json`, 'utf-8')
);
const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8')
);

// Import JSON data into database
const importData = async () => {
  customers.forEach((customer) => {
    try {
      db.pool.query('INSERT INTO Customers SET ?', customer, (err, result) => {
        if (err) throw err;
      });
    } catch (err) {
      console.error(err);
    }
  });

  tours.forEach((tour) => {
    try {
      db.pool.query('INSERT INTO Tours SET ?', tour, (err, result) => {
        if (err) throw err;
      });
    } catch (err) {
      console.error(err);
    }
  });

  guides.forEach((guide) => {
    try {
      db.pool.query('INSERT INTO Guides SET ?', guide, (err, result) => {
        if (err) throw err;
      });
    } catch (err) {
      console.error(err);
    }
  });

  reviews.forEach((review) => {
    try {
      db.pool.query('INSERT INTO Reviews SET ?', review, (err, result) => {
        if (err) throw err;
      });
    } catch (err) {
      console.error(err);
    }
  });

  triplogs.forEach((triplog) => {
    try {
      db.pool.query('INSERT INTO TripLogs SET ?', triplog, (err, result) => {
        if (err) throw err;
      });
    } catch (err) {
      console.error(err);
    }
  });

  console.log('Data successfully imported');
  // process.exit();
};

// Delete all data from database
const deleteData = async () => {
  try {
    db.pool.query('DELETE FROM Customers', (err, result) => {
      if (err) throw err;
    });
    db.pool.query('DELETE FROM Tours', (err, result) => {
      if (err) throw err;
    });
    db.pool.query('DELETE FROM Guides', (err, result) => {
      if (err) throw err;
    });
    console.log('Data successfully deleted');
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === '--import') {
  // Import data async function call
  importData();
} else if (process.argv[2] === '--delete') {
  // Delete data async function call
  deleteData();
} else if (process.argv[2] === '--all') {
  deleteData();
  importData();
  // Terminate process. Otherwise, the process will not terminate
  // process.exit();
}

// Run this file from the command line with the following command:
// node import-dev-data.js --import
// node import-dev-data.js --delete

// console.log(process.argv);
