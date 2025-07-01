import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtRefreshAuthGuard } from './guards/jwt-refresh-auth.guard';


@Module({
  imports:[TypeOrmModule.forFeature([User]),
   JwtModule.register({ 
    secret: process.env.JWT_SECRET,
     signOptions: { expiresIn: process.env.JWT_EXP_IN,
      algorithm: 'HS256'

      },
     
    
    }),

     
],
  controllers: [AuthController],
  providers: [AuthService,UserService, LocalStrategy, JwtStrategy, 
    JwtRefreshStrategy, JwtAuthGuard, JwtRefreshAuthGuard ],
    exports: [AuthService,UserService, LocalStrategy, JwtStrategy, 
      JwtRefreshStrategy, JwtAuthGuard, JwtRefreshAuthGuard ],

})
export class AuthModule {} 
