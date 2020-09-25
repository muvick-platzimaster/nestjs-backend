import { Controller, Post, Body, Put, UseGuards } from '@nestjs/common';
import { SignupDto, SigninDto, SignChangeDto } from './dto';
import { AuthService } from './auth.service';
import {
  ApiTags,
  ApiResponse,
  ApiUnauthorizedResponse,
  ApiConflictResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('The authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Post('signup')
  @ApiConflictResponse({
    status: 409,
    description:
      'Password not secure (password_not_secure) or Email already exists (email_already_exists)',
  })
  async signUp(@Body() signup: SignupDto): Promise<void> {
    return this._authService.signUp(signup);
  }

  @Put('sign-change')
  @UseGuards(AuthGuard('jwt'))
  async signchange(@Body() signChange: SignChangeDto): Promise<boolean> {
    console.log(signChange);
    return this._authService.signChange(signChange);
  }

  @Post('signin')
  @ApiUnauthorizedResponse({
    description: 'Invalid Credentials (invalid_credentials)',
  })
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        accessToken: {
          type: 'string',
        },
        name: {
          type: 'string',
        },
        email: {
          type: 'string',
        },
      },
    },
  })
  async signIn(
    @Body() signin: SigninDto,
  ): Promise<{
    accessToken: string;
    name: string;
    email: string;
  }> {
    console.log('El usuario a autenticar es =>>>>>>>', signin);
    return this._authService.signIn(signin);
  }
}
