
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

app.get('/', (req, res) => {
    res.send('Hello World');
});

let buku = [];

app.get('/buku', (req, res) => {
    res.json(buku);
});

app.get('/buku/:id', (req, res) => {
    console.log(buku);
    const detailbuku = buku.find(b => b.id === parseInt(req.params.id));
    res.json(detailbuku);
});

app.post('/buku', (req, res) => {
    const bukubaru = {
        id: buku.length + 1,
        judul: req.body.judul,
        penulis: req.body.penulis
    };
    buku.push(bukubaru);
    res.json(bukubaru);
}); 
    
app.put('/buku/:id', (req, res) => {
    const index = buku.findIndex(b => b.id === parseInt(req.params.id));

    if (index === -1) {
        return res.status(404).json({ message: 'Buku tidak ditemukan' });
    }

    buku[index] = {
        ...buku[index],
        judul: req.body.judul,
        penulis: req.body.penulis
    };
    res.json(buku[index]);
});


app.delete('/buku/:id', (req, res) => {
    const index = buku.findIndex(b => b.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).json({ message: 'Buku tidak ditemukan' });
    }
    
    const deletedBuku = buku.splice(index, 1);
    res.json(deletedBuku[0]);
});

