import { PartialType } from '@nestjs/mapped-types';
import { CreateTorzsAdatokDto } from './create-torzs-adatok.dto';

export class UpdateTorzsAdatokDto extends PartialType(CreateTorzsAdatokDto) {}
