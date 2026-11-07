import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
	filterByDisabledKeys,
	resolveDevicesData,
	resolveProjectsData,
	resolveSkillsData,
	resolveTimelineData,
} from "../src/utils/feature-data.ts";

describe("Feature Data & Resolver Tests", () => {
	it("filterByDisabledKeys correctly filters items by key/id/name/title", () => {
		const items = [
			{ key: "item-1", name: "One" },
			{ key: "item-2", name: "Two" },
			{ key: "item-3", name: "Three" },
		];

		const filtered = filterByDisabledKeys(items, ["item-2"]);
		assert.equal(filtered.length, 2);
		assert.deepEqual(
			filtered.map((i) => i.key),
			["item-1", "item-3"],
		);
	});

	it("resolveProjectsData applies disabledKeys correctly", () => {
		// 与内容仓 data/projects.ts 的真实项目列表保持一致
		const config = {
			enable: true,
			categories: [],
			disabledKeys: ["navigation-system"],
		};
		const all = resolveProjectsData({
			enable: true,
			categories: [],
			disabledKeys: [],
		});
		assert.equal(all.length, 3);
		const resolved = resolveProjectsData(config);
		assert.ok(!resolved.some((p) => p.key === "navigation-system"));
		assert.ok(resolved.some((p) => p.key === "travel-agent"));
	});

	it("resolveSkillsData applies disabledNames correctly", () => {
		// 与内容仓 data/skills.ts 的真实技能列表保持一致
		const config = {
			enable: true,
			categories: [],
			disabledNames: ["Docker"],
		};
		const all = resolveSkillsData({
			enable: true,
			categories: [],
			disabledNames: [],
		});
		assert.equal(all.length, 11);
		const resolved = resolveSkillsData(config);
		assert.ok(!resolved.some((s) => s.name === "Docker"));
		assert.ok(resolved.some((s) => s.name === "Python"));
	});

	it("resolveTimelineData applies disabledTitles and order correctly", () => {
		// 用内联夹具断言解析行为，避免绑定内容仓里的时间线数据。
		const items = [
			{ title: "Senior Frontend Engineer", date: "2024.01" },
			{ title: "Student", date: "2020.09" },
		];
		const config = {
			enable: true,
			categories: [],
			order: "asc",
			disabledTitles: ["Senior Frontend Engineer"],
		};
		const resolved = resolveTimelineData(config, items);
		assert.deepEqual(
			resolved.map((t) => t.title),
			["Student"],
		);
	});

	it("resolveTimelineData sorts correctly by date in desc and asc order", () => {
		const customItems = [
			{ title: "Old", date: "2021.05" },
			{ title: "Recent", date: "2024.10" },
			{ title: "Present", date: "2025.01 - Present" },
			{ title: "Middle", date: "2023.01" },
		];
		const descRes = resolveTimelineData({ order: "desc" }, customItems);
		assert.deepEqual(
			descRes.map((i) => i.title),
			["Present", "Recent", "Middle", "Old"],
		);

		const ascRes = resolveTimelineData({ order: "asc" }, customItems);
		assert.deepEqual(
			ascRes.map((i) => i.title),
			["Old", "Middle", "Recent", "Present"],
		);
	});

	it("resolveDevicesData applies disabledIds correctly", () => {
		// 用内联夹具断言解析行为，避免绑定内容仓里的设备数据。
		const items = [
			{ id: "macbook-pro-16", name: "MacBook Pro 16", category: "desk" },
			{ id: "iphone-16-pro", name: "iPhone 16 Pro", category: "mobile" },
		];
		const config = {
			enable: true,
			categories: [],
			disabledIds: ["iphone-16-pro"],
		};
		const resolved = resolveDevicesData(config, items);
		assert.ok(resolved.some((d) => d.id === "macbook-pro-16"));
		assert.ok(!resolved.some((d) => d.id === "iphone-16-pro"));
	});
});
