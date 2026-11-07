import { expect, test } from "@playwright/test";
import { registerPersistentShellSync } from "./feature-page";

// 与内容仓 data/skills.ts 的真实技能列表保持一致；增删技能时同步修改。
const SKILL_COUNT = 11;

test.describe("技能页", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/skills/");
		await expect(page.locator(".skill-card")).toHaveCount(SKILL_COUNT);
	});

	test("渲染配置技能与离散熟练度", async ({ page }) => {
		await expect(page.locator("#swup-container")).toHaveAttribute(
			"data-current-page",
			"skills",
		);
		await expect(page.locator(".page-header__title")).toHaveText("技能");
		await expect(page.locator(".skills-section__count")).toHaveText(
			"11 skills",
		);

		const python = page.locator(".skill-card", { hasText: "Python" });
		await expect(python).toContainText("Advanced");
		await expect(python.getByRole("meter")).toHaveAttribute(
			"aria-valuenow",
			"3",
		);
		await expect(python.locator(".skill-card__segment--active")).toHaveCount(3);
	});

	// 分类数量 > 1 时渲染分类 chips（SkillSection.svelte:51）；
	// 真实技能分属编程语言 / 后端 / 数据 / AI / 工具，因此这里锁定筛选行为。
	test("按分类筛选后卡片与计数同步变化", async ({ page }) => {
		await expect(page.locator(".skills-section__filters")).toHaveCount(1);
		await page.getByRole("button", { name: "AI" }).click();
		await expect(page.locator(".skill-card")).toHaveCount(2);
		await expect(page.locator(".skills-section__count")).toHaveText("2 skills");
	});

	test("侧栏页面过滤与直接加载导航高亮正确", async ({ page }) => {
		await expect(
			page.locator('widget-layout[data-id="categories"]'),
		).toBeVisible();
		await expect(page.locator('widget-layout[data-id="tags"]')).toBeVisible();
		await expect(
			page.locator('[data-nav-key="skills"]').first(),
		).toHaveAttribute("aria-current", "page");
	});
});

test.describe("技能页 Swup 导航", () => {
	test.use({ viewport: { width: 1280, height: 900 } });

	registerPersistentShellSync("从持久顶栏进入后同步页面、导航与侧栏状态", {
		key: "skills",
		fromPath: "/projects/",
		toPath: /\/skills\/$/,
		cardSelector: "skill-card",
		cardCount: SKILL_COUNT,
	});
});
