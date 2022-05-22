import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HomeModule } from './app/home/home.module';

@Module({
	imports: [
		HomeModule,
		ConfigModule.forRoot({
			cache: true,
		}),
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
