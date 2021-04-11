import * as request from 'supertest';
import * as Chance from 'chance';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PriceModule } from './price.module';

describe('PriceController (e2e)', () => {
  let app: INestApplication;
  const chance = new Chance();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PriceModule]
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  it('should return price', () => {
    return request(app.getHttpServer())
      .get('/price?asset=BTC')
      .expect(200);
  });

  it('should throw error if asset param is empty', () => {
    return request(app.getHttpServer())
      .get('/price?asset=')
      .expect({
        status: 400,
        error: 'asset should be either BTC or ETH, not empty'
      });
  });

  it('should throw error if asset param is invalid', () => {
    return request(app.getHttpServer())
      .get(`/price?asset=${chance.word()}`)
      .expect({
        status: 400,
        error: 'This asset is not supported'
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
