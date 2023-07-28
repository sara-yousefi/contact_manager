import { useEffect} from 'react';
import { Route,Routes,Navigate,useNavigate } from 'react-router';
import './App.css';
import _ from 'lodash';
import { useImmer } from 'use-immer';
import { ToastContainer,toast } from 'react-toastify';

import { confirmAlert } from 'react-confirm-alert';
import { contactContext } from './context/contactContext';
/* import component */
import {AddContact,EditContact,ViewContact,Contacts,Navbar} from "./component";

import {getAllContacts,getAllGroups,createContact, deleteContact} from "./services/contactService"
import { CURRENTLINE, PURPLE, YELLOW,FOURGROUND, COMMENT } from './helpers/colors';

const App=()=> {
  const [contacts,setContacts]=useImmer([]);
  const [groups,setGeoups]=useImmer([]);
  const [loading,setLoading]=useImmer(false);
  const [contactQuery, setContactQuery] = useImmer({ text: "" });
  const [filteredContacts, setFilteredContacts] = useImmer([]);

  //mount
  useEffect(()=>{
    const fetchData=async ()=>{
        try{
            setLoading(true);
            const {data:contactData}=await getAllContacts();
            const {data:groupData}=await getAllGroups();
            setContacts(contactData);
            setFilteredContacts(contactData);
            setGeoups(groupData);
            setLoading(false);
        }catch(err){
            console.log(err.message);
            setLoading(false);
        }
    } ;
    fetchData();
  },[])

  const navigate=useNavigate();
  //---create contact
  const createContactForm=async (event)=>{
      //event.preventDefault();
      try{
          setLoading(true);

          const {status ,data}= await createContact(event);
          if(status=== 201){
            toast.success("Contact added successfully",{icon: "🚀"})
            setContacts(draft=>{
              draft.push(data)
            });
            setFilteredContacts(draft=>{
              draft.push(data)
            });

            setLoading(false);
            navigate("/contacts");
          }
      }catch(err){
          console.log(err.message);
          setLoading(false);
      }
  }

  //---delete contact
  const removeContact=async(contactId)=>{
    const contctsBackup = [...contacts];
    try {
      setContacts(draft=>draft.filter((c)=> c.id !== contactId));
      setFilteredContacts(draft=>draft.filter((c)=> c.id !== contactId));
      // Sending delete request to server
      const { status } = await deleteContact(contactId);

      if (status !== 200) {
        toast.error("Delete failed");
        setContacts(contctsBackup);
        setFilteredContacts(contctsBackup);
      }
      toast.success("Contact deleted");
    } catch (err) {
      console.log(err.message);

      setContacts(contctsBackup);
      setFilteredContacts(contctsBackup);
    }
  }
  //---confirm delete contact
  const confirmDelete=(contactId,contactFullName)=>{
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div  className="p-4" style={{backgroundColor:CURRENTLINE,borderRadius:"1em",border:`1px solid ${PURPLE}`}}>
            <h1 style={{color:YELLOW}}> Delete contact </h1>
            <p style={{color:FOURGROUND}}>
              Do you want to delete {contactFullName} contact?
            </p>
            <button className='btn mx-2' style={{backgroundColor:COMMENT}} onClick={onClose}>NO</button>
            <button
              className='btn mx-2'
              style={{backgroundColor:PURPLE}}
              onClick={() => {
                removeContact(contactId);
                onClose();
              }}
            >
              Yes
            </button>
          </div>
        );
      }
    });
  }
  //contact search
  const contactSearch = _.debounce((query) => {
    if (!query) return setFilteredContacts([...contacts]);

    setFilteredContacts((draft) =>
      draft.filter((c) =>
        c.fullname.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, 1000);
 
  
  
  return (
    <contactContext.Provider value={{
      loading,
      setLoading,
      setContacts,
      setFilteredContacts,
      contacts,
      filteredContacts,
      groups,
      deleteContact:confirmDelete,
      createContact:createContactForm,
      contactQuery,
      contactSearch
    }}>
      <div className="App">
        <ToastContainer rtl={false} position="top-right" theme="light"/>
        <Navbar />
        <Routes>
          <Route path='/' element={<Navigate to={"/contacts"}/>} />
          <Route path='/contacts' element={<Contacts />} />
          <Route path='/contacts/add' element={<AddContact />} />
          <Route path='/contacts/:contactId' element={<ViewContact/>}  />
          <Route path='/contacts/edit/:contactId' element={<EditContact />} />
        </Routes>
        
      </div>
    </contactContext.Provider>
  );
}

export default App;
