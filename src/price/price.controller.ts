import { Controller, Get, Query } from '@nestjs/common';
import { PriceService } from './price.service';

@Controller('price')
export class PriceController {
  constructor(private readonly priceService: PriceService) {}

  @Get()
  getPrice(@Query('asset') asset: string): object {
    return this.priceService.getPrice(asset);
  }
}
