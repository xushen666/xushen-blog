/**
 * 项目页数据源（纯内容）。
 * 页面展示与筛选规则由 config/projects.yaml 覆盖的主题配置控制。
 */
import type { ProjectItem } from "@/types/projectsConfig";

export const projectsData: ProjectItem[] = [
	{
		key: "travel-agent",
		title: "智旅通 TravelMate",
		summary:
			"面向旅行场景的智能问答与行程规划助手：LangChain 单 Agent 调度 RAG 知识库与 MCP 工具，FastAPI 提供后端接口与单页前端。",
		category: "agent",
		phase: "shipped",
		technologies: ["Python", "LangChain", "FastAPI", "Chroma", "MCP"],
		icon: "material-symbols:travel-explore-rounded",
		cover: "/assets/projects/travel-agent.webp",
		coverAlt: "智旅通 TravelMate 项目封面",
		featured: true,
		repository: "https://github.com/xushen666/travel-planner",
		year: "2026",
	},
	{
		key: "digit-recognition",
		title: "手写数字识别",
		summary:
			"离线可用的 MNIST 手写数字识别桌面应用：PyTorch 推理核心搭配 PyQt5 画布，支持可复现评测与 PyInstaller 打包分发。",
		category: "ml",
		phase: "shipped",
		technologies: ["Python", "PyTorch", "PyQt5"],
		icon: "material-symbols:gesture-rounded",
		cover: "/assets/projects/Handwritten-digit-recognition.webp",
		coverAlt: "手写数字识别桌面应用界面",
		featured: true,
		repository: "https://github.com/xushen666/Handwritten-digit-recognition",
		year: "2025",
	},
	{
		key: "navigation-system",
		title: "导航系统模拟",
		summary:
			"数据结构课程设计：把城市地图抽象为无向图，实现地图展示、最近地点查询、最短路径、动态车流模拟与基于路况的最佳路径规划。",
		category: "course",
		phase: "shipped",
		technologies: ["Java", "Maven", "Swing"],
		icon: "material-symbols:map-search-outline-rounded",
		cover: "/assets/projects/java-system.webp",
		coverAlt: "导航系统模拟课程设计界面",
		featured: false,
		year: "2026",
	},
];
