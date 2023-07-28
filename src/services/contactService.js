import axios from "axios";

const SERVER_URL="http://localhost:9000";

//@desc Get All Contact
//@Rout http//:lacalhost:9000/contacts
export const getAllContacts=()=>{
    const url=`${SERVER_URL}/contacts`;
    return axios.get(url);
}
//@desc Get Contact With ContactId
//@Rout http//:lacalhost:9000/contacts/:contactId
export const getContact=(contactId)=>{
    const url=`${SERVER_URL}/contacts/${contactId}`;
    return axios.get(url);
}
//@desc Get All Groups
//@Rout http//:lacalhost:9000/groups
export const getAllGroups=()=>{
    const url=`${SERVER_URL}/groups`;
    return axios.get(url);
}
//@desc Get Contact With groupId
//@Rout http//:lacalhost:9000/groups/:groupId
export const getGroup=(groupId)=>{
    const url=`${SERVER_URL}/groups/${groupId}`;
    return axios.get(url);
}
//@desc create Contact 
//@Rout http//:lacalhost:9000/contacts
export const createContact=(contact)=>{
    const url=`${SERVER_URL}/contacts`;
    return axios.post(url,contact);
}
//@desc update Contact 
//@Rout http//:lacalhost:9000/contacts/:contactId
export const updateContact = (contact, contactId) => {
    const url = `${SERVER_URL}/contacts/${contactId}`;
    return axios.put(url, contact);
};
//@desc delete Contact 
//@Rout http//:lacalhost:9000/contacts/:contactId
export const deleteContact=(contactId)=>{
    const url=`${SERVER_URL}/contacts/${contactId}`;
    return axios.delete(url);
}