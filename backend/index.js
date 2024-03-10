import express from "express";
import sqlite3 from "sqlite3";
import cors from "cors";
import fetch from 'node-fetch'; // Import node-fetch

const app = express();
app.use(cors());
app.use(express.json());

// Set up SQLite database
const db = new sqlite3.Database("./Evsforall.sqlite");

db.run(`
    CREATE TABLE IF NOT EXISTS light_duty_automobiles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        manufacturer_name TEXT,
        model TEXT,
        model_year INTEGER,
        photo_url TEXT,
        electric_range INTEGER,
        fuel_name TEXT,
        drivetrain TEXT,
        seating_capacity INTEGER
    )
`);

const fetchAndStoreAutomobiles = async () => {
  try {
      // IMPORTANT!!!! replace key = "" in the URL with your signed up API key
      const response = await fetch('https://developer.nrel.gov/api/vehicles/v1/light_duty_automobiles.json?api_key=5TsXfcxZpGRkQCkPjzgxICGsbWZ4jqvH2ge3i9d6', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json'
          }
      });
      const data = await response.json();

      //data is an array of car objects, each car object has many attributes, we only need the below attributes
      // manufacturer_name, model, model_year, photo_url, electric_range, fuel_name, drivetrain, seating_capacity

      // Insert each automobile into the database
      for (let i = 0; i < data.result.length; i++) {
        let auto = data.result[i];
        
        db.run(`INSERT INTO light_duty_automobiles (manufacturer_name, model, model_year, photo_url, electric_range, fuel_name, drivetrain, seating_capacity) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, 
        [auto.manufacturer_name, auto.model, auto.model_year, auto.photo_url, auto.electric_range, auto.fuel_name, auto.drivetrain, auto.seating_capacity]);
      }

  } catch (error) {
      console.error('Error:', error);
  }
};

fetchAndStoreAutomobiles();

// Route to get all light-duty automobiles
// LIMIT 30 clause limits the number of cars fetched, for testing purposes, limiting to 30 for now
app.get("/light-duty-automobiles", (req, res) => {
  db.all("SELECT * FROM light_duty_automobiles LIMIT 30", [], (err, rows) => {
      if (err) {
          res.status(500).send("Error retrieving data from the database");
          console.error(err.message);
      } else {
          res.status(200).json(rows);
      }
  });
});


// // JWT Secret Key
// const JWT_SECRET = 'test'; // Replace with your actual secret key

// // Signup route
// app.post("/signup", async (req, res) => {
//   const { username, password } = req.body;
  
//   if (!username || !password) {
//     return res.status(400).send("Username and password are required");
//   }

//   // Check if the username already exists
//   const checkIfExist = "SELECT * FROM userinfo WHERE username = ?";
//   db.get(checkIfExist, [username], async (err, row) => {
//     if (err) {
//       return res.status(500).send("Error checking username");
//     }

//     if (row) {
//       return res.status(409).send("Username already exists");
//     }

//     // Hash the password
//     try {
//       const hashedPassword = await bcrypt.hash(password, 10);

//       // Insert new user into the database
//       const insert = "INSERT INTO userinfo (username, password) VALUES (?, ?)";
//       db.run(insert, [username, hashedPassword], (insertErr) => {
//         if (insertErr) {
//           return res.status(500).send("Error creating new user");
//         }
//         res.status(201).send("User created successfully");
//       });
//     } catch (hashError) {
//       res.status(500).send("Error hashing password");
//     }
//   });
// });

// // Login route with JWT
// app.post("/login", (req, res) => {
//   const checkIfExist = "SELECT * FROM userinfo WHERE username = ?";
//   db.get(checkIfExist, [req.body.username], (err, data) => {
//     if (err) {
//       console.error("SQLite error:", err);
//       return res.status(500).send("An error occurred while checking the username.");
//     }

//     if (data) {
//       const storedPassword = data.password;
//       bcrypt.compare(req.body.password, storedPassword, (bcryptErr, result) => {
//         if (result) {
//           const token = jwt.sign({ username: req.body.username }, JWT_SECRET, {
//             expiresIn: '24h'
//           });
//           res.json({ token: token });
//         } else {
//           res.status(401).send("Invalid credentials");
//         }
//       });
//     } else {
//       res.status(404).send("Username not found");
//     }
//   });
// });

// // Middleware to authenticate JWT
// const authenticateToken = (req, res, next) => {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];

//   if (!token) {
//     return res.status(401).send("Access Denied");
//   }

//   jwt.verify(token, JWT_SECRET, (err, user) => {
//     if (err) {
//       return res.status(403).send("Invalid Token");
//     }
//     req.user = user;
//     next();
//   });
// };

// // Star a vehicle route
// app.post("/star-vehicle", authenticateToken, (req, res) => {
//   const { vehicle_id } = req.body;
//   const username = req.user.username;
//   const { price } = req.body;
//   const insert = "INSERT INTO starred_vehicles (username, vehicle_id,price) VALUES (?, ?, ?)";
//   console.log("Price " + price);
//   db.run(insert, [username, vehicle_id, price], (err) => {
//     if (err) {
//       return res.status(500).send("Error starring the vehicle");
//     }
//     res.status(200).send("Vehicle starred successfully");
//   });
// });

// // Unstar a vehicle route
// app.post("/is-starred", authenticateToken, (req, res) => {
//   const { vehicle_id } = req.body;
//   const username = req.user.username;
//     const query = "SELECT COUNT(*) AS cnt FROM starred_vehicles WHERE username = '" + username + "' AND vehicle_id = '" + vehicle_id + "'" ;
// //    console.log(query)
//     db.get(query, (err, row) => {  
// //      console.log('vehicle_id : ' + vehicle_id + ' count : ' + row.cnt  + ' err : ' + err)
//     if (err) {
//       return res.status(500).send("Error getting the status");
//     }else {
//       // If count is greater than 0, the record exists
//       if (row.cnt > 0) {
//           res.send(true);
//       } else {
//           res.send(false);
//       }
//   }
//   });
// });

// // Unstar a vehicle route
// app.delete("/unstar-vehicle", authenticateToken, (req, res) => {
//   const { vehicle_id } = req.body;
//   const username = req.user.username;
//   const del = "DELETE FROM starred_vehicles WHERE username = ? AND vehicle_id = ?";
//   db.run(del, [username, vehicle_id], (err) => {
//     if (err) {
//       return res.status(500).send("Error unstarring the vehicle");
//     }
//     res.status(200).send("Vehicle unstarred successfully");
//   });
// }); // This was missing

// // Get all starred vehicles for a user
// app.get("/user-stars", authenticateToken, (req, res) => {
//   const username = req.user.username;

//   const query = `
//     SELECT vi.*
//     FROM starred_vehicles sv
//     JOIN light_duty_automobiles vi ON sv.vehicle_id = vi.id
//     WHERE sv.username = ?`;

//   db.all(query, [username], (err, rows) => {
//     if (err) {
//       return res.status(500).send("Error fetching starred vehicles");
//     }
//     res.status(200).json(rows);
//   });
// });

const port = 8800;
app.listen(port, () => {
  console.log(`Connected to backend`);
});
