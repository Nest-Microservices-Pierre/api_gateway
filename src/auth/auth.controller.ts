import { Controller, Post, Body, Inject, Get, UseGuards } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config';
import { LoginUserDto, RegisterUserDto } from './dto';
import { catchError } from 'rxjs';
import { AuthGuard } from './guards/auth.guard';
import { Token, User } from './decorators';
import { UserInterface } from './interfaces/user.interface';

@Controller('auth')
export class AuthController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.client.send('loginUser', loginUserDto).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Post('register')
  register(@Body() registerUserDTO: RegisterUserDto) {
    return this.client.send('registerUser', registerUserDTO).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @UseGuards(AuthGuard)
  @Get('verifyToken')
  verifyToken(@User() user: UserInterface, @Token() token: string) {
    return {
      user,
      token,
    };
  }
}
