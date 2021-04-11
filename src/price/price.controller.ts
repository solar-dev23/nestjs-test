import { Controller, Get, Query } from '@nestjs/common';
import { PriceService } from './price.service';
import { GetPriceDto } from './dto/get-price.dto'

@Controller('price')
export class PriceController {
  constructor(private readonly priceService: PriceService) {}

  @Get()
  getPrice(@Query() getPriceDto: GetPriceDto): object {
    return this.priceService.getPrice(getPriceDto.asset);
  }
}
