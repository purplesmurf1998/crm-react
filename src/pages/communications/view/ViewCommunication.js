import React, {useState, useEffect} from "react";
import CommunicationInfo from "../CommunicationInfo";
import axios from "axios";
import Loader from "../../../components/Loader";
import "react-datepicker/dist/react-datepicker.css";

const ViewCommunication = ({ currentUser, toggle, selectedComm }) => {

  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true);

  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState(new Date());
  const [method, setMethod] = useState(null)
  const [portfolio, setPortfolio] = useState(null); 
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    axios({
      method: 'get',
      url: `/api/v1/communications/${selectedComm._id}`
    }).then((response) => {
      if (response.data.success) {
        const comm = response.data.data;
        console.log(comm);
        const tempContacts = []
        comm.contacts.forEach(contact => {
          tempContacts.push({
            value: contact._id,
            label: `${contact.contact.fullname} : ${contact.portfolio.portName}`
          });
        });
        setContacts(tempContacts);
        setPortfolio({
          value: comm.portfolio._id,
          label: comm.portfolio.portName
        });
        setSubject(comm.subject);
        setContent(comm.content);
        setMethod({
          value: comm.method,
          label: comm.method
        });
        setDate(comm.date);
        setLoading(false);
      } else {
        setLoading(false);
      }
    }).catch((err) => {
      console.error(err);
      setLoading(false);
    })
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault();
    // basic form validation
    // TODO: Improve for visual feedback
    if (subject === "" || !method || !portfolio || !date || content === "") {
      setError("Missing information. Make sure to enter required fields")
      setTimeout(() => {
        setError(null);
      }, 3000)
    } else {
      console.log("Information good, submit");
      // convert contact list if any contacts
      let formattedContacts = [];
      if (contacts.length > 0) {
        contacts.forEach((contact, index) => {
          formattedContacts.push(contact.value);
        })
      }
      const newCommunication = {
        subject,
        content,
        date,
        method: method.value,
        portfolio: portfolio.value,
        contacts: formattedContacts
      };
      
      axios({
        method: 'post',
        url: '/api/v1/communications',
        headers: {
          'Content-Type': 'application/json'
        },
        data: newCommunication
      }).then((results) => {
        if (results.data.success) {
          window.location.reload();
        } else {
          setError(results.data.message)
          setTimeout(() => {
            setError(null);
          }, 3000);
        }
      }).catch((err) => {
        console.error(err);
        setTimeout(() => {
          setError(null);
        }, 3000);
      });
    }
  }

  return loading ? <Loader /> : ( 
    <CommunicationInfo
      error={error}
      handleSubmit={handleSubmit}
      toggle={toggle}
      subject={subject}
      content={content}
      date={date}
      method={method}
      portfolio={portfolio}
      contacts={contacts}
      setSubject={setSubject}
      setContent={setContent}
      setDate={setDate}
      setMethod={setMethod}
      setPortfolio={setPortfolio}
      setContacts={setContacts}
    />
   );
}
 
export default ViewCommunication;