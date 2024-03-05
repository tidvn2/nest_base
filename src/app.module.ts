import { ApiModule } from '@apis/api.module';
import { LoggerMiddleware } from '@common';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AppController } from './app.controller';
import { ConfigModule } from './module/configs';

@Module({
  imports: [
    ConfigModule,
    // CronModule,
    // DatabaseModule,
    // JwtModule,
    EventEmitterModule.forRoot({
      maxListeners: 20,
    }),
    CqrsModule.forRoot(),
    ApiModule,
  ],
  controllers: [AppController],
  // providers
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
