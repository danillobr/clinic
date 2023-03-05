import { v4 as uuidV4 } from "uuid";
import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
  JoinTable,
  ManyToMany,
} from "typeorm";
import { Client } from "@modules/clients/infra/typeorm/entities/Client";
import { Attendant } from "./Attendant";
import { Professional } from "@modules/professional/infra/typeorm/entities/Professional";
import { Service } from "@modules/services/infra/typeorm/entities/Service";

@Entity("treatments")
class treatment {
  @PrimaryColumn()
  id: string;

  @OneToOne(() => Client)
  @JoinColumn({ name: "client_id" })
  client: Client;

  @OneToOne(() => Attendant)
  @JoinColumn({ name: "attendant_id" })
  attendant: Attendant;

  @OneToOne(() => Professional)
  @JoinColumn({ name: "professional_id" })
  professional: Professional;

  @ManyToMany(() => Service)
  @JoinTable({
    name: "services_treatments",
    joinColumns: [{ name: "treatment_id" }],
    inverseJoinColumns: [{ name: "service_id" }],
  })
  services: Service[];

  @Column()
  totalAmount: number;

  @Column()
  totalCommission: number;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { treatment };
