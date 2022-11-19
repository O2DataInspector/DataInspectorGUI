export interface Analysis {
  id: string,
  url: string,
  name: string,
  branch: string;
}

export interface Run {
  id: string,
  status: string,
  config: string,
  workflow: string,
  analysis: Analysis;
}

export interface Runs {
  runs: Run[]
}