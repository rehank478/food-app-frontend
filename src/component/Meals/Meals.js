import ShowMeals from "./ShowMeals";
import classes from "./Meals.module.css";
import { useEffect, useState } from "react";
import axios from "../../axios";




const Meals = () => {

  const[items, setItems] = useState([]);

  useEffect(() => {
      axios.get('addItem').then(response => {
        setItems(response.data);
        // console.log(response.data);
      }).catch(err => {
        console.log("Something Went Wrong");
      })
  },[])

    const mealsContent = items.map(meal => {
        return <ShowMeals key={meal._id} id={meal._id} name={meal.name} description={meal.description} price={meal.price} />;
    });
    return(
      <div className={classes.meals}>
        {mealsContent}
      </div>
    );
}

export default Meals;