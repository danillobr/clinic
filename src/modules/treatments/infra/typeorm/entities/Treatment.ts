import { v4 as uuidV4 } from "uuid";
import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  JoinColumn,
  OneToOne,
  JoinTable,
  ManyToMany,
} from "typeorm";
import { Client } from "@modules/clients/infra/typeorm/entities/Client";

import { Professional } from "@modules/professional/infra/typeorm/entities/Professional";
import { Service } from "@modules/services/infra/typeorm/entities/Service";
import { Attendant } from "@modules/attendants/infra/typeorm/entities/Attendant";

@Entity("treatments")
class Treatment {
  @PrimaryColumn()
  id: string;

  @Column()
  total_amount: number;

  @Column()
  total_commission: number;

  @CreateDateColumn()
  created_at: Date;

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

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Treatment };
