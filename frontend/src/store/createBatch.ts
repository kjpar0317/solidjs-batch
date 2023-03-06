import { createResource } from "solid-js";
import { getBatchList } from "~/apis";

export default function createBatch(state: any, setState: any, actions: any) {
    const [batchList, { mutate: batchMutate, refetch: batchRefetch }] = createResource(state.auth.isLogined, getBatchList);
    
    Object.assign(actions, {
        batchMutate,
        batchRefetch
    });

    return { batchList };
};
