import { Injectable, HttpService } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Price } from './interfaces/price.interface'

@Injectable()
export class PriceService {
  constructor(private readonly httpService: HttpService) {}

  getPrice(asset: string): Observable<Price> {
    let coin;
    switch (asset) {
      case 'BTC':
        coin = 'bitcoin';
        break;
      case 'ETH':
        coin = 'ethereum';
        break;
      default:
        break;
    }

    return this.httpService.get(`/${coin}`)
      .pipe(
        map(response => {
          const data = {
            assetId: asset,
            value: response.data.market_data.current_price.usd
          }
          return data
        })
      );
  }
}
