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
import { UserService } from 'src/services/user.service';


   



  export type Actions = string;
  export type Subjects = InferSubjects<any> | 'all';
  
  export type AppAbility = Ability<[Actions, Subjects]>;
  
  @Injectable()
  export class CaslAbilityFactory {
   
      constructor( private readonly userService:UserService ){}
    createForUser(user: User): AppAbility {
     //   console.log('Received user in CASL Factory:', user)

      const { can, build } = new AbilityBuilder<AppAbility>(
        Ability as AbilityClass<AppAbility>
      );
      
        //  let myuser =   this.userService.findByIdWithRoleAndPermissions(user.id)
           // console.log(myuser)
      const permissions: Permission[] = user.role.permissions || [];
       //console.log('perm: '+ permissions)
        
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
  