import { Controller, Get, Query } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Controller('cats')
export class CatsController {
  constructor(private readonly httpService: HttpService) {}

  @Get()
  async getCats(
    @Query('limit') limit = '10',
    @Query('page') page = '0',
    @Query('breed') breed = ''
  ) {
    const params = {
      limit,
      page,
      has_breeds: '1',
      ...(breed && { breed_ids: breed })
    };

    const { data } = await firstValueFrom(
      this.httpService.get('https://api.thecatapi.com/v1/images/search', {
        params,
        headers: {
          'x-api-key': 'live_538GRDyb65dknRIrL8diFc4pyrQPyYC601eiXEla9OVnQxbPa3fjJ9EcH0WBPWdj'
        }
      })
    );

    return data;
  }
}