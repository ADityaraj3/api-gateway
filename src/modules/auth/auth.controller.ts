import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDTO } from './dto/signup-dto';
import { Response } from 'express';
import { LoginDTO } from './dto/login-dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() body: SignUpDTO, @Res() res: Response) {
    return this.authService.signUp(body, res);
  }

  @Post('login')
  login(@Body() body: LoginDTO, @Res() res: Response) {
    return this.authService.login(body, res);
  }
}
