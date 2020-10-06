import {
  Body,
  Controller,
  HttpCode,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { SignChangeDto, SigninDto, SignupDto } from './dtos';
import { AuthService } from './auth.service';
import {
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { PinConfirmationDto } from './dtos/pin-confirmation.dto';
import { AuthConfirmedDto } from './dtos/auth-confirmed.dto';
import { AuthResendCodeDto } from './dtos/auth-resend-code.dto';
import { SigninResponseDto } from './dtos/signin-response.dto';

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
  async signIn(@Body() signin: SigninDto): Promise<SigninResponseDto> {
    console.log('El usuario a autenticar es =>>>>>>>', signin);
    return this._authService.signIn(signin);
  }

  @Post('confirm')
  @HttpCode(200)
  @ApiOkResponse({ description: 'It happens when PINs matched' })
  @ApiConflictResponse({ description: 'It happens when PINs does not match' })
  @UseGuards(AuthGuard('jwt'))
  confirm(@Body() pin: PinConfirmationDto): Promise<AuthConfirmedDto> {
    return this._authService.confirm(pin);
  }

  @Post('confirm/resend')
  @HttpCode(200)
  @ApiOkResponse({ description: 'It happens when the pin was re-sent' })
  @ApiInternalServerErrorResponse({
    description: 'It happens when any user is matched with the' + ' email sent',
  })
  @UseGuards(AuthGuard('jwt'))
  resendPin(@Body() email: AuthResendCodeDto): Promise<boolean> {
    return this._authService.resendPin(email);
  }
}
