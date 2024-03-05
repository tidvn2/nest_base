import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport } from 'nodemailer';
import { IMailService } from './mail.interface';
import { MailService } from './mail.service';

@Global()
@Module({
	providers: [
		{
			provide: IMailService,
			useClass: MailService
		},
		{
			provide: "mail",
			inject: [ConfigService],
			useFactory(configService: ConfigService) {
				return createTransport({
					host: configService.get<string>('MAIL_HOST'),
					from: configService.get<string>('MAIL_FROM'),
					port: configService.get<number>('MAIL_PORT'),
					secure: configService.get<boolean>('MAIL_SECURE'),
					auth: {
						user: configService.get<string>('MAIL_USER'),
						pass: configService.get<string>('MAIL_PASS')
					}
				});
			}
		}
	],
	exports: [IMailService]
})
export class MailModule {}
