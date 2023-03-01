package com.kjpar0317.batch.job.partitoner;

import java.util.HashMap;
import java.util.Map;

import org.springframework.batch.core.partition.support.Partitioner;
import org.springframework.batch.item.ExecutionContext;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class TbCodeExplanationPartitoner implements Partitioner {
	private final Long min;
	private final Long max;
	
	@Override
    public Map<String, ExecutionContext> partition(int gridSize) {
        long targetSize = (max - min) / gridSize + 1;

        Map<String, ExecutionContext> result = new HashMap<>();
        long number = 0;
        long start = this.min;
        long end = start + targetSize - 1;

        while (start <= this.max) {
            ExecutionContext value = new ExecutionContext();
            result.put("partition" + number, value);

            if (end >= this.max) {
                end = this.max;
            }

            value.putLong("minId", start); // 각 파티션마다 사용될 minId
            value.putLong("maxId", end); // 각 파티션마다 사용될 maxId
            start += targetSize;
            end += targetSize;
            number++;
        }

        return result;
    }
}
