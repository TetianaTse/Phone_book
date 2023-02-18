import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import Button from './componets/Button';
import AddForm from './pages/AddFormPage';
import ContactList from './pages/ContactListPage';

function App() {
  const [page, setPage] = useState('contacts');

  const handleClickContacts = () => {
    setPage('contacts');
  }
  const handleClickForm = () => {
    setPage('form');
  }
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios('https://jsonplaceholder.typicode.com/users')
    .then (({data})=> {setItems(data)});
  }, []);

  const handleCreateContact = item => {
    setItems([
      ...items,
      item
    ]);
  }
  const handleDeleteContact = (number) => {
    setItems(items.filter(item => item.id !== Number(number)));
  }

  return (
    <div className="App">
      <h1>Phone book</h1>
      <div className='btn_main'>
        <Button value="Contact list" id="btn_list" callback={handleClickContacts} className="btn _list"/>
        <Button value="Add contact form" id="btn_form" callback={handleClickForm} className="btn _form"/>
      </div>
      {page === 'contacts' && (<ContactList items={items} onDelete={handleDeleteContact}/>)}
      {page === 'form' && (<AddForm onSave={handleCreateContact}/>)}
    </div>
  );
}

export default App;
