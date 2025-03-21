import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { sendBadRequest } from 'src/shared/utils/response.utils';

@Injectable()
export class LeetcodeService {
    constructor(
        @Inject('PLATFORM_INTEGRATION_SERVICE') private readonly leetcodeClient: ClientProxy
    ) {
    }

    async addProblemsLeetcode() {

        try {

            const response = await firstValueFrom(
                this.leetcodeClient.send({ cmd: 'leetcode.add-problems' }, {})
            );

            if(response?.err) {
                return sendBadRequest(response.message);
            }

            return response;
            
        } catch (error) {
            return sendBadRequest(error.message);
        }
        
    }
}
