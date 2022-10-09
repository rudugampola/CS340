// Express
var express = require('express'); // We are using the express library for the web server
var app = express(); // We need to instantiate an express object to interact with the server in our code
PORT = 8000; // Set a port number at the top so it's easy to change in the future
var os = require('os'); // We are using the os library to get information about the server

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use Morgan for Logging
const morgan = require('morgan');

// SQL Database
var db = require('./db-connector');

const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars'); // Import express-handlebars
app.engine('.hbs', engine({ extname: '.hbs' })); // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs'); // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

app.use(express.static(__dirname + '/public')); // Tell express to serve static files from the public folder

// Development Logging
app.use(morgan('dev')); // Morgan will log requests

// HOMEPAGE
app.get('/', function (req, res) {
  res.render('index');
});

// CUSTOMERS
app.get('/customers', function (req, res) {
  // Search by query string lname
  let customers;
  if (req.query.lname === undefined) {
    customers = 'SELECT * FROM Customers;';
  } else {
    customers = `SELECT * FROM Customers WHERE lname LIKE '${req.query.lname}%';`;
  }

  // let customers = 'SELECT * FROM Customers;';
  db.pool.query(customers, function (error, rows, fields) {
    return res.render('customers', { data: rows });
  });
});

// CUSTOMER CREATE
app.post('/add-customer-form', function (req, res) {
  let data = req.body;

  // Create the query and run it on the database
  query1 = `INSERT INTO Customers (fname, lname, phone, email, photo) VALUES ('${data['input-fname']}', 
  '${data['input-lname']}', '${data['input-phone']}', '${data['input-email']}', '${data['input-photo']}')`;
  db.pool.query(query1, function (error, rows, fields) {
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

// CUSTOMER DELETE
app.delete('/delete-customer-ajax/', function (req, res, next) {
  let data = req.body;
  let customerID = parseInt(data.id);
  let deleteTrip_Logs = `DELETE FROM Trip_Logs WHERE customer_id = ?`;
  let deleteCustomers = `DELETE FROM Customers WHERE id = ?`;

  db.pool.query(deleteTrip_Logs, [customerID], function (error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
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

// CUSTOMER UPDATE
app.put('/put-customer-ajax', function (req, res, next) {
  let data = req.body;
  let customerID = parseInt(data.id);

  let updateCustomers = `UPDATE Customers SET fname = ?, lname = ?, phone = ?, email = ?, photo = ? WHERE id = ?`;

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
        res.send(rows);
      }
    }
  );
});

// TOURS
app.get('/tours', function (req, res) {
  let query1 = 'SELECT * FROM Tours;';
  db.pool.query(query1, function (error, rows, fields) {
    res.render('tours', { data: rows });
  });
});

// TOUR CREATE
app.post('/add-tour-form', function (req, res) {
  let data = req.body;
  let date = new Date(data['input-date']);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let dateStr = `${year}-${month}-${day}`;

  query1 = `INSERT INTO Tours (name, difficulty, price, description, cover_image, location, date) VALUES ('${data['input-tour-name']}', 
  '${data['input-difficulty']}', '${data['input-price']}' ,'${data['input-description']}', '${data['input-cover']}', '${data['input-location']}', '${dateStr}')`;
  db.pool.query(query1, function (error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      res.redirect('/tours');
    }
  });
});

// TOUR DELETE
app.delete('/delete-tour-ajax/', function (req, res, next) {
  let data = req.body;
  let tourID = parseInt(data.id);
  let deleteTrip_Logs = `DELETE FROM Trip_Logs WHERE id = ?`;
  let deleteTours = `DELETE FROM Tours WHERE id = ?`;

  db.pool.query(deleteTrip_Logs, [tourID], function (error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
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

// TOUR UPDATE
app.put('/put-tour-ajax', function (req, res, next) {
  let data = req.body;
  let tourID = parseInt(data.id);

  let updateTours = `UPDATE Tours SET name = ?, difficulty = ?, price = ?, description = ?, cover_image = ?, location = ?, date = ? WHERE id = ?`;
  db.pool.query(
    updateTours,
    [
      data['name'],
      data['difficulty'],
      data['price'],
      data['description'],
      data['cover_image'],
      data['location'],
      data['date'],
      tourID,
    ],
    function (error, rows, fields) {
      if (error) {
        console.log(error);
        res.sendStatus(400);
      } else {
        res.send(rows);
      }
    }
  );
});

// GUIDES
app.get('/guides', function (req, res) {
  let guides;
  if (req.query.lname === undefined) {
    guides = 'SELECT * FROM Guides;';
  } else {
    guides = `SELECT * FROM Guides WHERE lname LIKE '${req.query.lname}%';`;
  }

  db.pool.query(guides, function (error, rows, fields) {
    res.render('guides', { data: rows });
  });
});

// GUIDE CREATE
app.post('/add-guide-form', function (req, res) {
  let data = req.body;

  query1 = `INSERT INTO Guides (fname, lname, phone, email, title, photo) VALUES ('${data['input-guide-fname']}','${data['input-guide-lname']}', 
    '${data['input-guide-phone']}', '${data['input-guide-email']}' ,'${data['input-title']}', '${data['input-photo']}')`;
  db.pool.query(query1, function (error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      res.redirect('/guides');
    }
  });
});

// GUIDE DELETE
app.delete('/delete-guide-ajax/', function (req, res, next) {
  let data = req.body;
  let guideID = parseInt(data.id);
  let deleteTrip_Logs = `DELETE FROM Trip_Logs WHERE guide_id = ?`;
  let deleteGuides = `DELETE FROM Guides WHERE id = ?`;

  db.pool.query(deleteTrip_Logs, [guideID], function (error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
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

// GUIDE UPDATE
app.put('/put-guide-ajax', function (req, res, next) {
  let data = req.body;
  let guideID = parseInt(data.id);

  let updateGuides = `UPDATE Guides SET fname = ?, lname = ?, phone = ?, email = ?, title = ?, photo = ? WHERE id = ?`;

  db.pool.query(
    updateGuides,
    [
      data['fname'],
      data['lname'],
      data['phone'],
      data['email'],
      data['title'],
      data['photo'],
      guideID,
    ],
    function (error, rows, fields) {
      if (error) {
        console.log(error);
        res.sendStatus(400);
      } else {
        res.send(rows);
      }
    }
  );
});

// TRIP LOGS
app.get('/triplogs', function (req, res) {
  let customers = 'SELECT * FROM Customers;';
  let guides = 'SELECT * FROM Guides;';
  let tours = 'SELECT * FROM Tours;';
  let logs = 'SELECT * FROM Trip_Logs;';

  db.pool.query(logs, function (error, rows, fields) {
    let logs = rows;

    db.pool.query(customers, (error, rows, fields) => {
      let customers = rows;
      // Map customer id to customer name
      let customerMap = {};
      customers.map((customer) => {
        let id = parseInt(customer.id, 10);
        customerMap[id] = customer['fname'] + ' ' + customer['lname'];
      });

      // console.log(customerMap);

      db.pool.query(guides, (error, rows, fields) => {
        let guides = rows;
        // Map guide id to guide name
        let guideMap = new Map();
        guides.forEach((guide) => {
          guideMap.set(guide.id, guide.fname + ' ' + guide.lname);
        });
        // console.log(guideMap);

        db.pool.query(tours, (error, rows, fields) => {
          let tours = rows;
          // Map tour id to tour name
          let tourMap = new Map();
          tours.forEach((tour) => {
            tourMap.set(tour.id, tour.name);
          });
          // console.log(tourMap);

          logs = logs.map((customer) => {
            return Object.assign(customer, {
              customerName: customerMap[customer.customer_id],
              guideName: guideMap.get(customer.guide_id),
              tourName: tourMap.get(customer.tour_id),
            });
          });
          res.render('triplogs', {
            data: logs,
            results: { customers, guides, tours },
            // Send maps to client side
            maps: { customerMap, guideMap, tourMap },
          });
        });
      });
    });
  });
});

// TRIP LOG CREATE
app.post('/add-log-form', function (req, res) {
  let data = req.body;
  let customerID = parseInt(data['input-log-customer']);
  let guideID = parseInt(data['input-log-guide']);
  let tourID = parseInt(data['input-log-tour']);

  query1 = `INSERT INTO Trip_Logs (  customer_id, guide_id, tour_id) VALUES ('${customerID}','${guideID}', '${tourID}')`;
  db.pool.query(query1, function (error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      res.redirect('/triplogs');
    }
  });
});

// TRIP LOG DELETE
app.delete('/delete-trip-logs-ajax/', function (req, res, next) {
  let data = req.body;
  let logID = parseInt(data.id);
  let deleteTrip_Logs = `DELETE FROM Trip_Logs WHERE id = ?`;

  db.pool.query(deleteTrip_Logs, [logID], function (error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      res.sendStatus(204);
    }
  });
});

// REVIEWS
app.get('/reviews', function (req, res) {
  let customers = 'SELECT * FROM Customers;';
  let tours = 'SELECT * FROM Tours;';
  let reviews = 'SELECT * FROM Reviews;';

  db.pool.query(reviews, function (error, rows, fields) {
    let reviews = rows;

    db.pool.query(customers, (error, rows, fields) => {
      let customers = rows;

      let customerMap = {};
      customers.map((customer) => {
        let id = parseInt(customer.id, 10);
        customerMap[id] = customer['fname'] + ' ' + customer['lname'];
      });

      db.pool.query(tours, (error, rows, fields) => {
        let tours = rows;

        let tourMap = new Map();
        tours.forEach((tour) => {
          tourMap.set(tour.id, tour.name);
        });

        reviews = reviews.map((review) => {
          return Object.assign(review, {
            customerName: customerMap[review.customer_id],
            tourName: tourMap.get(review.tour_id),
          });
        });

        res.render('reviews', {
          data: reviews,
          results: { customers, tours },
        });
      });
    });
  });
});

// REVIEW CREATE
app.post('/add-review-form', function (req, res) {
  let data = req.body;
  let customerID = parseInt(data['input-review-customer']);
  let tourID = parseInt(data['input-review-tour']);
  let rating = parseInt(data['input-review-rating']);

  query1 = `INSERT INTO Reviews (  date, review, customer_id, tour_id, rating) VALUES ('${data['input-date']}', 
  '${data['input-review']}','${customerID}','${tourID}', '${rating}')`;
  db.pool.query(query1, function (error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      res.redirect('/reviews');
    }
  });
});

// REVIEW DELETE
app.delete('/delete-review-ajax/', function (req, res, next) {
  let data = req.body;
  let reviewID = parseInt(data.id);
  let deleteReviews = `DELETE FROM Reviews WHERE id = ?`;

  db.pool.query(deleteReviews, [reviewID], function (error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      res.sendStatus(204);
    }
  });
});

// LISTENER
app.listen(PORT, function () {
  var hostname = os.hostname();
  console.log(
    `Server running at http://${hostname}:${PORT}/. Press Ctrl-C to terminate...`
  );
});
