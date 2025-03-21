import { Inject, Injectable } from '@nestjs/common';
import { AddTagDTO } from './dto/add-tags-dto';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { sendBadRequest } from 'src/shared/utils/response.utils';

@Injectable()
export class TagsService {
    constructor(
        @Inject('PLATFORM_INTEGRATION_SERVICE') private readonly tagsClient: ClientProxy
    ) {

    }

    async addTags(body: AddTagDTO) {

        try {
            
            const response = await firstValueFrom(
                this.tagsClient.send({ cmd: 'tags.add-tags' }, body)
            )

            if (response?.err) {
                return sendBadRequest(response.message);
            }

            return response;

        } catch (error) {
            return sendBadRequest(error.message);
        }

    }
}
