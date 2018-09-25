import createIndex from '../../../modules/server/create-index';
import Locations from '../Locations';

createIndex(Locations, { name: 'text' });
