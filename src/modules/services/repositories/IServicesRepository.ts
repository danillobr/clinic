import { ICreateServiceDTO } from "../dtos/ICreateServiceDTO";
import { Service } from "../infra/typeorm/entities/Service";

interface IServicesRepository {
  create(data: ICreateServiceDTO): Promise<Service>;
  findByName(name: string): Promise<Service>;
  list(): Promise<Service[]>;
  sumTotalAmount(list_ids: string[]): Promise<number>;
}

export { IServicesRepository };
