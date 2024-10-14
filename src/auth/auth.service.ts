import * as bcrypt from 'bcrypt';
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { RegistrationDto } from './dto/registration.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOne(email);
    console.log(user, password);

    if (user) {
      const isValidPassword = await bcrypt.compare(password, user.password);

      if (isValidPassword) {
        return user;
      }
    }

    throw new BadRequestException('Неверный логин или пароль');
  }

  async registration(registrationDto: RegistrationDto) {
    const candidate = await this.userService.findOne(registrationDto.email);

    if (candidate) {
      throw new BadRequestException(
        'Пользователь с таким email уже существует',
      );
    }

    const hashPassword = await bcrypt.hash(registrationDto.password, 3);

    const user = await this.userService.create({
      ...registrationDto,
      password: hashPassword,
    });

    const token = this.createToken({ id: user.id });

    return { token, userId: user.id };
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);

    if (user) {
      const token = this.createToken({ id: user.id });
      return { token, userId: user.id };
    }
  }

  createToken(payload: any) {
    return this.jwtService.sign(payload);
  }

  validateToken(token: string) {
    return this.jwtService.verify(token);
  }
}
