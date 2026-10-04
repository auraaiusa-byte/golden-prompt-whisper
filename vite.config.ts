import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { readFile, writeFile } from "node:fs/promises";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { mcpPlugin } from "@lovable.dev/mcp-js/stacks/supabase/vite";

const mcpEntry = "supabase/functions/mcp/_shared/index.ts";
const mcpFunctionEntry = "supabase/functions/mcp/index.ts";

const mcpLocalImportCompatibility = {
  name: "navaura-mcp-local-import-compatibility",
  enforce: "post" as const,
  async buildStart() {
    const generatedPath = path.resolve(__dirname, mcpFunctionEntry);
    const generatedSource = await readFile(generatedPath, "utf8");
    const compatibleSource = generatedSource.replace(
      /import mcp from "npm:[^"\r\n]+";/,
      'import mcp from "./_shared/index.ts";',
    );

    if (compatibleSource !== generatedSource) {
      await writeFile(generatedPath, compatibleSource, "utf8");
    }
  },
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    mcpPlugin({ mcpEntry }),
    mcpLocalImportCompatibility,
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
  },
}));
