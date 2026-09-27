import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const WORKSPACE = path.resolve(__dirname, "..");

function safePath(userPath) {
    const target = path.resolve(WORKSPACE, userPath);

    if (
        target !== WORKSPACE &&
        !target.startsWith(WORKSPACE + path.sep)
    ) {
        throw new Error(
            `Access denied: ${userPath} is outside the workspace.`
        );
    }

    return target;
}

export const tools = {

    list_files: async ({ path: dirPath = "." } = {}) => {
        const target = safePath(dirPath);

        const entries = await fs.readdir(target, {
            withFileTypes: true
        });

        return entries.map(entry => ({
            name: entry.name,
            type: entry.isDirectory() ? "directory" : "file"
        }));
    },

    read_file: async ({ path: filePath }) => {
        const target = safePath(filePath);

        const stat = await fs.stat(target);

        if (!stat.isFile()) {
            throw new Error(`${filePath} is not a file.`);
        }

        return await fs.readFile(target, "utf8");
    },

    write_file: async ({ path: filePath, content }) => {
        const target = safePath(filePath);

        await fs.writeFile(target, content, "utf8");

        return `File written successfully: ${filePath}`;
    },

    create_file: async ({ path: filePath, content = "" }) => {
        const target = safePath(filePath);

        try {
            await fs.access(target);

            throw new Error(
                `File already exists: ${filePath}`
            );

        } catch (error) {
            if (error.code !== "ENOENT") {
                throw error;
            }
        }

        await fs.writeFile(target, content, "utf8");

        return `File created successfully: ${filePath}`;
    },

    delete_file: async ({ path: filePath, confirm }) => {

        if (confirm !== true) {
            throw new Error(
                "Delete requires confirm=true."
            );
        }

        const target = safePath(filePath);

        const stat = await fs.stat(target);

        if (stat.isDirectory()) {
            throw new Error(
                "Deleting directories is disabled. Delete files only."
            );
        }

        await fs.unlink(target);

        return `File deleted successfully: ${filePath}`;
    }
};