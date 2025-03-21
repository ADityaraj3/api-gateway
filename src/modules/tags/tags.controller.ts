import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { TagsService } from './tags.service';
import { AddTagDTO } from './dto/add-tags-dto';
import { UserAuthGuard } from 'src/shared/guards/auth.guard';

@Controller('tags')
@UseGuards(UserAuthGuard)
export class TagsController {
    constructor(
        private readonly tagsService: TagsService
    ) {

    }

    @Post('add')
    async addTags(@Body() body: AddTagDTO) {
        return this.tagsService.addTags(body);
    }
}
