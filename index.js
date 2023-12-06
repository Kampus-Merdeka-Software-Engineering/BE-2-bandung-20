const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client')

const app = express();
const port = process.env.PORT || 3000;
const prisma = new PrismaClient()

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


async function createList(req, res) {
    const { name, email, phone, people, time, date } = req.body;
    try {
      const createdList = await prisma.list.create({
        data: {
            name, email, phone, people, time, date
        },
      });
      const data = req.body;
      res.status(201).send({
        success: true,
        message: "sukses dalam menambahkan data",
        data: createdList
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
}

async function getList(req, res) {
    try {
      const list = await prisma.list.findMany();
      //const  data = JSON.parse(list)
      res.status(200).send(list);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'internal server error',
      });
    }
}

app.get('/', (req, res) => {
    res.send('Server Work!!!');
});

app.post("/list",  createList)
app.get("/list", getList);

app.listen(port, () => {
	console.log(`Example app listening on http://localhost:${port}`);
});


