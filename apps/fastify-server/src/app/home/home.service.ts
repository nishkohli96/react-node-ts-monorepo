import { Injectable } from '@nestjs/common';

@Injectable()
export class HomeService {
	getHello(): string {
		const { ENV_VAR } = process.env;
		return `Hello World, ${ENV_VAR} `;
	}
}
