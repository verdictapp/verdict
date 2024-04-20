/**
 * use to get conditional pagination.
 *
 * Note: you should spread the returned object!
 * @param take any value (can be casted to Number)
 * @param skip any value (can be casted to Number)
 * @returns object containing given parameters (must be spread before use)
 */
export default function getPagination(take?: any, skip?: any) {
  let pagination = {};
  if (take) {
    pagination["take"] = Number(take);
  }
  if (skip) {
    pagination["skip"] = Number(skip);
  }
  return pagination;
}
