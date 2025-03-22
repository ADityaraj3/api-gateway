import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { HackerrankService } from './hackerrank.service';
import { UserAuthGuard } from 'src/shared/guards/auth.guard';
import { HasAccessGuard } from 'src/shared/guards/has-access.guard';
import { Permissions } from 'src/shared/decorators/set-permissions.decorator';

@Controller('hackerank')
@UseGuards(UserAuthGuard)
export class HackerrankController {
    constructor(private readonly hackerrankService: HackerrankService) {}

    @Permissions('problems.create')
    @UseGuards(HasAccessGuard)
    @Post('add-problems-to-db')
    async addProblems() {
        return this.hackerrankService.addProblems();
    }
}
