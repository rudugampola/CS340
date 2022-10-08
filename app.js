/*
    SETUP
*/
// Express
var express = require('express'); // We are using the express library for the web server
var app = express(); // We need to instantiate an express object to interact with the server in our code
PORT = 8000; // Set a port number at the top so it's easy to change in the future

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use Morgan for Loggin
const morgan = require('morgan');

// SQL Database
var db = require('./db-connector');

const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars'); // Import express-handlebars
app.engine('.hbs', engine({ extname: '.hbs' })); // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs'); // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

app.use(express.static(__dirname + '/public')); // Tell express to serve static files from the public folder

// Development Logging
app.use(morgan('dev')); // morgan will log requests

/*
    ROUTES
*/
// app.js

app.get('/', function (req, res) {
  res.render('index'); // Render the index.hbs file, and also send the renderer
}); // will process this file, before sending the finished HTML to the client.

app.get('/customers', function (req, res) {
  let customers = 'SELECT * FROM Customers;'; // Define our query

  db.pool.query(customers, function (error, rows, fields) {
    // Execute the query

    res.render('customers', { data: rows }); // Render the index.hbs file, and also send the renderer
  }); // Note the call to render() and not send(). Using render() ensures the templating engine
}); // will process this file, before sending the finished HTML to the client.

// app.js

app.post('/add-customer-form', function (req, res) {
  // Capture the incoming data and parse it back to a JS object
  let data = req.body;

  // Create the query and run it on the database
  query1 = `INSERT INTO Customers (fname, lname, phone, email, photo) VALUES ('${data['input-fname']}', '${data['input-lname']}', '${data['input-phone']}', '${data['input-email']}', '${data['input-photo']}')`;
  db.pool.query(query1, function (error, rows, fields) {
    // Check to see if there was an error
    if (error) {
      // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
      console.log(error);
      res.sendStatus(400);
    }

    // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
    // presents it on the screen
    else {
      res.redirect('/customers');
    }
  });
});

app.delete('/delete-customer-ajax/', function (req, res, next) {
  let data = req.body;
  let customerID = parseInt(data.id);
  let deleteTrip_Logs = `DELETE FROM Trip_Logs WHERE customer_id = ?`;
  //   let deleteReviews = `DELETE FROM Reviews WHERE review_id = ?`;
  let deleteCustomers = `DELETE FROM Customers WHERE id = ?`;

  // Run the 1st query
  db.pool.query(deleteTrip_Logs, [customerID], function (error, rows, fields) {
    if (error) {
      // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
      console.log(error);
      res.sendStatus(400);
    } else {
      // Run the second query
      db.pool.query(
        deleteCustomers,
        [customerID],
        function (error, rows, fields) {
          if (error) {
            console.log(error);
            res.sendStatus(400);
          } else {
            res.sendStatus(204);
          }
        }
      );
    }
  });
});

app.put('/put-customer-ajax', function (req, res, next) {
  let data = req.body;
  let customerID = parseInt(data.id);
  // console.log(customerID);

  let updateCustomers = `UPDATE Customers SET fname = ?, lname = ?, phone = ?, email = ?, photo = ? WHERE id = ?`;

  // Run query and update the database then refresh the page
  db.pool.query(
    updateCustomers,
    [
      data['fname'],
      data['lname'],
      data['phone'],
      data['email'],
      data['photo'],
      customerID,
    ],
    function (error, rows, fields) {
      if (error) {
        console.log(error);
        res.sendStatus(400);
      } else {
        // set status and refresh the page
        console.log('Updated');
        res.redirect(204, '/customers');
      }
    }
  );
});

app.get('/customers/:id', function (req, res) {
  let customerID = req.params.id;
  let customers = `SELECT * FROM Customers WHERE id = ${customerID};`;
  let trip_logs = `SELECT * FROM Trip_Logs WHERE customer_id = ${customerID};`;

  db.pool.query(customers, function (error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      let customer = rows[0];
      db.pool.query(trip_logs, function (error, rows, fields) {
        if (error) {
          console.log(error);
          res.sendStatus(400);
        } else {
          res.render('customer', { customer: customer, trip_logs: rows });
        }
      });
    }
  });
});

app.get('/tours', function (req, res) {
  let query1 = 'SELECT * FROM Tours;'; // Define our query

  db.pool.query(query1, function (error, rows, fields) {
    // Execute the query

    res.render('tours', { data: rows }); // Render the index.hbs file, and also send the renderer
  }); // Note the call to render() and not send(). Using render() ensures the templating engine
}); // will process this file, before sending the finished HTML to the client.

app.post('/add-tour-form', function (req, res) {
  // Capture the incoming data and parse it back to a JS object
  let data = req.body;

  //   let price = truncate(data['input-price'], 2);
  //   if (isNaN(price)) {
  //     price = 'NULL';
  //   }

  // Create the query and run it on the database
  query1 = `INSERT INTO Tours (name, difficulty, price, description, cover_image, location, date) VALUES ('${data['input-tour-name']}', 
  '${data['input-difficulty']}', ${data['input-price']} ,'${data['input-description']}', '${data['input-cover']}', '${data['input-location']}', '${data['input-date']}')`;
  db.pool.query(query1, function (error, rows, fields) {
    // Check to see if there was an error
    if (error) {
      // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
      console.log(error);
      res.sendStatus(400);
    }

    // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
    // presents it on the screen
    else {
      res.redirect('/tours');
    }
  });
});

app.delete('/delete-tour-ajax/', function (req, res, next) {
  let data = req.body;
  let tourID = parseInt(data.id);
  let deleteTrip_Logs = `DELETE FROM Trip_Logs WHERE id = ?`;
  let deleteTours = `DELETE FROM Tours WHERE id = ?`;

  // Run the 1st query
  db.pool.query(deleteTrip_Logs, [tourID], function (error, rows, fields) {
    if (error) {
      // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
      console.log(error);
      res.sendStatus(400);
    } else {
      // Run the second query
      db.pool.query(deleteTours, [tourID], function (error, rows, fields) {
        if (error) {
          console.log(error);
          res.sendStatus(400);
        } else {
          res.sendStatus(204);
        }
      });
    }
  });
});

app.get('/guides', function (req, res) {
  let query1 = 'SELECT * FROM Guides;'; // Define our query

  db.pool.query(query1, function (error, rows, fields) {
    // Execute the query

    res.render('guides', { data: rows }); // Render the index.hbs file, and also send the renderer
  }); // Note the call to render() and not send(). Using render() ensures the templating engine
}); // will process this file, before sending the finished HTML to the client.

app.post('/add-guide-form', function (req, res) {
  // Capture the incoming data and parse it back to a JS object
  let data = req.body;

  // Create the query and run it on the database
  query1 = `INSERT INTO Guides (fname, lname, phone, email, title, photo) VALUES ('${data['input-guide-fname']}','${data['input-guide-lname']}', 
    '${data['input-guide-phone']}', '${data['input-guide-email']}' ,'${data['input-title']}', '${data['input-photo']}')`;
  db.pool.query(query1, function (error, rows, fields) {
    // Check to see if there was an error
    if (error) {
      // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
      console.log(error);
      res.sendStatus(400);
    }

    // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
    // presents it on the screen
    else {
      res.redirect('/guides');
    }
  });
});

app.delete('/delete-guide-ajax/', function (req, res, next) {
  let data = req.body;
  let guideID = parseInt(data.id);
  let deleteTrip_Logs = `DELETE FROM Trip_Logs WHERE guide_id = ?`;
  let deleteGuides = `DELETE FROM Guides WHERE id = ?`;

  // Run the 1st query
  db.pool.query(deleteTrip_Logs, [guideID], function (error, rows, fields) {
    if (error) {
      // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
      console.log(error);
      res.sendStatus(400);
    } else {
      // Run the second query
      db.pool.query(deleteGuides, [guideID], function (error, rows, fields) {
        if (error) {
          console.log(error);
          res.sendStatus(400);
        } else {
          res.sendStatus(204);
        }
      });
    }
  });
});

app.get('/triplogs', function (req, res) {
  let customers = 'SELECT * FROM Customers;'; // Define our query
  let guides = 'SELECT * FROM Guides;';
  let tours = 'SELECT * FROM Tours;';
  let logs = 'SELECT * FROM Trip_Logs;'; // Define our query

  db.pool.query(logs, function (error, rows, fields) {
    // Execute the query
    let logs = rows;

    db.pool.query(customers, (error, rows, fields) => {
      // Execute the query
      let customers = rows;

      db.pool.query(guides, (error, rows, fields) => {
        // Save the planets
        let guides = rows;

        db.pool.query(tours, (error, rows, fields) => {
          // Save the planets
          let tours = rows;

          res.render('triplogs', {
            data: logs,
            results: { customers, guides, tours },
          }); // Render the index.hbs file, and also send the renderer
        });
      });
      // Render the index.hbs file, and also send the renderer
    }); // Note the call to render() and not send(). Using render() ensures the templating engine
  }); // will process this file, before sending the finished HTML to the client.
});

app.post('/add-log-form', function (req, res) {
  // Capture the incoming data and parse it back to a JS object
  let data = req.body;
  let customerID = parseInt(data['input-log-customer']);
  let guideID = parseInt(data['input-log-guide']);
  let tourID = parseInt(data['input-log-tour']);

  console.log(data);

  // Create the query and run it on the database
  query1 = `INSERT INTO Trip_Logs (  customer_id, guide_id, tour_id) VALUES ('${customerID}','${guideID}', '${tourID}')`;
  db.pool.query(query1, function (error, rows, fields) {
    // Check to see if there was an error
    if (error) {
      // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
      console.log(error);
      res.sendStatus(400);
    }

    // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
    // presents it on the screen
    else {
      res.redirect('/triplogs');
    }
  });
});

app.delete('/delete-trip-logs-ajax/', function (req, res, next) {
  let data = req.body;
  let logID = parseInt(data.id);
  let deleteTrip_Logs = `DELETE FROM Trip_Logs WHERE id = ?`;

  // Run the 1st query
  db.pool.query(deleteTrip_Logs, [logID], function (error, rows, fields) {
    if (error) {
      // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
      console.log(error);
      res.sendStatus(400);
    } else {
      res.sendStatus(204);
    }
  });
});

app.get('/reviews', function (req, res) {
  let customers = 'SELECT * FROM Customers;'; // Define our query
  let tours = 'SELECT * FROM Tours;';
  let reviews = 'SELECT * FROM Reviews;'; // Define our query

  db.pool.query(reviews, function (error, rows, fields) {
    // Execute the query
    let reviews = rows;

    db.pool.query(customers, (error, rows, fields) => {
      // Execute the query
      let customers = rows;

      db.pool.query(tours, (error, rows, fields) => {
        // Save the planets
        let tours = rows;

        res.render('reviews', {
          data: reviews,
          results: { customers, tours },
        }); // Render the index.hbs file, and also send the renderer
      });
      // Render the index.hbs file, and also send the renderer
    }); // Note the call to render() and not send(). Using render() ensures the templating engine
  }); // will process this file, before sending the finished HTML to the client.
});

app.post('/add-review-form', function (req, res) {
  // Capture the incoming data and parse it back to a JS object
  let data = req.body;
  let customerID = parseInt(data['input-review-customer']);
  let tourID = parseInt(data['input-review-tour']);
  let rating = parseInt(data['input-review-rating']);

  console.log(data);

  // Create the query and run it on the database
  query1 = `INSERT INTO Reviews (  date, review, customer_id, tour_id, rating) VALUES ('${data['input-date']}', '${data['input-review']}','${customerID}','${tourID}', '${rating}')`;
  db.pool.query(query1, function (error, rows, fields) {
    // Check to see if there was an error
    if (error) {
      // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
      console.log(error);
      res.sendStatus(400);
    }

    // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
    // presents it on the screen
    else {
      res.redirect('/reviews');
    }
  });
});

app.delete('/delete-review-ajax/', function (req, res, next) {
  let data = req.body;
  let reviewID = parseInt(data.id);
  let deleteReviews = `DELETE FROM Reviews WHERE id = ?`;

  // Run the 1st query
  db.pool.query(deleteReviews, [reviewID], function (error, rows, fields) {
    if (error) {
      // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
      console.log(error);
      res.sendStatus(400);
    } else {
      res.sendStatus(204);
    }
  });
});

/*
    LISTENER
*/
app.listen(PORT, function () {
  // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
  console.log(
    'Express started on http://localhost:' +
      PORT +
      '; press Ctrl-C to terminate.'
  );
});
