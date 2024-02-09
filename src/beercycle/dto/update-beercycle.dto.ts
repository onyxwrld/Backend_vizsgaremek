import { PartialType } from '@nestjs/mapped-types';
import { CreateBeercycleDto } from './create-beercycle.dto';

export class UpdateBeercycleDto extends PartialType(CreateBeercycleDto) {}
