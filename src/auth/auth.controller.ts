import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegistrationDto } from './dto/registration.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  registration(@Body() createUserDto: RegistrationDto) {
    return this.authService.registration(createUserDto);
  }

  @Post('signin')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
