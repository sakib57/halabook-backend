import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module, Global } from '@nestjs/common';
import { EmailService } from './email.service';
import { join } from 'path';

const port = parseInt(process.env.EMAIL_PORT);
@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          host: process.env.EMAIL_HOST,
          port: port,
          secure: false,
          requireTLS: true,
          auth: {
            user: process.env.EMAIL_AUTH_USER,
            pass: process.env.EMAIL_AUTH_PASSWORD,
          },
        },
        defaults: {
          from: `No Reply <${process.env.EMAIL_AUTH_USER}>`,
        },
        template: {
          dir: join(__dirname, 'templates'),
          // dir: process.cwd() + '/templates/',
          adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  providers: [EmailService],
  exports: [EmailService], // 👈 export for DI
})
export class EmailModule {}
