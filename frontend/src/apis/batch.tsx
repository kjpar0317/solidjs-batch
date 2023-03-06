import axiosUtils from "~/utils/axios-utils";

export async function getBatchList() {
  try {
    const res = await axiosUtils.post(`/api/jobInfo`);

    return res?.data;
  } catch {}
}
