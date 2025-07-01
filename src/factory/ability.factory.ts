import {
    Ability,
    AbilityBuilder,
    AbilityClass,
    ExtractSubjectType,
    InferSubjects,
  } from '@casl/ability';
  import { Injectable } from '@nestjs/common';

import { Permission } from 'src/entities/permission.entity';
import { User } from 'src/entities/user.entity';
   



  type Actions = string;
  type Subjects = InferSubjects<any> | 'all';
  
  export type AppAbility = Ability<[Actions, Subjects]>;
  
  @Injectable()
  export class AbilityFactory {
    createForUser(user: User): AppAbility {
      const { can, build } = new AbilityBuilder<AppAbility>(
        Ability as AbilityClass<AppAbility>
      );
  
      const permissions: Permission[] = user.role?.permissions || [];
  
      for (const perm of permissions) {
        can(perm.action, perm.subject);
      }
  
      // Optional user-specific logic
    //   can('create', 'Question');
    //   can('update', 'Question');
    //   can('read', 'Question');


      
      return build({
        detectSubjectType: (item) => item.constructor as ExtractSubjectType<Subjects>,
      });
    }
  }
  