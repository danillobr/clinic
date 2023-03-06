import { Attendant } from "@modules/attendants/infra/typeorm/entities/Attendant";
import { Client } from "@modules/clients/infra/typeorm/entities/Client";
import { Professional } from "@modules/professional/infra/typeorm/entities/Professional";
import { Service } from "@modules/services/infra/typeorm/entities/Service";

interface ICreateTreatmentDTO {
  total_amount: number;
  total_commission: number;
  total_time_services: number;
  client: Client;
  attendant: Attendant;
  professional: Professional;
  services?: Service[];
  id?: string;
}

export { ICreateTreatmentDTO };
