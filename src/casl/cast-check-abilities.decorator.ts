import { SetMetadata } from '@nestjs/common';
import { Actions, Subjects } from './casl-ability.factory';

export interface RequiredPermission {
  action: Actions;
  subject: Subjects;
}

export const CHECK_ABILITY = 'check_ability';
export const CheckAbilities = (...requirements: RequiredPermission[]) =>
  SetMetadata(CHECK_ABILITY, requirements);
