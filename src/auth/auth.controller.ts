import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
// import { CreateAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { LoginAuthDto } from './dto/login-auth.dto';

//TODO http://localhost/auth
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  //Cojer los datos del Body --> @Body()
  //Los datos se guardan en --> userObject
  //Validacion de los datos --> RegisterAuthDto
  registerUser(@Body() userObject: RegisterAuthDto) {
    return this.authService.register(userObject);
  }

  //TODO login
  @Post('login')
  loginUser(@Body() userObjectLogin: LoginAuthDto) {
    return this.authService.login(userObjectLogin);
  }
}
