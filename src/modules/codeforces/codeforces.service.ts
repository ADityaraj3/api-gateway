import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { sendBadRequest } from 'src/shared/utils/response.utils';

@Injectable()
export class CodeforcesService {
    constructor(
        @Inject('PLATFORM_INTEGRATION_SERVICE') private readonly codeforcesClient: ClientProxy
    ) { }

    async addProblems() {
        try {
            const response = await firstValueFrom(
                this.codeforcesClient.send({ cmd: 'codeforces.add-problems' }, {})
            );

            if (response?.err) {
               return sendBadRequest(response.message);
            }

            return response;
            
        } catch (error) {
            return sendBadRequest(error.message);
        }
    }
}
