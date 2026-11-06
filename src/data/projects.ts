/**
 * 项目页数据源（纯内容）。
 * 页面展示与筛选规则由 src/config/projectsConfig.ts 控制。
 */
import type { ProjectItem } from "@/types/projectsConfig";

export const projectsData: ProjectItem[] = [
	{
		key: "placeholder-project",
		title: "示例项目（占位）",
		summary: "把这里换成你的项目简介：做了什么、用了哪些技术、解决了什么问题。",
		category: "theme",
		phase: "building",
		technologies: ["TODO"],
		icon: "material-symbols:code-rounded",
		featured: true,
		repository: "https://github.com/xushen666",
		year: "2026",
	},
];
