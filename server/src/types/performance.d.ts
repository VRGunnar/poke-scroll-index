import { Performance as NodePerformance } from "perf_hooks";

declare global {
  type Performance = NodePerformance;
}

export {};
