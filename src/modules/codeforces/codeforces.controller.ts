import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CodeforcesService } from './codeforces.service';
import { UserAuthGuard } from 'src/shared/guards/auth.guard';
import { HasAccessGuard } from 'src/shared/guards/has-access.guard';
import { Permissions } from 'src/shared/decorators/set-permissions.decorator';

@Controller('codeforces')
@UseGuards(UserAuthGuard)
export class CodeforcesController {
    constructor(
        private readonly codeforcesService: CodeforcesService
    ) {}

    @Permissions('problems.create')
    @UseGuards(HasAccessGuard)
    @Post('add-problems-to-db')
    async addProblems() {
        return this.codeforcesService.addProblems();
    }
}
