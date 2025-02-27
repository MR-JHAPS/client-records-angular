export * from './clientController.service';
import { ClientControllerService } from './clientController.service';
export * from './clientSearchController.service';
import { ClientSearchControllerService } from './clientSearchController.service';
export * from './publicController.service';
import { PublicControllerService } from './publicController.service';
export * from './userController.service';
import { UserControllerService } from './userController.service';
export const APIS = [ClientControllerService, ClientSearchControllerService, PublicControllerService, UserControllerService];
