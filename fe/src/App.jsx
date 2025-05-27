import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'

const API_BASE_URL = 'http://localhost:3000';

function App() {
  const [buku, setBuku] = useState([]);
  const [judul, setJudul] = useState('');
  const [penulis, setPenulis] = useState('');
  const [editId, seteditId] = useState(null);


  useEffect(()=>{
    fetch(`${API_BASE_URL}/buku`)
    .then(res=>res.json())
    .then(data=>{
      console.log('hasil fetch: ', data);
      setBuku(data)
    })
  },[])

  const handleSubmit =(e)=>{
    e.preventDefault();
    const method = editId ? 'PUT' : 'POST';
    const url = editId ? `${API_BASE_URL}/buku/${editId}` : `${API_BASE_URL}/buku`;

    fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({judul, penulis})
    })
    .then(res=>res.json())
    .then( data=>{
      if(editId){
      setBuku(buku.map(b => (b.id ===editId ?  data : b)) );
      seteditId(null);

      } else
      {
      setBuku([...buku, data]);
      }
      setJudul('');
      setPenulis('');
      console.log('data yang ditambahkan',data);
    })
    .catch(error => console.error('Error:', error));
  };

  const handleEdit= (id) =>{
    const bukuEdit = buku.find (b=> b.id ===id);
    if( bukuEdit){
      
      setJudul(bukuEdit.judul);
      setPenulis(bukuEdit.penulis);
      seteditId(id);
    }
  }

  const handleDelete= (id) =>{
    fetch(`${API_BASE_URL}/buku/${id}` ,{
      method: 'DELETE'
    })
    .then(res=>res.json())
    .then (()=>{
      setBuku(buku => buku.filter(b => b.id !== id))
    })
  
  }



  return (
    <>
    <h1>Crud Buku</h1>
    <div>
      <h2>Tambah Buku</h2>
      <input type="text" placeholder="Judul" name='judul' value={judul} onChange={(e)=>setJudul(e.target.value)}/>
      <input type="text" placeholder="Penulis" name='penulis' value={penulis} onChange={(e)=>setPenulis(e.target.value)}/>
      <button onClick={handleSubmit}>{ editId ? 'Simpan' : 'Tambah'}</button>
    </div>

    <div>
      <h2>Daftar Buku</h2>
      <ul>
      {buku.map(b =>(
        <li key={b.id}>{b.judul} - {b.penulis}  <button onClick={()=>handleDelete(b.id)}>Hapus</button> <button onClick={()=>handleEdit(b.id)}>Edit</button> </li>
      ))}
      </ul>
    </div>
     
    </>
  )
}

export default App
