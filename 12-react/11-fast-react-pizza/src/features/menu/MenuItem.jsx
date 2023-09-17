import { useDispatch, useSelector } from 'react-redux';
import Button from '../../ui/Button';
import DeleteItem from '../cart/DeleteItem';

import { formatCurrency } from '../../utils/helpers';
import { addItem, getCurrentQuantityById } from '../cart/cartSlice';
import UpdateItemQuantity from '../cart/UpdateItemQuantity';

function MenuItem({ pizza }) {
  const dispatch = useDispatch();

  const { id: pizzaId, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const currentQuantity = useSelector(getCurrentQuantityById(pizzaId));
  const isInCart = currentQuantity > 0;

  const handleAddToCart = () => {
    const newItem = {
      pizzaId,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };
    dispatch(addItem(newItem));
  };

  return (
    <li className="flex gap-4 py-2">
      <img className={`h-24 ${soldOut ? 'opacity-70 grayscale' : ''}`} src={imageUrl} alt={name} />
      <div className="flex flex-col flex-grow pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="text-sm italic text-stone-500 capitalize">{ingredients.join(', ')}</p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm uppercase font-medium text-stone-500">Sold out</p>
          )}
          {isInCart && (
            <div className='flex items-center gap-3 sm:gap-8'>
              <UpdateItemQuantity pizzaId={pizzaId} currentQuantity={currentQuantity} />
              <DeleteItem pizzaId={pizzaId} />
            </div>
          )}
          {!soldOut && !isInCart && (
            <Button type="small" onClick={handleAddToCart}>
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
