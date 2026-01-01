
import { create, all } from 'mathjs';

const math = create(all);

export const evaluateExpression = (expr: string) => {
  try {
    const result = math.evaluate(expr);
    return {
      success: true,
      value: result,
      formatted: math.format(result, { precision: 14 })
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message
    };
  }
};

export const simplifyExpression = (expr: string) => {
  try {
    return math.simplify(expr).toString();
  } catch {
    return expr;
  }
};

export const generateGraphData = (fn: string, start: number, end: number, points: number = 100) => {
  const data = [];
  const step = (end - start) / points;
  
  try {
    const node = math.parse(fn);
    const code = node.compile();

    for (let x = start; x <= end; x += step) {
      try {
        const y = code.evaluate({ x });
        if (typeof y === 'number' && isFinite(y)) {
          data.push({ x: Number(x.toFixed(4)), y: Number(y.toFixed(4)) });
        }
      } catch {
        // Skip points where eval fails
      }
    }
  } catch (err) {
    console.error("Graph Data Generation Error:", err);
  }
  return data;
};
