import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { bodyLogin } from './dto/login.dto';
import { bodySignup } from './dto/signup.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags("Auth")
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @HttpCode(200) 

  
  @Post('login')
  login(@Body() bodyLogin: bodyLogin ){
    try{
      return this.authService.login(bodyLogin)
    }
    catch(exception){
      if(exception.status != 500){
        throw new HttpException(exception.response, exception.status)
      }
      throw new HttpException('Lỗi...', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  } 

  @Post('signup')
  signup(@Body() bodySignup: bodySignup){
    return this.authService.signup(bodySignup)
  }

  // @ApiBearerAuth()
  // @Get('validate-token')
  // @UseGuards(AuthGuard('jwt'))
  // validateToken(@Req() req) {
  //   console.log('req: ', req.headers);
  //   const token = req.headers.authorization.split(' ')[1];
  //   console.log('token: ', token);
  //   if (!token) {
  //     throw new HttpException('No token provided', HttpStatus.FORBIDDEN);
  //   }
  //   const isValid = this.authService.verifyToken(token);
  //   if (!isValid) {
  //     throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
  //   }
  //   return this.authService.verifyToken(token);
  // }
}
