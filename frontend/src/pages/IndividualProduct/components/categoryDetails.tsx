import { CircularProgress } from '@material-ui/core';
import React from 'react';
import { GetReqApiService } from '../../../components/api/getUser';
import { LoadStates } from '../../../components/api/loadStates';

/**
 * Page wrapper component for Category profile page.
 *
 * Fetches category data from db using api service
 *
 * @returns Category profile page
 */
const CategoryDetails = ({ id }: CategoryProps) => {
  /* Use api service for getting category and showing different states */
  const service = GetReqApiService('http://127.0.0.1:8000/category/' + id);
  console.log(service);

  return (
    <div>
      {service.status === LoadStates.LOADING && <CircularProgress />}
      {service.status === LoadStates.LOADED && <p>{service.payload.title}</p>}
      {service.status === LoadStates.ERROR && <div>Error</div>}
    </div>
  );
};

interface CategoryProps {
  id: string;
}
export default CategoryDetails;
