import { UnitParams } from "../repositories/unitsRepository.js";
import * as usersRepository from "../repositories/usersRepository.js";
import * as unitsRepository from "../repositories/unitsRepository.js";
import {
  conflictError,
  notFoundError,
} from "../middlewares/handleErrorsMiddleware.js";

export async function createUnit(name: string, userId: string) {
  const user = await usersRepository.findById(userId);

  const unitRegistered = await unitsRepository.findByNameAndCompanyId(
    name,
    user.companyId
  );

  if (!!unitRegistered) throw conflictError("Name already in use!");

  const unitData = createUnitData(name, user.companyId);

  await unitsRepository.createUnit(unitData);
}

export async function updateUnit(name: string, unitId: string) {
  const unitRegistered = await unitsRepository.findById(unitId);

  if (!unitRegistered) throw notFoundError("Unit not found!");

  const unitData = createUnitData(name, unitRegistered.companyId);

  await unitsRepository.updateUnit(unitId, unitData);
}

export async function getAllUnits(userId: string) {
  const user = await usersRepository.findById(userId);

  const units = await unitsRepository.findAllByCompanyId(user.companyId);

  return units;
}

function createUnitData(name: string, companyId: string): UnitParams {
  return {
    name,
    companyId,
  };
}
