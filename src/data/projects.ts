/**
 * 项目页数据源（纯内容）。
 * 页面展示与筛选规则由 src/config/projectsConfig.ts 控制。
 */
import type { ProjectItem } from "@/types/projectsConfig";

export const projectsData: ProjectItem[] = [
	{
		key: "travel-agent",
		title: "智能旅行助手",
		summary:
			"基于 LangChain 与 FastAPI 的智能旅行助手，把行程规划的对话流程拆成可复用的链式步骤。",
		category: "agent",
		phase: "shipped",
		technologies: ["Python", "LangChain", "FastAPI"],
		icon: "material-symbols:travel-explore-outline-rounded",
		cover: "/assets/projects/travel-agent.webp",
		coverAlt: "智能旅行助手界面预览",
		featured: true,
		repository: "https://github.com/xushen666/travel-planner",
		year: "2026",
	},
	{
		key: "digit-recognition",
		title: "手写数字识别",
		summary:
			"可复现评测、可打包发布的手写数字识别离线桌面应用，覆盖训练、评测与发布流程。",
		category: "ml",
		phase: "shipped",
		technologies: ["Python", "PyTorch", "torchvision"],
		icon: "material-symbols:draw-outline-rounded",
		cover: "/assets/projects/Handwritten-digit-recognition.webp",
		coverAlt: "手写数字识别应用界面预览",
		featured: true,
		repository: "https://github.com/xushen666/Handwritten-digit-recognition",
		year: "2025",
	},
	{
		key: "navigation-system",
		title: "导航系统模拟",
		summary:
			"Java 17 + Maven + Swing 的数据结构课程设计：把城市地图抽象为无向图，实现地图展示、最近地点查询、最短路径、动态车流模拟与基于路况的最佳路径计算。",
		category: "course",
		phase: "shipped",
		technologies: ["Java", "Maven", "Swing"],
		icon: "material-symbols:map-outline-rounded",
		cover: "/assets/projects/java-system.webp",
		coverAlt: "导航系统模拟界面预览",
		year: "2026",
	},
];

/** 获取所有项目数据列表 */
export function getProjectsList(): ProjectItem[] {
	return projectsData;
}
