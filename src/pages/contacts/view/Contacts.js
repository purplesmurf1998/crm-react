import React, {useState, useEffect} from "react"
import {
  Row,
  Col,
  Alert
} from 'reactstrap'
import axios from "axios";

import CreateContact from "../add/CreateContact";
import ContactList from "../list/ContactList";

const Contacts = () => {

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // fetch data
    axios({
      method: 'get',
      url: '/api/v1/contacts',
      params: {
        sort: 'fullname'
      }
    }).then((response) => {
      if (response.data.success) {
        setContacts(response.data.data);
        setFilteredContacts(response.data.data);
        setLoading(false);
      } else {
        setError(response.data.message)
        setLoading(false);
      }
    }).catch((err) => {
      console.error(err);
      setLoading(false);
    })
  }, [success]);

  const handleSearchBar = (event) => {
    setFilteredContacts(contacts.filter(contact => contact.fullname.toLowerCase().includes(event.target.value.toLowerCase())));
  }

  return (
    <Col>
      {error && <Row className="d-flex justify-content-center mb-3"><Alert color="danger" className="p-3">{error}</Alert></Row>}
      {success && <Row className="d-flex justify-content-center mb-3"><Alert color="success" className="p-3">{success}</Alert></Row>}
      <Row>
        <Col>
          <ContactList
            setSuccess={setSuccess}
            setError={setError}
            filteredContacts={filteredContacts}
            handleSearchBar={handleSearchBar}
            loading={loading} />
        </Col>
        <Col>
          <CreateContact setSuccess={setSuccess} setError={setError}/>
        </Col>
      </Row>
    </Col>
   );
}
 
export default Contacts;