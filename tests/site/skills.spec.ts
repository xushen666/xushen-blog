import { expect, test } from "@playwright/test";
import { registerPersistentShellSync } from "./feature-page";

// 与 src/data/skills.ts 的占位数据保持一致；替换真实技能时同步修改。
const SKILL_COUNT = 1;

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
		await expect(page.locator(".page-header__title")).toHaveText("Skills");
		await expect(page.locator(".skills-section__count")).toHaveText("1 skills");

		const placeholder = page.locator(".skill-card", {
			hasText: "技能名称（占位）",
		});
		await expect(placeholder).toContainText("Beginner");
		await expect(placeholder.getByRole("meter")).toHaveAttribute(
			"aria-valuenow",
			"1",
		);
		await expect(
			placeholder.locator(".skill-card__segment--active"),
		).toHaveCount(1);
	});

	// 组件在分类数量 > 1 时才渲染分类 chips（SkillSection.svelte）；
	// 占位数据只有一个分类，因此这里锁定「无筛选栏」的单分类形态。
	test("单一分类时不渲染分类 chips", async ({ page }) => {
		await expect(page.locator(".skills-section__filters")).toHaveCount(0);
		await expect(page.locator(".skill-card")).toHaveCount(SKILL_COUNT);
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
		fromPath: "/games/",
		toPath: /\/skills\/$/,
		cardSelector: "skill-card",
		cardCount: SKILL_COUNT,
	});
});
