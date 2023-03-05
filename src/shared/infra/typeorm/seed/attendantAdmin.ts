import { hash } from "bcrypt";
import { v4 as uuidV4 } from "uuid";

import createConnection from "../index";

async function create() {
  const connection = await createConnection("database");

  const id = uuidV4();
  const password = await hash("admin", 8);

  await connection.query(
    ` INSERT INTO ATTENDANTS(id, name, email, password, "role", created_at)
      VALUES('${id}', 'admin', 'admin@atendente.com.br', '${password}', 'admin', 'now()')
      On CONFLICT(email) DO NOTHING;
    `
  );

  await connection.close;
}

create().then(() => console.log("Atendant admin created"));
