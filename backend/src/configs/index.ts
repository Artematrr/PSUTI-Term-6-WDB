import { sequelize, authDB, syncDB } from '@configs/db';
import { seedDB } from '@configs/seedDb';
import { specs, swaggerUi } from '@configs/swagger';
import { passport } from '@configs/passport';

export { sequelize, authDB, syncDB, seedDB, specs, swaggerUi, passport };
