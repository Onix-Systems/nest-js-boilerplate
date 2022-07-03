import { Injectable } from '@nestjs/common';
import RolesRepository from '@v1/roles/roles.repository';
import {RolesEnum} from "@decorators/roles.decorator";

@Injectable()
export default class RolesService {
  constructor(private readonly rolesRepository: RolesRepository) {}

  getByName(name: RolesEnum) {
    return this.rolesRepository.getByName(name);
  }
}
