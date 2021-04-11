import { Injectable, HttpService } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class PriceService {
  constructor(private readonly httpService: HttpService) {}

  getPrice(asset: string): Observable<AxiosResponse<number>> {
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
          const price = response.data.market_data.current_price.usd;
          return price;
        })
      );
  }
}
