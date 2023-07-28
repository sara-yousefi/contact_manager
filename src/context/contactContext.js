import { createContext } from "react";

export const contactContext=createContext({
    loading:false,
    setLoading:()=>{},
    setContacts:()=>{},
    setFilteredContacts:()=>{},
    contacts:[],
    filteredContacts:[],
    groups:[],
    deleteContact:()=>{},
    createContact:()=>{},
    contactQuery:{},
    contactSearch:()=>{}
});