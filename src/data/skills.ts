/**
 * 技能页数据源（纯内容）。
 * 页面展示与筛选规则由 src/config/skillsConfig.ts 控制。
 */
import type { SkillItem } from "@/types/skillsConfig";

export const skillsData: SkillItem[] = [
	{
		name: "技能名称（占位）",
		description: "一句话说明你在这个技能上做过什么、到什么程度。",
		icon: "material-symbols:code-rounded",
		category: "frontend",
		level: "beginner",
	},
];
