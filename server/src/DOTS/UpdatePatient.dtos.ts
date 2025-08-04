import { PartialType } from '@nestjs/mapped-types';
import { CreatePatientDto } from './Patient.dtos';

export class UpdatePatientDto extends PartialType(CreatePatientDto) {}
