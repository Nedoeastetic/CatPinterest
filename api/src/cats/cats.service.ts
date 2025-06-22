import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like } from './like.entity';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Like)
    private likesRepository: Repository<Like>,
  ) {}

  async getLikes(): Promise<Like[]> {
    return this.likesRepository.find();
  }

  async addLike(like: Like): Promise<Like> {
    return this.likesRepository.save(like);
  }

  async removeLike(catId: string): Promise<void> {
    await this.likesRepository.delete({ cat_id: catId });
  }
}