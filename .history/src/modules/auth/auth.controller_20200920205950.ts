import { Controller, Post, Body, Put } from '@nestjs/common';
import { SignupDto, SigninDto, SignChangeDto } from './dto';

@Controller('auth')
export class AuthController {
  @Post('signup')
  async signUp(@Body() signup: SignupDto): Promise<void> {
    //return this._authService.signUp(signup);
  }

  @Put('signchange')
  async signchange(@Body() signChange: SignChangeDto): Promise<boolean> {
    console.log(signChange);
    return false; // this._authService.signChange(signChange);
  }

  @Post('signin')
  async signIn(
    @Body() signin: SigninDto,
  ): Promise<{
    accessToken: string;
    name: string;
    email: string;
    username: string;
  }> {
    console.log('El usuario a autenticar es =>>>>>>>', signin);
    return null; //this._authService.signIn(signin, false);
  }
}
