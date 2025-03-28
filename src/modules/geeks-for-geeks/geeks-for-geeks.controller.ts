import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { GeeksForGeeksService } from './geeks-for-geeks.service';
import { HasAccessGuard } from 'src/shared/guards/has-access.guard';
import { Permissions } from 'src/shared/decorators/set-permissions.decorator';
import { UserAuthGuard } from 'src/shared/guards/auth.guard';
import { UserId } from 'src/shared/decorators/user-id.decorator';

@Controller('geeks-for-geeks')
@UseGuards(UserAuthGuard)
export class GeeksForGeeksController {
  constructor(private readonly geeksForGeeksService: GeeksForGeeksService) {}

  @Permissions('problems.create')
  @UseGuards(HasAccessGuard)
  @Post('add-problems-to-db')
  addProblems() {
    return this.geeksForGeeksService.addProblems();
  }

  @Post('add-user-questions-data-to-db')
  addQuestionDataToDb(@UserId() userId: string) {
    return this.geeksForGeeksService.addQuestionDataToDb(userId);
  }
}
