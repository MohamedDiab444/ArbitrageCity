const fs = require('fs');

try {
    const content = fs.readFileSync('index.html', 'utf8');

    // Find Plotly.newPlot
    const startRegex = /Plotly\.newPlot\(\s*["'].*?["']\s*,\s*/;
    const match = content.match(startRegex);

    if (!match) {
        console.error("Could not find Plotly.newPlot call");
        process.exit(1);
    }

    const startIndex = match.index + match[0].length;

    function extractJsonObject(text, startPos) {
        const stack = [];
        let inString = false;
        let escape = false;
        let quoteChar = null;

        for (let i = startPos; i < text.length; i++) {
            const char = text[i];

            if (escape) {
                escape = false;
                continue;
            }

            if (char === '\\') {
                escape = true;
                continue;
            }

            if ((char === '"' || char === "'") && !escape) {
                if (!inString) {
                    inString = true;
                    quoteChar = char;
                } else if (char === quoteChar) {
                    inString = false;
                }
            }

            if (!inString) {
                if (char === '[' || char === '{') {
                    stack.push(char);
                } else if (char === ']' || char === '}') {
                    if (stack.length === 0) return null;

                    const last = stack.pop();
                    if ((char === ']' && last !== '[') || (char === '}' && last !== '{')) {
                        throw new Error(`Mismatched braces at ${i}`);
                    }

                    if (stack.length === 0) {
                        return { text: text.substring(startPos, i + 1), nextPos: i + 1 };
                    }
                }
            }
        }
        return null;
    }

    const dataResult = extractJsonObject(content, startIndex);
    if (!dataResult) {
        console.error("Failed to extract data object");
        process.exit(1);
    }

    console.log(`Extracted data length: ${dataResult.text.length}`);

    // Find layout object
    const remaining = content.substring(dataResult.nextPos);
    const layoutMatch = remaining.match(/^\s*,\s*/);
    
    let layoutJsonStr = "{}";
    if (layoutMatch) {
        const layoutStartPos = dataResult.nextPos + layoutMatch[0].length;
        const layoutResult = extractJsonObject(content, layoutStartPos);
        if (layoutResult) {
            layoutJsonStr = layoutResult.text;
        }
    }

    const outputContent = `const mapData = ${dataResult.text};\nconst mapLayout = ${layoutJsonStr};\n\nif (typeof module !== 'undefined') { module.exports = { mapData, mapLayout }; } else { window.mapData = mapData; window.mapLayout = mapLayout; }`;

    fs.writeFileSync('data.js', outputContent);
    console.log("Successfully extracted data to data.js");

} catch (e) {
    console.error(e);
}
