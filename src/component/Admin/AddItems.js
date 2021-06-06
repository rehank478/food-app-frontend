import {TextField, Button} from "@material-ui/core";
import axios from "../../axios";
import {useState} from "react";
import classes from "./AddItem.module.css";
import queryString from 'query-string';


const AddItems = () => {
    const [name,setName] = useState("");
    const [description,setDescription] = useState("");
    const [price, setPrice] = useState('');
    const [error, setError] = useState('');

    const nameHandler = (event) => {
        setName(event.target.value);
    }


    const descriptionHandler = (event) => {
        setDescription(event.target.value);
    }

    const priceHandler = (event) => {
        setPrice(event.target.value);
    }

    const formSubmitHandler = (event) => {
        event.preventDefault();
        setError('');
        const data = {
            name: name,
            description: description,
            price: price
        };
        const x = localStorage.getItem('AdminToken')
        axios.post('addItem', queryString.stringify(data),{
            headers: {
                AdminToken: x
            }
        }).then(response => {
            setError(response.data);
        }).catch(err => {
            setError("Something Went Wrong")
        });
    }

    return(
        <form className={classes.Form}>
            <h1>Add Item</h1>
            {error && <p>{error}</p>}
            <TextField value={name} fullWidth onChange={nameHandler}  id="name" required margin='normal' label="Name" variant="outlined" />
            <TextField value={description} fullWidth onChange={descriptionHandler}  id="description" required margin='normal' label="Description" variant="outlined" />
            <TextField value={price} fullWidth onChange={priceHandler} InputProps={{ inputProps: { min: 0} }}type='number'  id="price" required margin='normal' label="Price" variant="outlined" />
            <Button type="submit" className={classes.but} onClick={formSubmitHandler} variant="contained" size="large" color="primary" >Add</Button>
        </form>
    );
}

export default AddItems;