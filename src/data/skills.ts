/**
 * 技能页数据源（纯内容）。
 * 页面展示与筛选规则由 src/config/skillsConfig.ts 控制。
 */
import type { SkillItem } from "@/types/skillsConfig";

export const skillsData: SkillItem[] = [
	{
		name: "Python",
		description: "算法练习、自动化脚本与 Agent 应用开发。",
		icon: "simple-icons:python",
		category: "language",
		level: "intermediate",
	},
	{
		name: "Java",
		description: "面向对象编程、数据结构课程设计与后端开发学习。",
		icon: "simple-icons:openjdk",
		category: "language",
		level: "intermediate",
	},
	{
		name: "C++",
		description: "程序设计、数据结构与算法练习。",
		icon: "simple-icons:cplusplus",
		category: "language",
		level: "beginner",
	},
	{
		name: "Spring Boot",
		description: "Java Web 应用与接口开发的基础实践。",
		icon: "simple-icons:springboot",
		category: "backend",
		level: "beginner",
	},
	{
		name: "FastAPI",
		description: "为 LLM 应用提供轻量的 Python 服务端接口。",
		icon: "simple-icons:fastapi",
		category: "backend",
		level: "beginner",
	},
	{
		name: "MySQL",
		description: "关系型数据建模、查询与应用数据存储。",
		icon: "simple-icons:mysql",
		category: "data",
		level: "beginner",
	},
	{
		name: "LangChain",
		description: "大语言模型应用与 Agent 工作流的学习实践。",
		icon: "simple-icons:langchain",
		category: "ai",
		level: "beginner",
	},
	{
		name: "PyTorch",
		description: "机器学习与深度学习基础实践、模型训练与评测。",
		icon: "simple-icons:pytorch",
		category: "ai",
		level: "beginner",
	},
	{
		name: "Git",
		description: "版本管理与代码协作。",
		icon: "simple-icons:git",
		category: "tooling",
		level: "intermediate",
	},
	{
		name: "Linux",
		description: "开发环境、命令行与服务部署的基础使用。",
		icon: "simple-icons:linux",
		category: "tooling",
		level: "beginner",
	},
	{
		name: "Docker",
		description: "统一开发环境与应用容器化的入门实践。",
		icon: "simple-icons:docker",
		category: "tooling",
		level: "beginner",
	},
];

/** 获取所有技能数据列表 */
export function getSkillsList(): SkillItem[] {
	return skillsData;
}
