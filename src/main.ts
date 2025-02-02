import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      secret: 'super-secret-key',
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());
  const PORT = process.env.PORT || 3000;
  const ENV = process.env.NODE_ENV;
  await app.listen(PORT, () => {
    console.log(`[SERVER] Running on PORT ${PORT} in ${ENV} mode`);
  });
}
bootstrap();
