import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { sendBadRequest } from 'src/shared/utils/response.utils';

@Injectable()
export class GeeksForGeeksService {

  constructor(
    @Inject('PLATFORM_INTEGRATION_SERVICE') private readonly geeksForGeeksClient: ClientProxy,
    @Inject('DATA_AGGREGATION_SERVICE') private readonly dataAggregationClient: ClientProxy,
  ) { }

  async addProblems() {

    try {
      const response = await firstValueFrom(
        this.geeksForGeeksClient.send({ cmd: 'geeks-for-geeks.add-problems' }, {})
      );

      if (response?.err) {
        return sendBadRequest(response.message);
      }

      return response;

    }
    catch (error) {
      return sendBadRequest(error.message);
    }

  }

  async addQuestionDataToDb(userId: string) {
    try {

      const response = await firstValueFrom(
        this.dataAggregationClient.send({ cmd: 'geeks-for-geeks.add-user-questions-data-to-db' }, { userId })
      );

      if (response?.err) {
        return sendBadRequest(response.message);
      }

      return response;

    }
    catch (error) {
      return sendBadRequest(error.message);
    }

  }
}
