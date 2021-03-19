import { Button } from '@material-ui/core';
import { AlternateEmail } from '@material-ui/icons';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import RootRoutes from '../../RootRoutes';

/**
 * Button that deletes a product with given id
 * @param id of the product
 */
const DeleteProduct = ({ id }: DeleteButtonProps) => {
  const history = useHistory();
  const handleOnClick = () => {
    // Send a delete request with the products primary key
    axios
      .delete<any>('http://127.0.0.1:8000/product/', {
        data: { pk: id },
      })
      // Log the result to the console
      .then((response) => console.log(response))
      // Redirect to profilepage when deleted
      .then(() => {
        history.push(RootRoutes.userView);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <Button onClick={handleOnClick} color="secondary" variant="contained">
      Slett produkt
    </Button>
  );
};

interface DeleteButtonProps {
  id: number;
}

export default DeleteProduct;
