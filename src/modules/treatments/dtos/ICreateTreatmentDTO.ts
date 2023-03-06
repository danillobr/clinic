import { Attendant } from "@modules/attendants/infra/typeorm/entities/Attendant";
import { Client } from "@modules/clients/infra/typeorm/entities/Client";
import { Professional } from "@modules/professional/infra/typeorm/entities/Professional";
import { Service } from "@modules/services/infra/typeorm/entities/Service";

interface ICreateTreatmentDTO {
  total_amount: number;
  total_commission: number;
  total_time_services: number;
  begin_time?: Date;
  end_time?: Date;
  client: Client;
  professional: Professional;
  services?: Service[];
  id?: string;
}

export { ICreateTreatmentDTO };
