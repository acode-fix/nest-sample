import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserService } from "src/services/user.service";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy)
{
   constructor(private readonly userService: UserService){
    
       // console.log(ExtractJwt.fromAuthHeaderAsBearerToken())
      super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        // (req) => req.headers['authorization'],
          ignoreExpiration: false,
        secretOrKey: process.env.JWT_SECRET
      })
      
   }


   async validate(payload: any)
   { 

      const user = await this.userService.findByIdWithRoleAndPermissions(payload.sub);
      return user;
      //  console.log(payload)
   //      const user = await this.userService.findByIdWithRoleAndPermissions(payload.sub);
      //  console.log('userid: '+  payload.sub)
   //   if (!user) throw new UnauthorizedException('unkwo');
      //return { id: payload.sub,  email:  payload.email }; // replace with actual user data
   }
}