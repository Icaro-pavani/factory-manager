import { UnitParams } from "../repositories/unitsRepository.js";
import * as usersRepository from "../repositories/usersRepository.js";
import * as unitsRepository from "../repositories/unitsRepository.js";
import { conflictError } from "../middlewares/handleErrorsMiddleware.js";

export async function createUnit(name: string, userId: string) {
  const user = await usersRepository.findById(userId);

  const unitRegistered = await unitsRepository.findByNameAndCompanyId(
    name,
    user.companyId
  );

  if (!!unitRegistered) throw conflictError("Name already in use!");

  const unitData: UnitParams = {
    name,
    companyId: user.companyId,
  };

  await unitsRepository.createUnit(unitData);
}
