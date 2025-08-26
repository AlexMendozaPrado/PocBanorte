import { Keyword } from "../Keyword";

export interface KeywordExtractorPort {
  extract(input: { text: string; opts?: any }): Promise<Keyword[]>;
}
