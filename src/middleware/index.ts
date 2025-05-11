import { sequence } from "astro:middleware";

import { logVisit } from "./visit.ts";

export const onRequest = sequence(logVisit);
