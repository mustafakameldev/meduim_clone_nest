import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateTagDto } from '@app/tag/dtos/create-tag.dto';
import { TagService } from './tag.service';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  // @Post()
  // createTag(@Body() body: CreateTagDto) {
  //   console.log(body);
  // }
  @Get()
  findAll(): string[] {
    return this.tagService.findAll();
  }
}
