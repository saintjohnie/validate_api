const express = require("express");
const bodyParser = require("body-parser");
const Cors = require("cors");
const verifyRequired=require('./src/utils/verifyRequired')

const app = express();
const port = process.env.PORT || 4000;
//applying middleware
app.use(bodyParser.json());
app.use(Cors());
app.get("/", (req, res) => {
  const data = {
    message: "My Rule-Validation API",
    status: "success",
    data: {
      name: "Nwagbo John",
      github: "@github.com/saintjohnie",
      email: "nwagbojohn@gmail.com",
      mobile: "08130915333",
      twitter: "@nwagbojohn",
    },
  };
  res.send(data);
});
app.post("/validate-rule", (req, res) => {
  const rule = req.body.rule;
  const data = req.body.data;
  //verify rule
  const notFound  = verifyRequired(rule);
  
 

  
  //err response
const errRes={
  message: `field ${rule.field} failed validation.`,
  status: "error",
  data: {
    validation: {
      error: true,
      field: rule.field,
      field_value: data[rule.field],
      condition: rule.condition,
      condition_value: rule.condition_value
    }
  }
}
try{
  if (!rule || !data) {
    res.status(400).send({
      message: "Invalid JSON payload passed.",
      status: "error",
      data: null,
    });
  } else if (typeof rule !== "object") {
    res.status(400).send({
      message: "rule should be  object.",
      status: "error",
      data: null,
    });
  }
  else if (notFound) {
     res.status(400).send({
      message: `${notFound} is required.`,
      status: "error",
      data: null,
    });
  }
  else if (!data[rule.field]) {
    const message=`field ${rule.field} is missing from data.`
     res.status(400).send({
      message,
      status: "error",
      data: null,
    });
  }
  else if (!data[rule.field]> rule.condition_value & rule.condition === "gt") {
  res.status(400).send(errRes)
   }
  else if (data[rule.field]!==rule.condition_value&&rule.condition==="eq") {
    res.status(400).send(errRes)
  }
  else if (data[rule.field] === rule.condition_value && rule.condition === "neq") {
    res.status(400).send(errRes)
  }
  else if (data[rule.field] < rule.condition_value&&rule.condition==="gte") {
    res.status(400).send(errRes)
  }
  else if (data[rule.field.includes(rule.condition_value && rule.condition === "contains")]) {
    res.status(400).send(errRes)
  }



  res.send(
    {
      message: `field ${rule.field} successfully validated.`,
    status:"success",
      data: {
    validation: {
      error: false,
      field: rule.field,
      field_value:data[rule.field],
      condition: rule.condition,
      condition_value: rule.condition_value 
    }
  }
}
)

} catch (e) {
  
  }
  
  
});
app.listen(port, () => {
  console.log("@4000");
});
