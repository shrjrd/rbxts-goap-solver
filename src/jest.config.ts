import { Config } from "@rbxts/jest";
import setupTestsModule from "./jest.setup";

export = {
	clearMocks: true,
	testMatch: ["**/*.spec"],
	setupFiles: [setupTestsModule],
} satisfies Config;
