import { Controller, Request, Post, Get, UseGuards, HttpStatus, HttpCode } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserService } from 'src/services/user.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtRefreshAuthGuard } from './guards/jwt-refresh-auth.guard';
import { Public } from 'src/decorators/public.decorator';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService:AuthService, 
    private readonly  userService:UserService 
  
  ) {}

//AuthGuard('local')
    @Public()
    @UseGuards(LocalAuthGuard)
    //@UseGuards(AuthGuard('local'))
     @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Request() req ) {
      return  await this.authService.login(req.user)
  }


   // @UseGuards(JwtAuthGuard)
  // @UseGuards(AuthGuard('jwt'))
   @Get('user/profile')
   async profile(@Request() request )
   {
  //  console.log(process.env.REFRESH_JWT_EXP_IN)
     console.log(request.user)
     return await this.userService.getUserProfile(request.user.id)
   }


   //@UseGuards(JwtRefreshAuthGuard)
   @Public()
   @UseGuards(AuthGuard('jwt-refresh'))
   @Post('refresh-token')
   async refreshToken(@Request() request )
   {
      //console.log(req.user)
      return  await this.authService.refreshToken(request.user)
   }
}
