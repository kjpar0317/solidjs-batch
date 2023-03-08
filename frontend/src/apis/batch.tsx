import axiosUtils from "~/utils/axios-utils";

export async function getBatchList() {
  try {
    const res = await axiosUtils.post(`/api/jobInfo`);

    return res?.data;
  } catch {}
}

export async function saveJobInfo(jobInfo: JobInfo) {
  try {
    const res = await axiosUtils.put(`/api/jobInfo`, jobInfo);

    return res?.data;
  } catch {}
}

export async function deleteJobInfo(jobInfo: JobInfo) {
  try {
    const res = await axiosUtils.delete(`/api/jobInfo`, { data: jobInfo });

    return res?.data;
  } catch {}
}
