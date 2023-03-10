interface AuthProps {
    id: string;
    password: string;
}

interface JobInfo {
    jobId?: string;
    jobName?: string;
    jobDesc?: string;
    jobStats?: string;
    jobCronExpression?: string;
    jobParams?: string;
    errorSkipYn?: string;
    useYn?: string;
}