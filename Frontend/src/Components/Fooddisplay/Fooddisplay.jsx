import { useContext } from 'react';
import './fooddisplay.css';
import Card from '../Card/Card';
import { StoreContext } from '../../Context/Storecontext';

const Fooddisplay = ({ category }) => {
    const { food_list } = useContext(StoreContext); 

    return (
        <div className='food-display' id='food-display'>
            <h2>Top Dishes Near You</h2>
            <div className='food-display-list'>
                {food_list?.map((item, index) => {
                    {console.log(item.image)}
                    if (category === 'All' || category === item.category) {
                        return (
                            <Card 
                                key={item._id || index}  
                                id={item._id}
                                name={item.dishName}
                                description={item.description}
                                price={item.price}
                                image={item.image}
                            />
                        );
                    }
                    return null; 
                })}
            </div>
        </div>
    );
};

export default Fooddisplay;
