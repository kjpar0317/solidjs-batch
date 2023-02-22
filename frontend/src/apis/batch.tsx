import axiosUtils from "~/utils/axios-utils";

export async function getBatchList() {
  //   try {
  const res = await axiosUtils.get(`/api/batch`);

  return res?.data;
  //   } catch {}
}
