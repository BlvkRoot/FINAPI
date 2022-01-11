const express = require("express");
const { v4: uuidv4 } = require("uuid");

const app = express();
const port = 3333;

app.use(express.json());

const customers = [];
/***
 * cpf - string
 * name - string
 * uuid - uuid
 * statement []
 */
app.post("/account", (request, response) => {
  const { cpf, name } = request.body;

  const customerAlreadyExists = customers.some(
    (customer) => customer.cpf === cpf
  );

  if(customerAlreadyExists)
    return response.status(400).json({ error: 'Customer already exists!'});

  customers.push({
    cpf,
    name,
    id: uuidv4(),
    statement: [],
  });

  return response.status(201).send();
});

app.listen(port, () => console.log(`Server running 🚀 🚀!`));
