import { Controller, Get, Query, HttpException, HttpStatus } from '@nestjs/common';
import { PriceService } from './price.service';
import { GetPriceDto } from './dto/get-price.dto'

@Controller('price')
export class PriceController {
  constructor(private readonly priceService: PriceService) {}

  @Get()
  getPrice(@Query() getPriceDto: GetPriceDto): object {
    if (!getPriceDto.asset || getPriceDto.asset === '') {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'asset should be either BTC or ETH, not empty',
      }, HttpStatus.BAD_REQUEST);
    }

    if (getPriceDto.asset !== 'BTC' && getPriceDto.asset !== 'ETH') {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'This asset is not supported',
      }, HttpStatus.BAD_REQUEST);
    }
    
    return this.priceService.getPrice(getPriceDto.asset);
  }
}
