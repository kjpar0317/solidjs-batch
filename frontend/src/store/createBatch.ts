import { createResource, createSignal } from "solid-js";
import { getBatchList, saveJobInfo, deleteJobInfo } from "~/apis";

export default function createBatch(state: any, setState: any, actions: any) {
    const [initBatch, setInitBatch] = createSignal<boolean>(false);
    const [batchList, { mutate: batchMutate, refetch: batchRefetch }] = createResource(initBatch, getBatchList);
    
    Object.assign(actions, {
        setInitBatch,
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
