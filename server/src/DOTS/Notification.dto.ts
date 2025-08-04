import { IsString, IsDateString, IsEnum, IsOptional } from 'class-validator';

export class AppointmentDto {
  @IsString()
  patientId: string;

  @IsString()
  doctorId: string;

  @IsDateString()
  appointmentDate: string;

  @IsOptional()
  @IsString()
  reason?: string;

  // ✅ Appointment Status (pending/confirmed/completed/cancelled)
  @IsOptional()
  @IsEnum(['pending', 'confirmed', 'completed', 'cancelled'])
  status?: 'pending' | 'confirmed' | 'completed' | 'cancelled';

  // ✅ Payment Status (unpaid/paid)
  @IsOptional()
  @IsEnum(['unpaid', 'paid'])
  paymentStatus?: 'unpaid' | 'paid';

  // ✅ Mode of appointment (in-person/online) - optional but useful
  @IsOptional()
  @IsEnum(['online', 'in-person'])
  mode?: 'online' | 'in-person';

  // ✅ Optional - Payment ID or reference if online payment used
  @IsOptional()
  @IsString()
  paymentReference?: string;
}
