import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserService } from "src/services/user.service";

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy,'jwt-refresh')
{
   constructor(private readonly userService: UserService){
      super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
       // jwtFromRequest: ExtractJwt.fromBodyField(),
        // (req) => req.headers['authorization'],
        ignoreExpiration: false,
        secretOrKey: process.env.REFRESH_JWT_SECRET,
      })
   }


   async validate(payload: any)
   {
      // console.log(payload)
      const user = await this.userService.findByIdWithRoleAndPermissions(payload.sub);
      return user;
     // return { id: payload.sub,  email:  payload.email }; // replace with actual user data
   }
}