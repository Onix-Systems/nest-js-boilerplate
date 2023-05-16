import { ComponentLoader } from 'adminjs';

const componentLoader = new ComponentLoader();

const Components = {
  Roles: componentLoader.add('Roles', './roles.component'),
};

export { componentLoader, Components };
