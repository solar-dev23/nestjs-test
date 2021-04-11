import { Module, HttpModule } from '@nestjs/common';
import { PriceService } from './price.service';
import { PriceController } from './price.controller';

@Module({
  imports: [
    HttpModule.register({
      baseURL: 'https://api.coingecko.com/api/v3/coins'
    }),
  ],
  providers: [PriceService],
  controllers: [PriceController]
})
export class PriceModule {}
