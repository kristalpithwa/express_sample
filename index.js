const express = require("express");
const database = require("./MOCK_DATA.json");
const fs = require("fs");

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.get("/api/user", (req, res) => {
  res.json(database);
});

app.post("/api/user", (req, res) => {
  console.log("req?.body =>", req?.body);

  const { first_name, last_name, email, gender, ip_address } = req?.body;

  const newUser = {
    id: database.length + 1,
    first_name: first_name,
    last_name: last_name,
    email: email,
    gender: gender,
    ip_address: ip_address,
  };

  database.push(newUser);

  // Write the updated database back to the JSON file
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(database), (err) => {
    if (err) {
      console.error("Error writing to file", err);
      res.status(500).json({ message: "Error creating user" });
    } else {
      res.json({
        message: "User created successfully",
        user: newUser,
      });
    }
  });
});

app
  .get("/api/user/:id", (req, res) => {
    const userId = JSON.parse(req?.params?.id);
    const user = database.find((item) => item.id === userId);
    res.json(user);
  })
  .patch("/api/user/:id", (req, res) => {
    const userId = JSON.parse(req.params.id);

    const userIndex = database.findIndex((item) => item.id === userId);

    if (userIndex !== -1) {
      // Merge old + new data
      database[userIndex] = {
        ...database[userIndex],
        ...req.body,
      };

      fs.writeFile(
        "./MOCK_DATA.json",
        JSON.stringify(database, null, 2),
        (err) => {
          if (err) {
            console.error("Error writing to file", err);
            return res.status(500).json({ message: "Error updating user" });
          }

          res.json({
            message: "User updated successfully",
            user: database[userIndex],
          });
        },
      );
    } else {
      res.status(404).json({ message: "User not found" });
    }
  })
  .delete("/api/user/:id", (req, res) => {
    const userId = JSON.parse(req?.params?.id);
    const userIndex = database.findIndex((item) => item.id === userId);

    if (userIndex !== -1) {
      database.splice(userIndex, 1);
      fs.writeFile("./MOCK_DATA.json", JSON.stringify(database), (err) => {
        if (err) {
          console.error("Error writing to file", err);
          res.status(500).json({ message: "Error deleting user" });
        } else {
          res.json({
            message: "User deleted successfully",
          });
        }
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
