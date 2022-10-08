import { CreateAssetParams } from "../schemas/assetSchemas.js";
import * as usersRepository from "../repositories/usersRepository.js";
import * as assetsRepository from "../repositories/assetsRepository.js";
import {
  conflictError,
  notFoundError,
} from "../middlewares/handleErrorsMiddleware.js";

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

export async function updateAssetById(
  assetId: string,
  assetInfo: CreateAssetParams
) {
  const asset = await assetsRepository.findById(assetId);

  if (!asset) throw notFoundError("Asset not found!");

  const { companyId, unitId } = asset;
  await assetsRepository.updateAsset(assetId, {
    ...assetInfo,
    companyId,
    unitId,
  });
}

export async function deleteAsset(assetId: string, userId: string) {
  const user = await usersRepository.findById(userId);
  const asset = await assetsRepository.findById(assetId);

  if (!asset) throw notFoundError("Asset not found!");

  if (user.companyId !== asset.companyId) {
    throw conflictError("This asset doesn't belong to your company!");
  }

  await assetsRepository.remove(assetId);
}
