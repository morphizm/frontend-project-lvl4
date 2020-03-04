import Add from './Add';
import Rename from './Rename';
import Remove from './Remove';

const mapping = {
  adding: Add,
  renaming: Rename,
  removing: Remove,
};

export default (type) => mapping[type];
