"use client";
import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const Contexts = createContext({})

export const AppProvider = ({ children }) => {
    // const[email, setEmail] = useState("")
    const [users, setUsers] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [orders, setOrders] = useState([]);
    
    
    

    const fetchRooms = () => {
        axios.get("http://localhost:8081/v1/api/getAllRoom")
            .then((res) => {
                
                setRooms(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const fetchUsers = () => {
        axios.get("http://localhost:8081/v1/api/getAllUser")
            .then((res) => {
                
                setUsers(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const fetchOrders = () => {
        axios.get("http://localhost:8081/v1/api/getAllContract")
            .then((res) => {
                
                setOrders(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        fetchRooms();
        fetchUsers();
      
        fetchOrders();
    }, []);
    
    return (
        <Contexts.Provider value={{
            rooms, setRooms, fetchRooms,
            users, setUsers, fetchUsers,
            orders, setOrders, fetchOrders
            
        }}>
            {children}
        </Contexts.Provider>
    );
};
