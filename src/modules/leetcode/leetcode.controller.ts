import { Controller, Post, UseGuards } from '@nestjs/common';
import { LeetcodeService } from './leetcode.service';
import { UserAuthGuard } from 'src/shared/guards/auth.guard';
import { Permissions } from 'src/shared/decorators/set-permissions.decorator';
import { HasAccessGuard } from 'src/shared/guards/has-access.guard';

@Controller('leetcode')
@UseGuards(UserAuthGuard)
export class LeetcodeController {
    constructor(
        private readonly leetcodeService: LeetcodeService
    ) {
    }

    @Permissions('problems.create')
    @UseGuards(HasAccessGuard)
    @Post('add-problems-to-db')
    async addProblems() {
        return this.leetcodeService.addProblemsLeetcode();
    }
}
