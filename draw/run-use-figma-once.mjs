/**
 * One-off: print MCP use_figma args JSON from disk (stdout) for verified transport.
 * Parent/subagent copies into call_mcp or pipes — not part of DesignOps canonical flow.
 */
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dir = dirname(fileURLToPath(import.meta.url));
const args = JSON.parse(readFileSync(join(__dir, 'mcp-cc-scaffold-args.json'), 'utf8'));

// Echo for human/agent proof
writeFileSync(join(__dir, 'last-use-figma-invoke-proof.txt'), JSON.stringify({
  fileKey: args.fileKey,
  codeChars: args.code.length,
  description: args.description,
  skillNames: args.skillNames,
}), 'utf8');

process.stdout.write(JSON.stringify(args));
