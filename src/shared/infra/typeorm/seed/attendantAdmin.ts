import { hash } from "bcrypt";
import { v4 as uuidV4 } from "uuid";

import createConnection from "../index";

async function create() {
  const connection = await createConnection("localhost");

  const id = uuidV4();
  const password = await hash("admin", 8);

  await connection.query(
    `INSERT INTO ATTENDANTS(id, name, email, password, "role", created_at)
      values('${id}', 'admin', 'admin@atendente.com.br', '${password}', 'admin', 'now()')
    `
  );

  await connection.close;
}

create().then(() => console.log("Atendant admin created"));
