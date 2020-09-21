export class ConfigService {
  private readonly environmentConfig: { [key: string]: string };

  constructor() {
    const isDevelopment = process.env.NODE_ENV != 'production';
  }
}
