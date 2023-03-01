CREATE TABLE `job_info` (
	`job_id` VARCHAR(50) NOT NULL COLLATE 'utf8mb3_general_ci',
	`job_name` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb3_general_ci',
	`job_desc` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8mb3_general_ci',
	`job_stats` VARCHAR(150) NULL DEFAULT NULL COLLATE 'utf8mb3_general_ci',
	`job_cron_expression` VARCHAR(100) NULL DEFAULT NULL COLLATE 'utf8mb3_general_ci',
	`job_params` VARCHAR(2000) NULL DEFAULT NULL COLLATE 'utf8mb3_general_ci',
	`error_skip_yn` VARCHAR(1) NOT NULL DEFAULT 'N' COLLATE 'utf8mb3_general_ci',
	`use_yn` VARCHAR(1) NOT NULL DEFAULT 'Y' COLLATE 'utf8mb3_general_ci',
	`created_id` VARCHAR(20) NOT NULL COLLATE 'utf8mb3_general_ci',
	`created_time` DATETIME NOT NULL DEFAULT current_timestamp(),
	`modified_id` VARCHAR(20) NULL DEFAULT NULL COLLATE 'utf8mb3_general_ci',
	`modified_time` DATETIME NULL DEFAULT NULL,
	PRIMARY KEY (`job_id`) USING BTREE
)
COLLATE='utf8mb3_general_ci'
ENGINE=InnoDB
;