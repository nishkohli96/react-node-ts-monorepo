import { Module } from '@nestjs/common';
import { HomeModule } from './routes';

@Module({
  imports: [HomeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
