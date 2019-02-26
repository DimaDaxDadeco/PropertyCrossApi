import * as Router from 'koa-router';
import {
  getPropertiesByLocation,
  getPropertyById,
  searchLocationByCoordinates,
  searchLocationsByName,
} from '../controllers/';

const routerOptions: Router.IRouterOptions = {
  prefix: '/locations',
};

export const locationRouter: Router = new Router(routerOptions);

locationRouter.get('/searchByName', searchLocationsByName);

locationRouter.get('/searchByCoordinates', searchLocationByCoordinates);

locationRouter.get('/:placeName/properties', getPropertiesByLocation);

locationRouter.get('/:placeName/properties/:id', getPropertyById);
