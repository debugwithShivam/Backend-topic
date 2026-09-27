import readline from "node:readline/promises";
import {
    stdin as input,
    stdout as output
} from "node:process";

import { tools } from "./tools.js";

const rl = readline.createInterface({
    input,
    output
});

const messages = [
    {
        role: "system",
        content: `
You are a local coding assistant running on the user's computer.

You can inspect and modify files inside the workspace using tools.

Workspace:
D:\\code

Rules:
- Use tools when the user asks about files or code in the workspace.
- Before modifying a file, read it first when necessary.
- Never claim that you changed a file unless the tool succeeds.
- Never access files outside the workspace.
- Keep responses concise.
- Do not delete files unless the user explicitly asks for deletion.
`
    }
];

const toolDefinitions = [
    {
        type: "function",
        function: {
            name: "list_files",
            description:
                "List files and directories inside the workspace or a subdirectory.",
            parameters: {
                type: "object",
                properties: {
                    path: {
                        type: "string",
                        description:
                            "Directory path relative to D:\\code. Use '.' for the workspace root."
                    }
                }
            }
        }
    },

    {
        type: "function",
        function: {
            name: "read_file",
            description:
                "Read the contents of a text/code file.",
            parameters: {
                type: "object",
                required: ["path"],
                properties: {
                    path: {
                        type: "string",
                        description:
                            "File path relative to D:\\code."
                    }
                }
            }
        }
    },

    {
        type: "function",
        function: {
            name: "write_file",
            description:
                "Write content to an existing or new file. Creates the file if it does not exist.",
            parameters: {
                type: "object",
                required: ["path", "content"],
                properties: {
                    path: {
                        type: "string",
                        description:
                            "File path relative to D:\\code."
                    },
                    content: {
                        type: "string",
                        description:
                            "Complete content to write."
                    }
                }
            }
        }
    },

    {
        type: "function",
        function: {
            name: "create_file",
            description:
                "Create a new file. Fails if the file already exists.",
            parameters: {
                type: "object",
                required: ["path"],
                properties: {
                    path: {
                        type: "string",
                        description:
                            "File path relative to D:\\code."
                    },
                    content: {
                        type: "string",
                        description:
                            "Initial file content."
                    }
                }
            }
        }
    },

    {
        type: "function",
        function: {
            name: "delete_file",
            description:
                "Delete a file. Only use when the user explicitly asks to delete that file.",
            parameters: {
                type: "object",
                required: ["path", "confirm"],
                properties: {
                    path: {
                        type: "string",
                        description:
                            "File path relative to D:\\code."
                    },
                    confirm: {
                        type: "boolean",
                        description:
                            "Must be true to allow deletion."
                    }
                }
            }
        }
    }
];

const availableTools = {
    list_files: tools.list_files,
    read_file: tools.read_file,
    write_file: tools.write_file,
    create_file: tools.create_file,
    delete_file: tools.delete_file
};

async function chat(userMessage) {

    messages.push({
        role: "user",
        content: userMessage
    });

    while (true) {

        const response = await fetch(
            "http://localhost:11434/api/chat",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    model: "qwen3:1.7b",
                    messages,
                    tools: toolDefinitions,
                    stream: false
                })
            }
        );

        if (!response.ok) {
            throw new Error(
                `Ollama error: ${response.status}`
            );
        }

        const data = await response.json();

        const assistantMessage = data.message;

        messages.push(assistantMessage);

        const toolCalls =
            assistantMessage.tool_calls ?? [];

        // AI doesn't need a tool anymore
        if (toolCalls.length === 0) {

            return assistantMessage.content;
        }

        // Execute requested tools
        for (const call of toolCalls) {

            const toolName =
                call.function.name;

            const args =
                call.function.arguments;

            console.log(
                `\n[Tool] ${toolName}`,
                args
            );

            const tool = availableTools[toolName];

            if (!tool) {

                messages.push({
                    role: "tool",
                    tool_name: toolName,
                    content: `Unknown tool: ${toolName}`
                });

                continue;
            }

            try {

                const result =
                    await tool(args);

                messages.push({
                    role: "tool",
                    tool_name: toolName,
                    content: JSON.stringify(result)
                });

            } catch (error) {

                messages.push({
                    role: "tool",
                    tool_name: toolName,
                    content: `Tool error: ${error.message}`
                });
            }
        }
    }
}

while (true) {

    const userMessage =
        await rl.question("\nYou: ");

    if (
        userMessage.toLowerCase() === "exit"
    ) {
        break;
    }

    try {

        const answer =
            await chat(userMessage);

        console.log(`\nAI: ${answer}`);

    } catch (error) {

        console.error(
            "\nError:",
            error.message
        );
    }
}

rl.close();