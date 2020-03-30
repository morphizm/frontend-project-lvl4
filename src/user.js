import faker from 'faker';
import cookies from 'js-cookie';

const makeUser = () => {
  const userName = cookies.get('name');
  if (userName) {
    return { name: userName };
  }
  const newUserName = faker.name.findName();
  cookies.set('name', newUserName);
  return { name: newUserName };
};

export default makeUser;
