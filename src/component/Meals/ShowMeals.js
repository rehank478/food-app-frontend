import classes from "./ShowMeals.module.css";
import {useSelector,useDispatch} from "react-redux";
import { cartActions} from "../../store/cartSlice";
import { useHistory} from "react-router";

const ShowMeals = (props) => {
    const dispatch = useDispatch(); 
    const isVerified = useSelector(state => state.auth.isVerified);
    const history = useHistory();
    

    const addItemHandler = () => {
        if(!isVerified){
            history.push('login');
        }
        dispatch(cartActions.addItem({
            id: props.id,
            name: props.name,
            description: props.description,
            price: props.price
        }));
    }


    return(
        <div className={classes.card} >
            <div className={classes.meal}>
                <h3>{props.name}</h3>
                <p className={classes.description}>{props.description}</p>
                <p className={classes.price}>₹ {props.price}</p>
            </div>
            <div className={classes.addButton}>
                <button onClick={addItemHandler} className={classes.add}>+ Add</button>
            </div>
        </div>
    );
}

export default ShowMeals;