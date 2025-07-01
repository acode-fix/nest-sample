import { Module, Global } from '@nestjs/common';
import { CaslAbilityFactory } from './casl-ability.factory';
import { CaslAbilityGuard } from './casl-ability.guard';
import { UserService } from 'src/services/user.service';
import { UserModule } from 'src/modules/user.module';

// @Global()
@Module({
    imports:[UserModule],
    providers: [CaslAbilityFactory, CaslAbilityGuard],
    exports: [CaslAbilityFactory, CaslAbilityGuard],
  
})
export class CaslModule {}
