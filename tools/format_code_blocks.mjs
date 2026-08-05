import prettier from "prettier";

const chunks = [];
for await (const chunk of process.stdin) chunks.push(chunk);
const blocks = JSON.parse(Buffer.concat(chunks).toString("utf8"));
const formatted = [];
for (const [index, code] of blocks.entries()) {
  try {
    formatted.push(
      await prettier.format(code, {
        parser: "babel",
        printWidth: 88,
        semi: true,
        singleQuote: true,
        tabWidth: 2,
      }),
    );
  } catch (error) {
    throw new Error(`Code block ${index + 1}: ${error.message}`, {
      cause: error,
    });
  }
}

process.stdout.write(JSON.stringify(formatted));
