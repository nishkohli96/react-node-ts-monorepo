import { Test, TestingModule } from '@nestjs/testing';
import { HomeController } from './home.controller';
import { HomeService } from './home.service';

describe('HomeController', () => {
	let homeController: HomeController;

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			controllers: [HomeController],
			providers: [HomeService],
		}).compile();

		homeController = app.get<HomeController>(HomeController);
	});

	describe('root', () => {
		it('should return "Hello World!"', () => {
			expect(homeController.getHello()).toBe('Hello World!');
		});
	});
});
