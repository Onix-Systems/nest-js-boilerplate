import { Routes } from 'nest-router';

class RoutesValidationUtils {
  private routesStorage: any = [];

  private getChildrenModulesRecursive(children: any) {
    children.forEach((item: any) => {
      if (item.module) {
        if (this.routesStorage.includes(item.module.name)) {
          console.log(`WARNING! [AppRoutes] Module ${item.module.name} is duplicated, only last import will work, other duplicates will be ignored`);
        } else {
          this.routesStorage.push(item.module.name);
        }
      }
      if (item.children) this.getChildrenModulesRecursive(item.children);
    });
  }

  public validate(routes: Routes) {
    routes.forEach((route) => {
      if (route.children) this.getChildrenModulesRecursive(route.children);
    });
    delete this.routesStorage;
    return routes;
  }
}
export default new RoutesValidationUtils();
