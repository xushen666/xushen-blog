/**
 * 技能页数据源（纯内容）。
 * 页面展示与筛选规则由 config/skills.yaml 覆盖的主题配置控制。
 */
import type { SkillItem } from "@/types/skillsConfig";

export const skillsData: SkillItem[] = [
	{
		name: "Python",
		description: "课程作业、数据处理与后端服务的主力语言。",
		icon: "simple-icons:python",
		category: "language",
		level: "advanced",
	},
	{
		name: "Java",
		description: "数据结构课程设计与面向对象练习。",
		icon: "simple-icons:openjdk",
		category: "language",
		level: "advanced",
	},
	{
		name: "C++",
		description: "算法题与基础语法练习。",
		icon: "simple-icons:cplusplus",
		category: "language",
		level: "intermediate",
	},
	{
		name: "Spring Boot",
		description: "课程项目中的 REST 接口与分层结构练习。",
		icon: "simple-icons:springboot",
		category: "backend",
		level: "intermediate",
	},
	{
		name: "FastAPI",
		description: "为 Agent 应用提供流式接口与工具调用入口。",
		icon: "simple-icons:fastapi",
		category: "backend",
		level: "intermediate",
	},
	{
		name: "MySQL",
		description: "建表、索引与课程项目中的 CRUD 实践。",
		icon: "simple-icons:mysql",
		category: "data",
		level: "intermediate",
	},
	{
		name: "LangChain",
		description: "单 Agent 编排、RAG 检索链与工具接入。",
		icon: "simple-icons:langchain",
		category: "ai",
		level: "intermediate",
	},
	{
		name: "PyTorch",
		description: "手写数字识别项目的模型训练与推理。",
		icon: "simple-icons:pytorch",
		category: "ai",
		level: "intermediate",
	},
	{
		name: "Git",
		description: "日常版本管理、分支与提交规范。",
		icon: "simple-icons:git",
		category: "tooling",
		level: "intermediate",
	},
	{
		name: "Linux",
		description: "命令行操作、环境配置与部署排查。",
		icon: "simple-icons:linux",
		category: "tooling",
		level: "intermediate",
	},
	{
		name: "Docker",
		description: "把项目打包成可复现的运行环境。",
		icon: "simple-icons:docker",
		category: "tooling",
		level: "beginner",
	},
];
