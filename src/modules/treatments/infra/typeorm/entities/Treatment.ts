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

import { Client } from "../../../../clients/infra/typeorm/entities/Client";
import { Professional } from "../../../../professional/infra/typeorm/entities/Professional";
import { Service } from "../../../../services/infra/typeorm/entities/Service";

@Entity("treatments")
class Treatment {
  @PrimaryColumn()
  id: string;

  @Column()
  total_time_services: number;

  @Column()
  total_amount: number;

  @Column()
  total_commission: number;

  @CreateDateColumn()
  created_at: Date;

  @OneToOne(() => Client)
  @JoinColumn({ name: "client_id" })
  client: Client;

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

  @CreateDateColumn()
  begin_time: Date;

  @CreateDateColumn()
  end_time: Date;

  applied_time: number;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Treatment };
