import { INestApplication, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { paginationHelper } from './common';

export function useSwagger(app: INestApplication) {
  const logger = new Logger('Swagger');
  const port = process.env.PORT || 3000;
  const path = 'docs';
  const title = 'NestJS Boilerplate';

  const config = new DocumentBuilder()
    .setTitle(title)
    .setDescription('description')
    .setVersion('0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [paginationHelper],
  });
  SwaggerModule.setup(path, app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: 'alpha',
      operationsSorter: (a, b) => {
        const methodsOrder = [
          'get',
          'post',
          'put',
          'patch',
          'delete',
          'options',
          'trace',
        ];
        let result =
          methodsOrder.indexOf(a.get('method')) -
          methodsOrder.indexOf(b.get('method'));

        if (result === 0) {
          result = a.get('path').localeCompare(b.get('path'));
        }

        return result;
      },
    },
  });
  logger.log(
    `Your documentation is running on http://localhost:${port}/${path}`,
  );
}
