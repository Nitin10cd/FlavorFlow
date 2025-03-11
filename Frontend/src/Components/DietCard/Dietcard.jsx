import { useLocation } from "react-router-dom";
import './Dietcard.css';

const Dietcard = () => {
  const location = useLocation();
  const plan = location.state?.plan; 

  return (
    <div className="dietCardss">
      <h2>Plan Name: {plan?.planName}</h2>
      <p>Plan Code: {plan?.planCode}</p>
      <p>Price: {plan?.price}</p>
      
      <h3>Diets:</h3>
      <ul className="dietcard-ul">
        {plan?.diet?.map((diet, index) => (
          <li key={index}>
            <h4><span>Diet Name:</span> {diet.dietName}</h4>
            <img src={diet.dietImage} alt={diet.dietName} width="100" />
            <p><span>Calories:</span> {diet.dietCalorie}</p>
            <p><span>Fats:</span> {diet.dietFats}</p>
            <p><span>Protein:</span> {diet.dietProtein}</p>
            <p><span>Carbohydrates:</span> {diet.dietCarbo}</p>
            <p><span>Ingredients:</span> {diet.ingredients}</p>
            <p><span>Description:</span> {diet.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dietcard;
