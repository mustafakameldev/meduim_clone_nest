import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateCommentDto } from './dtos/crearte-comment.dto';
import { UserDecorator } from '@app/user/decorators/user.decorrator';
import { AuthGuard } from '@app/user/guards/user.guard';
import { CommentService } from './comment.service';

@Controller('comments')
export class CommentController {
  constructor(private commentService: CommentService) {}
  @Post('/:id')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async createComment(
    @Body() body: CreateCommentDto,
    @UserDecorator('id') userId: number,
    @Param('id') articleId: string,
  ) {
    return await this.commentService.createComment(
      parseInt(articleId),
      userId,
      body,
    );
  }
  @Get('/:id')
  async getArticleComments(@Param('id') id: string) {
    return await this.commentService.getArticleComments(parseInt(id));
  }
}
