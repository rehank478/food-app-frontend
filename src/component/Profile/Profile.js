import axios from "../../axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";
import classes from "./Profile.module.css";

const Profile = () => {
    const [userData, setUserData] = useState({});
    const isVerified = useSelector(state=> state.auth.isVerified);

    useEffect(() => {
        const fetchUsersData = () => {
            const x = localStorage.getItem('email');
            const y = localStorage.getItem('token');
            axios.get('profile', {
                headers: {
                    token: y,
                    email: x
                }
            }).then(response => {
                setUserData(response.data);
            }).catch((err) => {
                console.log("Something went wrong");
            });
        }
        fetchUsersData();
    },[]);

    // console.log(userData);
    let showContent = <p>No orders yet</p>;
    if(userData && userData.orders){
        showContent = userData.orders.map(order => {
            return <div key={order.id} className={classes.orders}> 
                <div key={order.id} className={classes.Table}>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Price(₹)</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            order.cart.items.map(item => {
                                return (<tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td>{item.price}</td>
                                    <td>{item.amount}</td>
                                </tr>);
                            })
                        }
                        </tbody>
                    </table>
                    <p>Mobile number: {order.mobile}</p>
                    <address>
                        Address: {order.address.street}, {order.address.city}, {order.address.postalCode}
                    </address>
                    <h3>Total Price: ₹{order.cart.totalPrice}</h3>
                    <h4>Quantity: {order.cart.numberOfItems}</h4>
                </div>
            </div>
        })
    }



    return(
        <div className={classes.profile}>
            {!isVerified && <Redirect to='/' />}
            <div className={classes.card}>
                <div className={classes.container}>
                    <h4>Name: <b>{userData.name}</b></h4>
                    <p>Email: {userData.email}</p>
                </div>
            </div>
            <div className={classes.previous} >
                <h1>Previous Orders</h1>
                <div className={classes.prev}>
                    {showContent}
                </div>
            </div>
        </div>
    );
}

export default Profile;