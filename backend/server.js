const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("CRM Backend Running");
});
app.post("/leads", (req, res) => {

  const { name, email, source } = req.body;

  const sql =
    "INSERT INTO leads(name,email,source,status) VALUES(?,?,?)";

  db.query(sql,
    [name, email, source,"New"],
    (err, result) => {

      if (err) {
        return res.status(500).json({
          message: "Error creating lead"
        });
      }

      res.status(201).json({
        message: "Lead created successfully"
      });

    });

});
app.get("/leads", (req,res)=>{

    const sql = "SELECT * FROM leads";

    db.query(sql,(err,result)=>{

        if(err){

            return res.status(500).json({
                message:"Error fetching leads"
            });

        }

        res.json(result);

    });

});
app.put("/leads/:id", (req, res) => {

  const { id } = req.params;
  const { status } = req.body;

  const sql =
    "UPDATE leads SET status = ? WHERE id = ?";

  db.query(sql,
    [status, id],
    (err, result) => {

      if (err) {
        return res.status(500).json({
          message: "Error updating status"
        });
      }

      res.json({
        message: "Status updated successfully"
      });

    });

});
app.put("/leads/:id/notes", (req, res) => {

  const { id } = req.params;
  const { notes } = req.body;

  const sql =
    "UPDATE leads SET notes = ? WHERE id = ?";

  db.query(sql,
    [notes, id],
    (err, result) => {

      if (err) {
        return res.status(500).json({
          message: "Error updating notes"
        });
      }

      res.json({
        message: "Notes updated successfully"
      });

    });

});
app.delete("/leads/:id", (req, res) => {

  const { id } = req.params;

  db.query(
    "DELETE FROM leads WHERE id = ?",
    [id],
    (err) => {

      if (err) {
        return res.status(500).json({
          message: "Error deleting lead"
        });
      }

      res.json({
        message: "Lead deleted successfully"
      });

    }
  );

});



app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});