import { HttpModule } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PriceService } from './price.service';

describe('PriceService', () => {
  let service: PriceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        HttpModule.register({
          baseURL: 'https://api.coingecko.com/api/v3/coins'
        }),
      ],
      providers: [PriceService],
    }).compile();

    service = module.get<PriceService>(PriceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getPrice', () => {
    it('should get price', async () => {
      await service.getPrice('BTC').subscribe(response => {
        expect(response.assetId).toEqual('BTC');
        expect(typeof response.value).toBe('number');
      });
    });  
  });
});
