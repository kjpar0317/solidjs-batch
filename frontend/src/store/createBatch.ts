import { createResource } from "solid-js";
import { getBatchList, saveJobInfo, deleteJobInfo } from "~/apis";

export default function createBatch(state: any, setState: any, actions: any) {
    const [batchList, { mutate: batchMutate, refetch: batchRefetch }] = createResource(state.auth.isLogined, getBatchList);
    
    Object.assign(actions, {
        batchMutate,
        batchRefetch,
        async saveBatch(jobInfo: JobInfo) {
            await saveJobInfo(jobInfo);
        },
        async deleteBatch(jobInfo: JobInfo) {
            await deleteJobInfo(jobInfo);
        }
    });

    return { batchList };
};
