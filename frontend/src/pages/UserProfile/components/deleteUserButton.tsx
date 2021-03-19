import { Box, Button } from '@material-ui/core';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { logOut } from '../../../redux/user/user.actions';
import RootRoutes from '../../RootRoutes';
import { useDispatch } from 'react-redux';

/**
 * Button that deletes a user with given id
 * @param id of the user
 */
const DeleteUser = ({ id }: DeleteButtonProps) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleOnClick = () => {
    // Send a delete request with the users primary key
    axios
      .delete<any>('http://127.0.0.1:8000/user/', {
        data: { pk: id },
      })
      // Log the result to the console
      .then((response) => console.log(response))
      // Redirect to profilepage when deleted
      .then(() => {
        dispatch(logOut());
        history.push(RootRoutes.registerUser);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Box mt={2}>
      <Button onClick={handleOnClick} color="secondary" variant="contained">
        Slett bruker
      </Button>
    </Box>
  );
};

interface DeleteButtonProps {
  id: string;
}

export default DeleteUser;
