import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { CaslAbilityFactory } from './casl-ability.factory';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from 'src/decorators/public.decorator';
import { CHECK_ABILITY, RequiredPermission } from './cast-check-abilities.decorator';


@Injectable()
export class CaslAbilityGuard implements CanActivate {
  constructor(private CaslAbilityFactory: CaslAbilityFactory, private reflector:Reflector) {}

  canActivate(context: ExecutionContext): boolean {

     const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
          context.getHandler(),
          context.getClass(),
        ]);
        if (isPublic) {
          return true;
        }
        const rules = this.reflector.get<RequiredPermission[]>(
          CHECK_ABILITY,
          context.getHandler(),
        );
    
        if (!rules || rules.length === 0) return true; // optional: allow routes without @CheckAbilities()
    
    
    const request = context.switchToHttp().getRequest();
     //console.log('fetch request'+request.user)
       const user = request.user;
       // console.log('myuser: '+ user)

     const ability = this.CaslAbilityFactory.createForUser(user);
     //  console.log('ab:' + ability)

    for (const rule of rules) {
     console.log(rule.action, rule.subject)
      const isAllowed = ability.can(rule.action, rule.subject);
      console.log(isAllowed)
      if (!isAllowed) {
        throw new ForbiddenException('Access denied');
      }
    }

    request.ability = ability;
    return true;


  }
}
