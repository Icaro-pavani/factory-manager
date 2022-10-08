import { CreateAssetParams } from "../schemas/assetSchemas.js";
import * as usersRepository from "../repositories/usersRepository.js";
import * as assetsRepository from "../repositories/assetsRepository.js";
import { conflictError } from "../middlewares/handleErrorsMiddleware.js";

export async function createAsset(
  assetInfo: CreateAssetParams,
  userId: string,
  unitId: string
) {
  const user = await usersRepository.findById(userId);

  const assetRegistered = await assetsRepository.findByNameAndUnitId(
    assetInfo.name,
    unitId
  );
  if (!!assetRegistered) throw conflictError("Name already in use!");

  await assetsRepository.createAsset({
    ...assetInfo,
    companyId: user.companyId,
    unitId,
  });
}

export async function getAllAssets(userId: string) {
  const user = await usersRepository.findById(userId);

  const assets = await assetsRepository.findAllByCompanyId(user.companyId);

  return assets;
}

export async function getAllUnitsAssets(unitId: string) {
  const assets = await assetsRepository.findAllByUnitId(unitId);

  return assets;
}
