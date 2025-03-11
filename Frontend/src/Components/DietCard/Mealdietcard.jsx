import { useLocation } from "react-router-dom";
import './Dietcard.css';
const Mealdietcard = () => {
  const location = useLocation();
  const plan = location.state?.plan; 

  return (
    <div className="dietCardss">
      <h2>Plan Name: {plan?.planName}</h2>
      <p>Plan Code: {plan?.planCode}</p>
      <p>Price: {plan?.price}</p>

      <h3>Diets:</h3>
      <ul className="dietcard-ul">
        {plan?.meals?.map((meal, index) => (
          <li key={index}>
            <h4><span>Diet Name:</span> {meal.mealName}</h4>
            <img src={meal.mealImage} alt={meal.dietName} width="100" />
            <p><span>Calories:</span> {meal.mealCalorie}</p>
            <p><span>Fats:</span> {meal.mealFats}</p>
            <p><span>Protein:</span> {meal.mealProtein}</p>
            <p><span>Carbohydrates:</span> {meal.mealCrbo}</p>
            <p><span>Ingredients:</span> {meal.ingredients}</p>
            <p><span>Description:</span> {meal.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Mealdietcard;
