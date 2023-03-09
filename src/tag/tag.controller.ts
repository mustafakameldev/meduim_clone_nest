import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateTagDto } from '@app/tag/dtos/create-tag.dto';
import { TagService } from './tag.service';
import { TagEntity } from './tag.entity';
import { ApiTags } from '@nestjs/swagger';

@Controller('tag')
@ApiTags('Tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  // @Post()
  // createTag(@Body() body: CreateTagDto) {
  //   console.log(body);
  // }
  @Get()
  async findAll(): Promise<{ tags: string[] }> {
    const tags = await this.tagService.findAll();
    return {
      tags: tags.map((tag) => tag.name),
    };
  }
}
