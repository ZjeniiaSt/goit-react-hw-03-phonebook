import './App.css';
import React, { Component } from 'react';
import Container from './components/Container';
import ContactForm from './components/ContactForm';
import Filter from './components/Filter';
import ContactList from './components/ContactList';
import shortid from 'shortid';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };
  formSubmitHandler = data => {
    const { contacts } = this.state;
    const newContact = { id: shortid.generate(), name: data.name, number: data.number };
    if (
      contacts.find(
        contact =>
          contact.name.toLowerCase() === newContact.name.toLowerCase() ||
          contact.number === newContact.number,
      )
    ) {
      return alert(`${newContact.name} is already in contacts!`);
    }
    this.setState(prevState => {
      return { contacts: [...prevState.contacts, newContact] };
    });
  };

  changeFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  getFindContact = () => {
    const normalizedFilter = this.state.filter.toLowerCase();
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const visibleContacts = this.getFindContact();
    return (
      <>
        <Container title="Phonebook">
          <ContactForm onSubmit={this.formSubmitHandler}></ContactForm>
          <Filter value={this.state.filter} onChange={this.changeFilter}></Filter>
          <ContactList contacts={visibleContacts} onDelete={this.deleteContact} />
        </Container>
      </>
    );
  }
}
export default App;
